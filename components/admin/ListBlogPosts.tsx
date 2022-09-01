import GlobalContext from "../../context/GlobalContext";
import styles from "../../styles/Dashboard.module.scss";
import { FaEdit, FaPlus } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import { BiSearchAlt2 } from "react-icons/bi";
import { CgTrashEmpty } from "react-icons/cg";
import { useContext } from "react";
import ViewBlogPost from "./ViewBlogPost";
import AddBlogPost from "./AddBlogPost";

const ListBlogPosts = () => {
  const { showAddModal, setShowAddModal, showDetail, setShowDetail } =
    useContext(GlobalContext);
  const labels = [
    "Matric No",
    "Level",
    "Department",
    "Institution",
    "Supervisor",
  ];
  const tableData = [
    ...[1, 2, 3, 4, 5, 5, 7, 8, 8, 9, 0].map(() => {
      return {
        matric: "SCI17CSC031",
        level: "400",
        department: "Computer Science",
        institution: "Federal University Lokoja",
        supervisor: "Dr. Kayode Olawunyi",
      };
    }),
  ];
  return (
    <>
      <div className={styles.mainHeader}>
        <div>
          <input type="text" placeholder="Search here..." />
          <span>
            <BiSearchAlt2 size={"1.6rem"} />
          </span>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className={styles.addStudentBtn}
        >
          Add Eligible <FaPlus className="ml-1" />
        </button>
      </div>
      <ViewBlogPost show={showDetail} />
      <AddBlogPost show={showAddModal} />
      <div className={styles.dashTable}>
        <div className={styles.blog} onClick={() => setShowDetail(true)}>
          <div>
            <img src="../images/image1.png" />
            <div className={styles.blogContent}>
              <h1>BlogPost Title</h1>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit...</p>
            </div>
          </div>
          <div className={styles.blogDate}>
            <p>25|AUGUST|2022</p>
            <p>12:34PM</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListBlogPosts;
