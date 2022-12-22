import { errorToastStyle, successToastStyle } from "../../utils/styles.utils";
import { EligiblebyDept, ITableData } from "../../interfaces/comp.interface";
import { useAppDispatch, useAppSelector } from "../../hooks/store.hook";
import { GET_ELIGIBLES_DEPT } from "../../graphql/query/eligible";
import { DELETE_ELIG } from "../../graphql/mutations/eligible";
import { useLazyQuery, useMutation } from "@apollo/client";
import GlobalContext from "../../context/GlobalContext";
import styles from "../../styles/Dashboard.module.scss";
import { useContext, useEffect, useState } from "react";
import { setRest } from "../../store/slice/auth.slice";
import { client } from "../../graphql/apolloClient";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineEye } from "react-icons/ai";
import { CgTrashEmpty } from "react-icons/cg";
import ViewEligible from "./ViewEligible";
import { FaEdit } from "react-icons/fa";
import AddEligible from "./AddEligible";
import MainHeader from "./MainHeader";
import router from "next/router";
import Loader from "../Loader";

const ListEligible = ({ isAdmin = true }: { isAdmin?: boolean }) => {
  const { showAddModal, showDetail, setShowDetail } = useContext(GlobalContext);
  const labels = [
    "Matric No",
    "Level",
    "Department",
    "Institution",
    "Supervisor",
  ];
  const coordData = useAppSelector((state) => state.auth.userCoordData);
  const [dataIdx, setDataIdx] = useState<number>(0);
  const dispatch = useAppDispatch();
  const { id, institute, department } = coordData;

  const logout = async () => {
    // Reset Apollo Cache
    client.resetStore();
    dispatch(setRest());
    router.push("/login");
  };

  const [getEligDept, { loading, data, error }] = useLazyQuery(
    GET_ELIGIBLES_DEPT,
    {
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
    }
  );

  const [deleteElig, { loading: delLoading, reset }] = useMutation(
    DELETE_ELIG,
    {
      onCompleted: (data) => {
        toast.success(data?.deleteEligible?.message, successToastStyle);
        reset();
      },
      update(cache, { data: { deleteEligible } }) {
        // Get all the existing data
        const existingEligData: any = cache.readQuery({
          query: GET_ELIGIBLES_DEPT,
          variables: {
            input: {
              id,
              department,
              institute,
            },
          },
        });
        // Create a new Data
        const newEligData = existingEligData!.eligiblesByDept.filter(
          (i: any) => i.id !== deleteEligible.eligible.id
        );
        // Update cache data
        cache.writeQuery({
          query: GET_ELIGIBLES_DEPT,
          data: { eligiblesByDept: newEligData },
          variables: {
            input: {
              id,
              department,
              institute,
            },
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
    }
  );

  // console.log("DATA ELIG ==> ", data?.eligiblesByDept);
  const eligibleData = data?.eligiblesByDept as Array<EligiblebyDept>;

  const tableData: ITableData[] = eligibleData?.map((data) => {
    return {
      id: data?.id,
      matric: data?.matricNo,
      level:
        data?.level === "L4" ? "400" : data?.level === "L3" ? "300" : data?.level,
      department: data?.department,
      institution: data?.institute,
      supervisor: `${data?.supervisor?.title}. ${data?.supervisor?.firstName} ${data?.supervisor?.lastName}`,
      date: new Date(data?.createdAt).toDateString(),
    };
  });

  // console.log("NEW TABLE DATA ==> ", newTableData);
  const onViewHandler = (idx: number) => {
    setDataIdx(idx);
    setShowDetail(true);
  };

  // Normal deleting from the list
  const onDeleteHandler = (id: string) => {
    deleteElig({
      variables: {
        deleteInput: {
          id,
        },
      },
    });
  };

  // Deleting from Modal Menu
  const onDelCallback = (id: string) => {
    deleteElig({
      variables: {
        deleteInput: {
          id,
        },
      },
    });
    setShowDetail(false);
  };

  useEffect(() => {
    getEligDept({
      variables: {
        input: {
          id,
          department,
          institute,
        },
      },
    });
  }, []);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      {delLoading && <Loader show={true} />}
      <MainHeader
        style={isAdmin ? styles.mainHeader : styles.mainHeaderUser}
        title={"Add Eligible"}
      />
      <ViewEligible
        show={showDetail}
        isAdmin={isAdmin}
        data={tableData && tableData[dataIdx]}
        onDelCallback={onDelCallback}
      />
      <AddEligible show={showAddModal} isAdmin={isAdmin} />
      <div className={isAdmin ? styles.dashTable : styles.dashTableUser}>
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          {loading ? (
            <Loader show={true} />
          ) : error ? (
            <h1 className="w-full text-red-600 mx-auto text-xl mt-8 text-center">
              An Error Occurred while Fetching Data!!
            </h1>
          ) : tableData?.length === 0 ? (
            <h1 className="text-center text-gray-500 font-bold py-4 text-xl">
              No Eligible Student added yet!
            </h1>
          ) : (
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  {labels.map((lbl, i) => (
                    <th key={i.toString()} scope="col" className="py-3 px-6">
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
                {tableData?.map((item, i) => (
                  <tr key={i.toString()} className={styles.dashTableTR}>
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.matric}
                    </th>
                    <td className="py-1 px-6">{item.level}</td>
                    <td className="py-1 px-6">{item.department}</td>
                    <td className="py-1 px-6">{item.institution}</td>
                    <td className="py-1 px-6">{item.supervisor}</td>
                    <td className="py-4 px-6 text-right flex flex-row items-center">
                      <AiOutlineEye
                        size={"1.2rem"}
                        className="mr-2 cursor-pointer text-green-300 hover:text-green-600"
                        onClick={() => onViewHandler(i)}
                      />
                      <FaEdit
                        size={"1.2rem"}
                        className="mr-2 cursor-pointer text-blue-300 hover:text-blue-600"
                      />
                      <CgTrashEmpty
                        size={"1.2rem"}
                        className="cursor-pointer text-red-300 hover:text-red-600"
                        onClick={() => onDeleteHandler(item.id)}
                      />
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

export default ListEligible;
