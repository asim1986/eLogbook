import { DeleteType } from "../../interfaces/comp.interface";
import GlobalContext from "../../context/GlobalContext";
import { CSSTransition } from "react-transition-group";
import animate from "../../styles/animate.module.css";
import styles from "../../styles/Signup.module.scss";
import { AiFillWarning } from "react-icons/ai";
import React, { useContext } from "react";
import { MdClose } from "react-icons/md";

const DeleteModal = ({ show, title, content, onYes }: DeleteType) => {
  const { setShowDetail } = useContext(GlobalContext);

  return (
    <>
      <CSSTransition
        mountOnEnter
        unmountOnExit
        in={show}
        timeout={{ enter: 400, exit: 1000 }}
        classNames={{
          enter: "",
          enterActive: animate.fadeEnterActive,
          exit: "",
          exitActive: animate.fadeExitActive,
        }}
      >
        <div className={styles.backDropUser}></div>
      </CSSTransition>
      <CSSTransition
        mountOnEnter
        unmountOnExit
        in={show}
        timeout={{ enter: 400, exit: 1000 }}
        classNames={{
          enter: "",
          enterActive: animate.animateEnterActive,
          exit: "",
          exitActive: animate.animateExitActive,
        }}
      >
        <div className={styles.addEligibleUser}>
          <div className="sm:p-5 lg:p-3">
            <div className="flex justify-between w-full">
              <div className="">
                <MdClose
                  onClick={() => setShowDetail(false)}
                  size={"1.5rem"}
                  className="cursor-pointer p-0 m-0 hover:text-red-500"
                />
              </div>
            </div>
            <h1 className="text-center uppercase text-2xl font-bold">
              {title}
            </h1>
            <div className="w-full mt-2 text-center">
              <span className="flex flex-row justify-center items-center">
                <h2 className="font-normal text-xl">{content}</h2>
                <AiFillWarning size={"2rem"} className="text-yellow-500" />
              </span>

              <div className="flex flex-row justify-center mt-4 py-2">
                <button
                  className="bg-red-700 px-5 py-1 rounded-2xl hover:bg-red-800 mr-2"
                  onClick={onYes}
                >
                  Yes
                </button>
                <button
                  onClick={() => setShowDetail(false)}
                  className="bg-blue-700 px-5 py-1 rounded-2xl hover:bg-blue-800 ml-2"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      </CSSTransition>
    </>
  );
};

export default DeleteModal;
