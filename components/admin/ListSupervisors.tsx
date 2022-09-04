import GlobalContext from "../../context/GlobalContext";
import styles from "../../styles/Dashboard.module.scss";
import ViewSupervisor from "./ViewSupervisor";
import { AiOutlineEye } from "react-icons/ai";
import { CgTrashEmpty } from "react-icons/cg";
import AddSupervisor from "./AddSupervisor";
import { FaEdit } from "react-icons/fa";
import MainHeader from "./MainHeader";
import { useContext } from "react";

const ListSupervisor = () => {
  const { showAddModal, showDetail, setShowDetail } = useContext(GlobalContext);
  const labels = ["Names", "Staff ID", "Email", "Department", "Gender"];
  const tableData = [
    ...[1, 2, 3, 4, 5, 5, 7, 8, 8, 9].map(() => {
      return {
        name: "Dr Oluwayimi Kayode",
        matric: "FUL343BN",
        email: "kayode@fulokoja.edu.ng",
        department: "Computer Science",
        sex: "Female",
      };
    }),
  ];
  return (
    <>
      <MainHeader style={styles.mainHeader} title={"Add Supervisor"} />
      <ViewSupervisor show={showDetail} />
      <AddSupervisor show={showAddModal} />
      <div className={styles.dashTable}>
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {labels.map((lbl) => (
                  <th scope="col" className="py-3 px-6">
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
              {tableData.map((item) => (
                <tr className={styles.dashTableTR}>
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.name}
                  </th>
                  <td className="py-1 px-6">{item.matric}</td>
                  <td className="py-1 px-6">{item.email}</td>
                  <td className="py-1 px-6">{item.department}</td>
                  <td className="py-1 px-6">{item.sex}</td>
                  <td className="py-4 px-6 text-right flex flex-row items-center">
                    <AiOutlineEye
                      size={"1.2rem"}
                      className="mr-2 cursor-pointer text-green-300 hover:text-green-600"
                      onClick={() => setShowDetail(true)}
                    />
                    <FaEdit
                      size={"1.2rem"}
                      className="mr-2 cursor-pointer text-blue-300 hover:text-blue-600"
                    />
                    <CgTrashEmpty
                      size={"1.2rem"}
                      className="cursor-pointer text-red-300 hover:text-red-600"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ListSupervisor;
