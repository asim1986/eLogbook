import { ViewDetailType } from "../interfaces/comp.interface";
import { CSSTransition } from "react-transition-group";
import GlobalContext from "../context/GlobalContext";
import animate from "../styles/animate.module.css";
import styles from "../styles/Signup.module.scss";
import { CgTrashEmpty } from "react-icons/cg";
import { useContext, useRef } from "react";
import { MdClose } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const ViewDetails = (props: ViewDetailType) => {
  const { show, labels, img, title, isAdmin = true, id, onDelCallback } = props;
  const { setShowDetail, setShowAddModal } = useContext(GlobalContext);
  const nodeRef = useRef<any>(null);

  return (
    <CSSTransition
      nodeRef={nodeRef}
      mountOnEnter
      unmountOnExit
      in={show}
      timeout={{ enter: 400, exit: 1000 }}
      classNames={{
        enterActive: animate.animateEnterActive,
        exitActive: animate.animateExitActive,
      }}
    >
      <div
        ref={nodeRef}
        className={isAdmin ? styles.addStudent : styles.addStudentUser}
      >
        <div className="sm:p-5 lg:p-5">
          <div className="flex justify-between w-full mt-2 md:mt-0">
            <div className="">
              <MdClose
                onClick={() => setShowDetail(false)}
                size={"1.5rem"}
                className="cursor-pointer ml-2 md:ml-0 hover:text-red-500"
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
                onClick={() => onDelCallback(id)}
              />
            </div>
          </div>

          <h1>{title}</h1>
          <div className={styles.infoSectionMain}>
            {img && (
              <div className={styles.passportSt}>
                <img src="../images/Passport.jpg" alt="passport" />
              </div>
            )}

            {!img ? (
              <div className="w-full mt-2 flex justify-center">
                <div className={styles.infoSection}>
                  {labels.map((lbl, i) => (
                    <div key={i.toString()}>
                      <span className="text-gray-500 uppercase w-1/2">
                        {lbl.title}
                      </span>
                      <span className="font-bold text-start w-1/2">
                        {lbl.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className={styles.infoSection}>
                {labels.map((lbl, i) => (
                  <div key={i.toString()}>
                    <span className="text-gray-500 uppercase">{lbl.title}</span>
                    <span className="font-bold text-start w-1/2">
                      {lbl.value}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default ViewDetails;
