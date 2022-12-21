import { errorToastStyle, successToastStyle, warnToastStyle } from "../utils/styles.utils";
import { IFileInputType, IFileType, IUploadFile } from "../interfaces/upload.interface";
import { CREATE_LOG, DELETE_LOG, UPDATE_LOG } from "../graphql/mutations/logbook";
import { MdClose, MdDragHandle, MdOutlineSchedule } from "react-icons/md";
import { CLOUD_DEL_FILE, DELETE_FILE } from "../graphql/mutations/file";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/store.hook";
import { setEligReset } from "../store/slice/eligible.slice";
import { uploadToCloudinary } from "../utils/cloudUpload";
import { GET_STUD_LOG } from "../graphql/query/student";
import { CSSTransition } from "react-transition-group";
import { IEvent } from "../interfaces/event.interface";
import GlobalContext from "../context/GlobalContext";
import { setRest } from "../store/slice/auth.slice";
import styles from "../styles/Logbook.module.scss";
import animate from "../styles/animate.module.css";
import constants from "../config/constant.config";
import { client } from "../graphql/apolloClient";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegBookmark } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { RiCheckFill } from "react-icons/ri";
import BackBlurDrop from "./BackBlurDrop";
import router from "next/router";
import axios from "axios";


const EventModal = ({ show }: IEvent) => {
  const { setShowEventModal, daySelected, logBookData, selectedEvent } =
    useContext(GlobalContext); 
  const day = daySelected.toISOString();
  const logData = logBookData?.find((i: any) => i?.day === day);
  const [selectFile, setSelectFile] = useState({
    file: null,
    isUploaded: false,
  });
  const lblClasses: string[] = ["green", "blue", "red"];
  const userData = useAppSelector((state) => state.auth.userStudData);
  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();
  const { prod, dev } = constants;
  const { id, email } = userData;
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [selectedLabel, setSelectedLabel] = useState(
    logData ? lblClasses.find((lbl) => lbl === logData.label) : lblClasses[0]
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
      // dispatch(setLog(data?.logbook));
      // dispatchCalEvent({ type: "push", payload: data.logbook?.logbook });
      resetFileUpload();
      reset();
      setShowEventModal(false);
    },
    update(cache, { data: { logbook } }) {
      // Get all the existing data
      const existingStudLogData: any = cache.readQuery({
        query: GET_STUD_LOG,
        variables: {
          studentId: id,
        },
      });
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

  const [delCloudFile, { loading: cLoad, reset: cReset }] = useMutation(
    CLOUD_DEL_FILE,
    {
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

  const [updateLog, { loading: loadingUpd, reset: resetUpd }] = useMutation(
    UPDATE_LOG,
    {
      onCompleted: (data) => {
        toast.success("Updated", successToastStyle);
        // console.log("UPDATED DATA ==> ", data?.updateLogbook?.logbook);
        // dispatch(setUpdLog(data?.updateLogbook));
        // dispatchCalEvent({
        //   type: "update",
        //   payload: data?.updateLogbook?.logbook,
        // });
        // resetUpd();
        resetFileUpload();
        resetUpd();
        setShowEventModal(false);
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
      // setShowEventModal(false);
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
        // dispatchCalEvent({
        //   type: "delete",
        //   payload: data?.deleteLogbook?.logbook,
        // });
        // resetDel();
        resetFileUpload();
        resetDel();
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
  let lbl: string = "";
  let idx: string = "";
  let actIdx: string = "";
  let descript: string = "";
  let diag: string | null = null;

  if (logData) {
    const { title, description, label, id, actId } = logData;
    idx = id;
    lbl = label;
    tit = title;
    actIdx = actId;
    descript = description;
  }

  useEffect(() => {
    setTitle(tit);
    setDescription(descript);
    setSelectedLabel(lblClasses.find((lb) => lb === lbl));
  }, [idx, actIdx, tit, descript, lbl, diag]);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (logData) {
      // Update Logbook at the backend >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      if (selectFile.file) {
        // Check File Size and type
        const { file } = selectFile;
        const { type: t, size } = file as File;

        if (t !== "image/png" && t !== "image/jpg" && t !== "image/jpeg") {
          toast.error("Invalid file Uploaded", warnToastStyle);
          return;
        }

        if (size > 100000) {
          toast.error("Maximum file size is 100KB!", warnToastStyle);
          return;
        }

        // DEVELOPMENT ENVIRONMENT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        if (prod) {
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
              const { imageUrl } = updateFile as IUploadFile;

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
              toast.error(
                "An error occurred while uploading image",
                errorToastStyle
              );
            });
        }

        // PRODUCTION ENVIRONMENT
        if (dev) {
          // Delete and Update Image File from Cloudinary
          delCloudFile({
            variables: {
              input: {
                oldImgURL: logData?.diagram,
              },
            },
            onCompleted: async (data) => {
              setIsLoading(true);
              const { file } = selectFile;
              try {
                const imgUrl = await uploadToCloudinary({
                  file,
                  type: "diagrams",
                });
                if (data?.deleteFromCloudinary?.status === 200) {
                  updateLog({
                    variables: {
                      input: {
                        email,
                        title,
                        id: idx,
                        description,
                        diagram: imgUrl,
                        day: daySelected,
                        label: selectedLabel,
                        actId: actIdx.toString(),
                      },
                    },
                  });
                }
              } catch (err) {
                const error: any = err;
                if (
                  error?.status === 100 ||
                  error?.status === 101 ||
                  error?.status === 102
                ) {
                  toast.error(error?.msg, warnToastStyle);
                  return;
                }
                toast.error(`${err}`, errorToastStyle);
              }
              setIsLoading(false);
              cReset();
            },
          });
        }
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
        // Check File Size and type
        const { file } = selectFile;
        const { type: t, size } = file as File;

        if (t !== "image/png" && t !== "image/jpg" && t !== "image/jpeg") {
          toast.error("Invalid file Uploaded", warnToastStyle);
          return;
        }

        if (size > 100000) {
          toast.error("Maximum file size is 100KB!", warnToastStyle);
          return;
        }

        // DEVELOPMENT ENVIRONMENT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        if (prod) {
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
                      day: daySelected,
                      diagram: imageUrl,
                      label: selectedLabel,
                      actId: Date.now().toString(),
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
        }

        // PRODUCTION ENVIRONMENT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        if (dev) {
          setIsLoading(true);
          const { file } = selectFile;
          try {
            const imgUrl = await uploadToCloudinary({ file, type: "diagrams" });
            if (imgUrl || imgUrl !== "") {
              createLog({
                variables: {
                  input: {
                    email,
                    title,
                    description,
                    diagram: imgUrl,
                    day: daySelected,
                    label: selectedLabel,
                    actId: Date.now().toString(),
                  },
                },
              });
            }
          } catch (err) {
            const error: any = err;
            if (
              error?.status === 100 ||
              error?.status === 101 ||
              error?.status === 102
            ) {
              toast.error(error?.msg, warnToastStyle);
              return;
            }
            toast.error(`${err}`, errorToastStyle);
          }
          setIsLoading(false);
          cReset();
        }
      } else {
        createLog({
          variables: {
            input: {
              email,
              title,
              description,
              day: daySelected,
              label: selectedLabel,
              actId: Date.now().toString(),
            },
          },
        });
      }
    }
  };

  const onDeleteHandler = (actId: string, diagram: string) => {
    if (diagram) {
      // PRODUCTION ENVIRONMENT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      if (dev) {
        delCloudFile({
          variables: {
            input: {
              oldImgURL: diagram,
            },
          },
          onCompleted: (data) => {
            deleteLog({
              variables: {
                input: {
                  email,
                  actId,
                },
              },
            });
            cReset();
          },
        });
      }
      // DEVELOPMENT ENVIRONMENT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      if (prod) {
        deleteFile({
          variables: {
            deleteInput: {
              id,
              actId,
              type: "diagrams",
            },
          },
        });
      }
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

    // dispatch(setLogReset());
    // dispatchCalEvent({
    //   type: "delete",
    //   payload: data?.deleteLogbook?.logbook,
    // });
    // return;

    // const logData = logBookData?.find((i: any) => i.actId === actId);
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
                {logData &&
                  (loadingDel || loadingFile || cLoad ? (
                    "Deleting..."
                  ) : (
                    <span
                      onClick={() => onDeleteHandler(actIdx, logData?.diagram)}
                      className="cursor-pointer mr-3 hover:text-red-500"
                    >
                      <AiOutlineDelete size={"1.3rem"} />
                    </span>
                  ))}
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
                        selectFile.isUploaded || logData?.diagram
                          ? styles.fileUploadedBtn
                          : styles.uploadDiagramBtn
                      }`}
                    >
                      <label htmlFor="diagram">
                        {selectFile.isUploaded
                          ? "File Uploaded"
                          : logData?.diagram
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
                    {lblClasses.map((lblClass, i) => (
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
                disabled={loading || loadingUpd || isLoading ? true : false}
                className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white disabled:cursor-not-allowed disabled:bg-slate-700"
              >
                {selectedEvent
                  ? loadingUpd || isLoading
                    ? "Updating..."
                    : "Update"
                  : loading || isLoading
                  ? "Saving..."
                  : "Save"}
              </button>
            </footer>
          </form>
        </div>
      </CSSTransition>
    </>
  );
};

export default EventModal;
