import styles from "../../styles/Signup.module.scss";
import { CSSTransition } from "react-transition-group";
import GlobalContext from "../../context/GlobalContext";
import animate from "../../styles/animate.module.css";
import { MdClose } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { CgTrashEmpty } from "react-icons/cg";
import BackBlurDrop from "../BackBlurDrop";
import { useContext } from "react";

const ViewBlogPost = ({ show }: { show: boolean }) => {
  const { setShowDetail, setShowAddModal } = useContext(GlobalContext);
  const labels = [
    {
      title: "Content",
      value:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis, dicta quia nam hic iusto veritatis at dignissimos eum similique expedita nihil ut nemo ratione atque explicabo, sapiente distinctio laboriosam velit. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis, dicta quia nam hic iusto veritatis at dignissimos eum similique expedita nihil ut nemo ratione atque explicabo, sapiente distinctio laboriosam velit. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis, dicta quia nam hic iusto veritatis at dignissimos eum similique expedita nihil ut nemo ratione atque explicabo, sapiente distinctio laboriosam velit.",
    },
  ];

  return (
    <>
      <BackBlurDrop show={show} />
      <CSSTransition
        mountOnEnter
        unmountOnExit
        in={show}
        timeout={{ enter: 400, exit: 1000 }}
        classNames={{
          enterActive: animate.animateEnterActive,
          exitActive: animate.animateExitActive,
        }}
      >
        <div className={styles.addStudent}>
          <div className="sm:p-5 lg:p-5">
            <div className="flex justify-between w-full">
              <div className="">
                <MdClose
                  onClick={() => setShowDetail(false)}
                  size={"1.5rem"}
                  className="cursor-pointer p-0 m-0 hover:text-red-500"
                />
              </div>
              <div className="flex justify-between mr-2">
                <FaEdit
                  size={"1.5rem"}
                  onClick={() => {
                    setShowDetail(false);
                    setShowAddModal(true);
                  }}
                  className="cursor-pointer mr-2 hover:text-blue-500"
                />
                <CgTrashEmpty
                  size={"1.5rem"}
                  className="cursor-pointer hover:text-red-500"
                />
              </div>
            </div>
            <h1 className={styles.blogTitle}>BlogPost Title</h1>
            <div className="flex flex-row flex-wrap w-full mt-2">
              <div className={styles.passportSt}>
                <img src="../images/image1.png" alt="blog post" />
              </div>
              <div className={styles.infoSectionBlog}>
                {labels.map((lbl) => (
                  <div>
                    <span className="font-bold text-start w-3/4">
                      {lbl.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CSSTransition>
    </>
  );
};

export default ViewBlogPost;
