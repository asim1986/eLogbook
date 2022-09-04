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
import { useContext } from "react";
import Link from "next/link";

interface ActivitiesType {
  style: any;
  styleHeader: any;
  user: string;
}

const Activities = ({ style, styleHeader, user }: ActivitiesType) => {
  const { showDetail, setShowDetail } = useContext(GlobalContext);
  const labels = ["Title", "Activity ID", "Description", "Day", "Approved"];
  const tableData = [
    ...[1, 2, 3, 4, 5, 5, 7, 8, 8, 9, 0, 0].map(() => {
      return {
        title: "Array Destructuring",
        id: 1661438735332,
        description: "Learn object and array destructing using...",
        day: new Date("2022-08-25T23:00:00.000Z").toDateString(),
        approved: false,
      };
    }),
  ];
  return (
    <>
      <div className={styleHeader}>
        <div className="flex flex-row mb-7 items-center">
          <div>
            <Link href={user === "admin" ? "/admin/logbook" : "/activities"}>
              <a>
                <IoMdArrowRoundBack size={"2rem"} className="cursor-pointer" />
              </a>
            </Link>
          </div>

          <div className="ml-2 w-full">
            <input type="text" placeholder="Search here..." />
            <span>
              <BiSearchAlt2 size={"1.6rem"} />
            </span>
          </div>
        </div>

        <div className={styles.littleInfo}>
          <img src="../../images/Passport.jpg" alt="passport" />
          <div className="flex flex-col text-gray-400">
            <p>incrediblechamp1@gmail.com</p>
            <p>SCI17CSC031</p>
            <p>Computer Science</p>
            <p>Federal University Lokoja</p>
          </div>
        </div>
      </div>
      <ViewLogbook show={showDetail} />
      <div className={style}>
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
                    {item.title}
                  </th>
                  <td className="py-1 px-6">{item.id}</td>
                  <td className="py-1 px-6">{item.description}</td>
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
                      onClick={() => setShowDetail(true)}
                    />
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

export default Activities;
