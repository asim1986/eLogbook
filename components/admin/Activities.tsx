import { ActivitiesType, StudLog } from "../../interfaces/comp.interface";
import { GET_STUD_LOG } from "../../graphql/query/student";
import { errorToastStyle, successToastStyle } from "../../utils/styles.utils";
import GlobalContext from "../../context/GlobalContext";
import styles from "../../styles/Dashboard.module.scss";
import { IoMdArrowRoundBack } from "react-icons/io";
import { AiOutlineEye } from "react-icons/ai";
import { BiSearchAlt2 } from "react-icons/bi";
import { CgTrashEmpty } from "react-icons/cg";
import { RiCheckFill } from "react-icons/ri";
import { MdClose } from "react-icons/md";
import ViewLogbook from "./ViewLogbook";
import { FaEdit } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useLazyQuery, useMutation } from "@apollo/client";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../Loader";
import { useAppDispatch, useAppSelector } from "../../hooks/store.hook";
import { DELETE_LOG } from "../../graphql/mutations/logbook";
import { DELETE_FILE } from "../../graphql/mutations/file";
import { client } from "../../graphql/apolloClient";
import router from "next/router";
import { setRest } from "../../store/slice/auth.slice";

const Activities = (args: ActivitiesType) => {
  const { style, styleHeader, user, isStudent = false } = args;
  const { showDetail, setShowDetail } = useContext(GlobalContext);
  const labels = ["Title", "Activity ID", "Description", "Day", "Approved"];
  const userData = useAppSelector((state) => state.auth.userStudData);
  const [idx, setIdx] = useState(0);
  const dispatch = useAppDispatch();

  const logout = async () => {
    // Reset Apollo Cache
    client.resetStore();
    dispatch(setRest());
    router.push("/login");
  };

  const [getStudLog, { loading, data, error }] = useLazyQuery(GET_STUD_LOG, {
    onError: ({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) => {
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          );
          toast.error(`${message}`, errorToastStyle);
        });
      if (networkError) {
        toast.error(`${networkError}`, errorToastStyle);
        console.log(`[Network error]: ${networkError}`);
      }
    },
  });

  const [deleteFile, { loading: loadingFile }] = useMutation(DELETE_FILE, {
    onCompleted: (data) => {
      toast.success(data.deleteFile?.message, successToastStyle);
      console.log("DATA ==> ", data.deleteFile);
      deleteLog({
        variables: {
          input: {
            email: userData?.email,
            actId: data?.deleteFile.actId,
          },
        },
      });
      // dispatch(setStudAuth(data?.updateStudent));
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

  const [deleteLog, { loading: delLoading, reset }] = useMutation(DELETE_LOG, {
    onCompleted: (data) => {
      toast.success(data?.deleteLogbook?.message, successToastStyle);
      reset();
    },
    update(cache, { data: { deleteLogbook } }) {
      // Get all the existing data
      const existingStudLogData: any = cache.readQuery({
        query: GET_STUD_LOG,
        variables: {
          studentId: userData.id,
        },
      });
      // Create a new Data
      const newStudLogData = existingStudLogData!.student.logbooks.filter(
        (i: any) => i?.actId !== deleteLogbook.logbook.actId
      );
      // Update cache data
      cache.writeQuery({
        query: GET_STUD_LOG,
        data: { student: { logbooks: newStudLogData } },
        variables: {
          studentId: userData.id,
        },
      });
    },
    onError: ({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) => {
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          );
          toast.error(`${message}`, errorToastStyle);
          const tokenErr = message.split(":")[0];
          if (tokenErr === "TokenExpiredError") {
            logout();
          }
        });
      if (networkError) {
        toast.error(`${networkError}`, errorToastStyle);
        console.log(`[Network error]: ${networkError}`);
      }
    },
  });

  // console.log("STUD_LOG => ", data?.student.logbooks);

  const studLogData: StudLog[] = data?.student.logbooks;

  const tableData = isStudent
    ? studLogData?.map((i) => {
        return {
          title: i?.title,
          id: i?.actId,
          label: i?.label,
          diagram: i?.diagram,
          description: i?.description,
          day: new Date(`${i?.day}`).toDateString(),
          approved: i?.approved,
        };
      })
    : [
        ...[1, 2, 3, 4, 5, 5, 7, 8, 8, 9, 0, 0].map(() => {
          return {
            title: "Array Destructuring",
            id: 1661438735332,
            diagram: "",
            description: "Learn object and array destructing using...",
            day: new Date("2022-08-25T23:00:00.000Z").toDateString(),
            approved: false,
          };
        }),
      ];

  const onDeleteHandler = (actId: string, diagram: string) => {
    
    if (diagram) {
      deleteFile({
        variables: {
          deleteInput: {
            actId,
            id: userData?.id,
            type: "diagrams",
          },
        },
      });
    } else {
      deleteLog({
        variables: {
          input: {
            actId,
            email: userData?.email            
          },
        },
      });
    }
  };

  useEffect(() => {
    getStudLog({
      variables: {
        studentId: userData.id,
      },
    });
  }, []);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className={styleHeader}>
        <div
          className={`flex flex-row mb-7 items-center ${
            isStudent && "md:w-6/12"
          }`}
        >
          {!isStudent && (
            <div>
              <Link href={user === "admin" ? "/admin/logbook" : "/activities"}>
                <a>
                  <IoMdArrowRoundBack
                    size={"2rem"}
                    className="cursor-pointer"
                  />
                </a>
              </Link>
            </div>
          )}
          <div className={`ml-2 w-full`}>
            <input type="text" placeholder="Search here..." />
            <span className={`${isStudent && "ml-0"}`}>
              <BiSearchAlt2 size={"1.6rem"} />
            </span>
          </div>
        </div>

        {!isStudent && (
          <div className={styles.littleInfo}>
            <img src="../../images/Passport.jpg" alt="passport" />
            <div className="flex flex-col text-gray-400">
              <p>incrediblechamp1@gmail.com</p>
              <p>SCI17CSC031</p>
              <p>Computer Science</p>
              <p>Federal University Lokoja</p>
            </div>
          </div>
        )}
      </div>
      <ViewLogbook
        show={showDetail}
        isAdmin={user === "admin" ? true : false}
        data={tableData && (tableData[idx] as StudLog)}
      />
      <div className={style}>
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          {loading ? (
            <Loader show={true} />
          ) : error ? (
            <h1 className="w-full text-red-600 mx-auto text-lg font-bold mt-8 text-center">
              An Error Occurred while Fetching Data!!
            </h1>
          ) : tableData?.length === 0 ? (
            <h1 className="flex justify-center mx-auto w-full text-center font-bold py-4 text-xl">
              No Activities Yet!
            </h1>
          ) : (
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  {labels.map((lbl, idx) => (
                    <th key={`${idx}`} scope="col" className="py-3 px-6">
                      <div className="flex items-center">
                        {lbl}
                        <a href="#">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="ml-1 w-3 h-3"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 320 512"
                          >
                            <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"></path>
                          </svg>
                        </a>
                      </div>
                    </th>
                  ))}
                  <th scope="col" className="py-3 px-6">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableData?.map((item, idx) => (
                  <tr className={styles.dashTableTR} key={item.id}>
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.title}
                    </th>
                    <td className="py-1 px-6">{item.id}</td>
                    <td className="py-1 px-6">
                      {item.description.length > 20
                        ? item.description.slice(1, 20) + "..."
                        : item.description}
                    </td>
                    <td className="py-1 px-6">{item.day}</td>
                    <td className="py-1 px-2 w-0 text-center align-middle">
                      {item.approved ? (
                        <div className="flex justify-center">
                          <RiCheckFill
                            className="text-white bg-green-500 w-5 h-5 rounded-full"
                            size={"1.2rem"}
                          />
                        </div>
                      ) : (
                        <div className="flex justify-center">
                          <MdClose
                            className="text-white bg-red-500 w-5 h-5 rounded-full"
                            size={"1.2rem"}
                          />
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right flex flex-row items-center">
                      <AiOutlineEye
                        size={"1.2rem"}
                        className="mr-2 cursor-pointer text-green-300 hover:text-green-600"
                        onClick={() => {
                          setShowDetail(true);
                          setIdx(idx);
                        }}
                      />
                      <CgTrashEmpty
                        size={"1.2rem"}
                        className="cursor-pointer text-red-300 hover:text-red-600"
                        onClick={() => onDeleteHandler(item.id as string, item.diagram)}
                      />
                      {user === "admin" && (
                        <>
                          <FaEdit
                            size={"1.2rem"}
                            className="mr-2 cursor-pointer text-blue-300 hover:text-blue-600"
                          />
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Activities;
