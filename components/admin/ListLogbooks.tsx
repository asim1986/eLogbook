import GlobalContext from "../../context/GlobalContext";
import styles from "../../styles/Dashboard.module.scss";
import { AiOutlineEye } from "react-icons/ai";
import { BiSearchAlt2 } from "react-icons/bi";
import { CgTrashEmpty } from "react-icons/cg";
import { FaEdit } from "react-icons/fa";
import ViewLogbook from "./ViewLogbook";
import { useContext } from "react";
import Link from "next/link";

interface ListLogType {
  style: any;
  styleHeader: any;
  user: string;
}

const ListLogbooks = ({ style, styleHeader, user }: ListLogType) => {
  const { showDetail } = useContext(GlobalContext);
  const labels = ["Name", "Matric No", "School", "Department"];
  const tableData = [
    ...[1, 2, 3, 4, 5, 5, 7, 8, 8, 9, 0, 0].map(() => {
      return {
        name: "Vicolas Akoh",
        matric: "SCI17CSC031",
        school: "Federal Unversity Lokoja",
        department: "Computer Science",
      };
    }),
  ];
  return (
    <>
      <div className={styleHeader}>
        <div className="md:w-4/12">
          <input type="text" placeholder="Search here..." />
          <span>
            <BiSearchAlt2 size={"1.6rem"} />
          </span>
        </div>
        <div className="font-bold text-2xl mb-2 md:mb-0 text-gray-300 lg:mr-5 md:mr-2">
          <h1>Logbook Activities</h1>
        </div>
      </div>
      <ViewLogbook show={showDetail} />
      <div className={style}>
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
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
              {tableData.map((item, i) => (
                <tr key={i.toString()} className={styles.dashTableTR}>
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.name}
                  </th>
                  <td className="py-1 px-6">{item.matric}</td>
                  <td className="py-1 px-6">{item.school}</td>
                  <td className="py-1 px-6">{item.department}</td>
                  <td className="py-4 px-6 text-right flex flex-row items-center">
                    <Link href={user == "admin" ? "/admin/logbook/56" : "/activities/2344"}>
                      <a className="px-1">
                        <AiOutlineEye
                          size={"1.2rem"}
                          className="mr-2 cursor-pointer text-green-300 hover:text-green-600"
                        />
                      </a>
                    </Link>
                    {user === "admin" && (
                      <>
                        <FaEdit
                          size={"1.2rem"}
                          className="mr-2 cursor-pointer text-blue-300 hover:text-blue-600"
                        />
                        <CgTrashEmpty
                          size={"1.2rem"}
                          className="cursor-pointer text-red-300 hover:text-red-600"
                        />
                      </>
                    )}
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

export default ListLogbooks;
