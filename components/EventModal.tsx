import { MdClose, MdDragHandle, MdOutlineSchedule } from "react-icons/md";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/store.hook";
import {
  setDelLog,
  setLog,
  setLogReset,
  setUpdLog,
} from "../store/slice/logbook.slice";
import { CSSTransition } from "react-transition-group";
import GlobalContext from "../context/GlobalContext";
import styles from "../styles/Logbook.module.scss";
import animate from "../styles/animate.module.css";
import constants from "../config/constant.config";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegBookmark } from "react-icons/fa";
import { RiCheckFill } from "react-icons/ri";

import BackBlurDrop from "./BackBlurDrop";
import { EventType } from "../interfaces/comp.interface";
import { ILogbookSlice } from "../interfaces/logbook.interface";
import axios from "axios";
import {
  IFileInputType,
  IFileType,
  IUploadFile,
} from "../interfaces/upload.interface";
import { errorToastStyle, successToastStyle } from "../utils/styles.utils";
import toast, { Toaster } from "react-hot-toast";
import { client } from "../graphql/apolloClient";
import { setRest } from "../store/slice/auth.slice";
import router from "next/router";
import { setEligReset } from "../store/slice/eligible.slice";
import { useMutation } from "@apollo/client";
import {
  CREATE_LOG,
  DELETE_LOG,
  UPDATE_LOG,
} from "../graphql/mutations/logbook";
import { DELETE_FILE } from "../graphql/mutations/file";
import { GET_STUD_LOG } from "../graphql/query/student";

const EventModal = ({ show }: { show: boolean }) => {
  const { setShowEventModal, daySelected, dispatchCalEvent, selectedEvent } =
    useContext(GlobalContext);
  const [selectFile, setSelectFile] = useState({
    file: null,
    isUploaded: false,
  });
  // console.log("SELECTEDEVENT ==> ", selectedEvent);
  const labelsClasses: string[] = ["indigo", "gray", "green", "blue", "red"];
  const token = useAppSelector((state) => state.auth.token);
  const userData = useAppSelector((state) => state.auth.userStudData);
  const { id, email } = userData;

  const dispatch = useAppDispatch();
  const logBooks = useAppSelector((state) => state.logbook?.logbooks);
  // const { logbooks } = logbooksArr;
  const logData: ILogbookSlice = logBooks?.find(
    (i: any) => i.actId === selectedEvent?.id
  );
  // console.log("LOGBOOKS => ", logData);
  const [title, setTitle] = useState("");
  const [diagram, setDiagram] = useState(null);
  const [description, setDescription] = useState("");
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
      : labelsClasses[0]
  );
  const nodeRefModal = useRef<any>(null);

  const onFileUploaded = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSelectFile({ file: evt.target.files[0], isUploaded: true });
  };

  const resetFileUpload = () => {
    setSelectFile({ file: null, isUploaded: false });
  };

  const logout = async () => {
    // Reset Apollo Cache
    client.resetStore();
    dispatch(setRest());
    dispatch(setEligReset());
    router.push("/login");
  };

  const [createLog, { loading, reset }] = useMutation(CREATE_LOG, {
    onCompleted: (data) => {
      toast.success("Saved", successToastStyle);
      // console.log("CREATED DATA ==> ", data?.logbook?.logbook);
      dispatch(setLog(data?.logbook));
      dispatchCalEvent({ type: "push", payload: data.logbook?.logbook });
      // reset();
      resetFileUpload();
    },
    update(cache, { data: { logbook } }) {
      // Get all the existing data
      const existingStudLogData: any = cache.readQuery({
        query: GET_STUD_LOG,
        variables: {
          studentId: id,
        },
      });
      // console.log("YES YOU -> ", existingStudLogData);
      // Create a New Data
      if (existingStudLogData) {
        const newLogData = existingStudLogData!.student?.logbooks;
        const newStudLogData = [...newLogData, logbook?.logbook];
        // Update Cache Data
        cache.writeQuery({
          query: GET_STUD_LOG,
          data: { student: { logbooks: newStudLogData } },
          variables: {
            studentId: userData.id,
          },
        });
      }
    },
    onError: ({ graphQLErrors, networkError }) => {
      try {
        if (graphQLErrors)
          graphQLErrors.forEach(({ message, locations, path }) => {
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            );
            const tokenErr = message.split(":")[0];
            toast.error(`${message}`, errorToastStyle);
            if (tokenErr === "TokenExpiredError") {
              logout();
            }
          });
        if (networkError) {
          toast.error(`${networkError}`, errorToastStyle);
          console.log(`[Network error]: ${networkError}`);
        }
      } catch (err) {
        console.log("ERR****", err);
      }
    },
  });

  const [updateLog, { loading: loadingUpd, reset: resetUpd }] = useMutation(
    UPDATE_LOG,
    {
      onCompleted: (data) => {
        toast.success("Updated", successToastStyle);
        // console.log("UPDATED DATA ==> ", data?.updateLogbook?.logbook);
        // dispatch(setUpdLog(data?.updateLogbook));
        dispatchCalEvent({
          type: "update",
          payload: data?.updateLogbook?.logbook,
        });
        // resetUpd();
        resetFileUpload();
      },
      update(cache, { data: { updateLogbook } }) {
        // Get all the existing data
        const existingStudLogData: any = cache.readQuery({
          query: GET_STUD_LOG,
          variables: {
            studentId: id,
          },
        });
        // Create a New Data
        if (existingStudLogData) {
          const updLogData = existingStudLogData!.student?.logbooks;
          const updStudLogData = updLogData?.map((i: any) =>
            i.actId === updateLogbook.logbook.actId ? updateLogbook.logbook : i
          );
          // Update Cache Data
          cache.writeQuery({
            query: GET_STUD_LOG,
            data: { student: { logbooks: updStudLogData } },
            variables: {
              studentId: userData.id,
            },
          });
        }
      },
      onError: ({ graphQLErrors, networkError }) => {
        try {
          if (graphQLErrors)
            graphQLErrors.forEach(({ message, locations, path }) => {
              console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
              );
              const tokenErr = message.split(":")[0];
              toast.error(`${message}`, errorToastStyle);
              if (tokenErr === "TokenExpiredError") {
                logout();
              }
            });
          if (networkError) {
            toast.error(`${networkError}`, errorToastStyle);
            console.log(`[Network error]: ${networkError}`);
          }
        } catch (err) {
          console.log("ERR****", err);
        }
      },
    }
  );

  const [deleteFile, { loading: loadingFile }] = useMutation(DELETE_FILE, {
    onCompleted: (data) => {
      toast.success(data.deleteFile?.message, successToastStyle);
      console.log("DATA ==> ", data.deleteFile);
      deleteLog({
        variables: {
          input: {
            email,
            actId: data?.deleteFile.actId,
          },
        },
      });
      // dispatch(setStudAuth(data?.updateStudent));
      setShowEventModal(false);
    },
    onError: ({ graphQLErrors, networkError }) => {
      try {
        if (graphQLErrors)
          graphQLErrors.forEach(({ message, locations, path }) => {
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            );
            const tokenErr = message.split(":")[0];
            toast.error(`${message}`, errorToastStyle);
            if (tokenErr === "TokenExpiredError") {
              logout();
            }
          });
        if (networkError) {
          toast.error(`${networkError}`, errorToastStyle);
          console.log(`[Network error]: ${networkError}`);
        }
      } catch (err) {
        console.log("ERR****", err);
      }
    },
  });

  const [deleteLog, { loading: loadingDel, reset: resetDel }] = useMutation(
    DELETE_LOG,
    {
      onCompleted: (data) => {
        toast.success("Deleted", successToastStyle);
        console.log("DATA ==> ", data.deleteLogbook);
        // dispatch(setDelLog(data?.deleteLogbook.logbook));
        dispatchCalEvent({
          type: "delete",
          payload: data?.deleteLogbook?.logbook,
        });
        // resetDel();
        resetFileUpload();
        setShowEventModal(false);
      },
      update(cache, { data: { deleteLogbook } }) {
        // Get all the existing data
        const existingStudLogData: any = cache.readQuery({
          query: GET_STUD_LOG,
          variables: {
            studentId: id,
          },
        });
        // Delete new Data
        if (existingStudLogData) {
          const delLogData = existingStudLogData!.student?.logbooks;
          const delStudLogData = delLogData?.filter(
            (i: any) => i?.actId !== deleteLogbook?.logbook.actId
          );
          // Update cache data
          cache.writeQuery({
            query: GET_STUD_LOG,
            data: { student: { logbooks: delStudLogData } },
            variables: {
              studentId: id,
            },
          });
        }
      },
      onError: ({ graphQLErrors, networkError }) => {
        try {
          if (graphQLErrors)
            graphQLErrors.forEach(({ message, locations, path }) => {
              console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
              );
              const tokenErr = message.split(":")[0];
              toast.error(`${message}`, errorToastStyle);
              if (tokenErr === "TokenExpiredError") {
                logout();
              }
            });
          if (networkError) {
            toast.error(`${networkError}`, errorToastStyle);
            console.log(`[Network error]: ${networkError}`);
          }
        } catch (err) {
          console.log("ERR****", err);
        }
      },
    }
  );

  let tit: string = "";
  let descript: string = "";
  let lbl: string = "";
  let idx: string = "";
  let actIdx: string = "";
  let diag: string | null = null;

  if (selectedEvent) {
    const { title, description, label, id, actId } = selectedEvent;
    idx = id;
    actIdx = actId;
    tit = title;
    descript = description;
    lbl = label;
  }
  // console.log("LOGBOOK ==> ", logbooks);

  useEffect(() => {
    setTitle(tit);
    setDiagram(diag);
    setDescription(descript);
    setSelectedLabel(labelsClasses.find((lb) => lb === lbl));
  }, [idx, actIdx, tit, descript, lbl, diag]);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const logActivites = {
      title,
      description,
      label: selectedLabel,
      day: daySelected,
      id: selectedEvent ? selectedEvent.id : Date.now().toString(),
      diagram: selectFile.isUploaded,
    };
    // dispatch(setLog(logActivites));
    if (selectedEvent) {
      // Update Logbook at the backend >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      if (selectFile.file) {
        const formData = new FormData();
        const query = `mutation($updateInput: FileUpdateInput!) { updateFile(updateInput: $updateInput) { message imageUrl status } }`;

        const fileInput: IFileType = {
          id,
          file: null,
          type: "diagrams",
          actId: actIdx.toString(),
        };

        const map = { "0": ["variables.updateInput.file"] };
        const operations = JSON.stringify({
          query,
          variables: { updateInput: fileInput },
        });
        formData.append("operations", operations);
        formData.append("map", JSON.stringify(map));
        formData.append("0", selectFile.file);

        await axios
          .post(constants.graphqlBaseUrl, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              "apollo-require-preflight": true,
            },
          })
          .then((response) => {
            const status = response.status;
            // console.log("RESPONSESS ===", response);
            if (response?.data?.errors) {
              const errMsg = response?.data?.errors;
              toast.error(errMsg[0].message, errorToastStyle);
              const tokenErr = errMsg[0].message.split(":")[0];
              if (tokenErr === "TokenExpiredError") {
                logout();
              }
              return;
            }
            const { updateFile } = response?.data?.data;
            console.log("DATES ===", updateFile);
            const { imageUrl } = updateFile as IUploadFile;
            console.log("IMAGEURL ===", imageUrl);

            if (status === 200) {
              updateLog({
                variables: {
                  input: {
                    email,
                    title,
                    id: idx,
                    description,
                    day: daySelected,
                    diagram: imageUrl,
                    label: selectedLabel,
                    actId: actIdx.toString(),
                  },
                },
              });
            }
          })
          .catch((error) => {
            console.log("ERROR ====", error);
            toast.error(
              "An error occurred while uploading image",
              errorToastStyle
            );
          });
      } else {
        updateLog({
          variables: {
            input: {
              email,
              title,
              id: idx,
              description,
              day: daySelected,
              label: selectedLabel,
              actId: actIdx.toString(),
            },
          },
        });
      }
    } else {
      //Upload to the backend (Create) >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      if (selectFile.file) {
        const formData = new FormData();
        const query = `mutation($input: FileInput!) { uploadFile(input: $input) { imageUrl status message } }`;

        const fileInput: IFileInputType = {
          file: null,
          type: "diagrams",
        };

        const map = { "0": ["variables.input.file"] };
        const operations = JSON.stringify({
          query,
          variables: { input: fileInput },
        });
        formData.append("operations", operations);
        formData.append("map", JSON.stringify(map));
        formData.append("0", selectFile.file);
        // console.log("formData === ", constants.graphqlBaseUrl);
        await axios
          .post(constants.graphqlBaseUrl, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              "apollo-require-preflight": true,
            },
          })
          .then((response) => {
            console.log("RESPONSESS ===", response);
            if (response?.data?.errors) {
              const errMsg = response?.data?.errors;
              toast.error(errMsg[0].message, errorToastStyle);
              const tokenErr = errMsg[0].message.split(":")[0];
              if (tokenErr === "TokenExpiredError") {
                logout();
              }
              return;
            }

            const status = response?.status;
            const { data } = response?.data;
            const { imageUrl } = data?.uploadFile as IUploadFile;

            if (status === 200) {
              createLog({
                variables: {
                  input: {
                    email,
                    title,
                    description,
                    actId: Date.now().toString(),
                    diagram: imageUrl,
                    label: selectedLabel,
                    day: daySelected,
                  },
                },
              });
            }
          })
          .catch((error) => {
            console.log("ERROR ====", error);
            toast.error(
              "An error occurred while uploading image",
              errorToastStyle
            );
          });
      } else {
        createLog({
          variables: {
            input: {
              email,
              title,
              description,
              actId: Date.now().toString(),
              label: selectedLabel,
              day: daySelected,
            },
          },
        });
      }
    }

    setShowEventModal(false);
  };

  const onDeleteHandler = (actId: string, diagram: boolean) => {
    if (diagram) {
      deleteFile({
        variables: {
          deleteInput: {
            id,
            actId,
            type: "diagrams",
          },
        },
      });
    } else {
      deleteLog({
        variables: {
          input: {
            actId,
            email: userData?.email,
          },
        },
      });
    }
    // Reset Upload
    resetFileUpload();
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <BackBlurDrop show={show} isAdmin={false} style={true} exit={800} />
      <CSSTransition
        nodeRef={nodeRefModal}
        mountOnEnter
        unmountOnExit
        in={show}
        timeout={{ enter: 400, exit: 800 }}
        classNames={{
          enterActive: animate.animateEnterActive,
          exitActive: animate.animateExitActive,
        }}
      >
        <div ref={nodeRefModal} className={styles.eventModal}>
          <form>
            <header className={styles.eventHeader}>
              <span>
                <MdDragHandle size={"1.5rem"} />
              </span>
              <span className="flex flex-row items-center">
                {selectedEvent && (
                  <span
                    onClick={() =>
                      onDeleteHandler(actIdx, selectedEvent?.diagram)
                    }
                    className="cursor-pointer mr-3 hover:text-red-500"
                  >
                    <AiOutlineDelete size={"1.3rem"} />
                  </span>
                )}
                <span
                  onClick={() => setShowEventModal(false)}
                  className="cursor-pointer hover:text-blue-500"
                >
                  <MdClose size={"1.5rem"} />
                </span>
              </span>
            </header>
            <div className="p-4">
              <div className="flex flex-col">
                <div></div>
                <div className="flex items-center pb-1">
                  <MdOutlineSchedule size={"1.2rem"} />
                  <p className="pl-1">{daySelected.format("dddd, MMMM DD")}</p>
                </div>
                <input
                  type="text"
                  name="title"
                  placeholder="Add title"
                  value={title}
                  required
                  className={styles.eventInput}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <h2 className="pt-4">Description of work done</h2>
                <textarea
                  name="description"
                  placeholder="Add description"
                  value={description}
                  required
                  rows={4}
                  className={styles.eventTextArea}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <div className="flex flex-wrap justify-between">
                  <div className="flex flex-wrap items-center w-full space-x-2">
                    {/* Uploaded Button */}
                    <div
                      className={`${
                        selectFile.isUploaded || selectedEvent?.diagram
                          ? styles.fileUploadedBtn
                          : styles.uploadDiagramBtn
                      }`}
                    >
                      <label htmlFor="diagram">
                        {selectFile.isUploaded
                          ? "File Uploaded"
                          : selectedEvent?.diagram
                          ? "Diagram Uploaded"
                          : "Upload Diagram"}
                      </label>
                      <input
                        id="diagram"
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={onFileUploaded}
                      />
                    </div>
                    {/* RESET BUTTON */}
                    {selectFile.isUploaded && (
                      <div
                        className={styles.resetFileBtn}
                        onClick={resetFileUpload}
                      >
                        Reset
                      </div>
                    )}
                  </div>

                  <div className="flex gap-x-2 mt-3 items-center">
                    <span className="mr-2">
                      <FaRegBookmark />
                    </span>
                    {labelsClasses.map((lblClass, i) => (
                      <span
                        key={i}
                        onClick={() => setSelectedLabel(lblClass)}
                        className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                      >
                        {selectedLabel === lblClass && (
                          <span>
                            <RiCheckFill />
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <footer className="flex justify-center border-t p-3 mt-3">
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={loading || loadingUpd ? true : false}
                className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white disabled:cursor-not-allowed disabled:bg-slate-700"
              >
                {selectedEvent ? "Update" : loading ? "Saving..." : "Save"}
              </button>
            </footer>
          </form>
        </div>
      </CSSTransition>
    </>
  );
};

export default EventModal;
