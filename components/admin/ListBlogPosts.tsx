import GlobalContext from "../../context/GlobalContext";
import styles from "../../styles/Dashboard.module.scss";
import ViewBlogPost from "./ViewBlogPost";
import AddBlogPost from "./AddBlogPost";
import MainHeader from "./MainHeader";
import { useContext } from "react";

const ListBlogPosts = () => {
  const { showAddModal, showDetail, setShowDetail } = useContext(GlobalContext);
  return (
    <>
      <MainHeader style={styles.mainHeader} title={"Add BlogPost"} />

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
