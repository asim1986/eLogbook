import toast, { Toaster } from "react-hot-toast";
import { CSSTransition } from "react-transition-group";
import { IErrorModal } from "../interfaces/errormodal";
import { useRef, Fragment, useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import styles from "../styles/Logbook.module.scss";
import animate from "../styles/animate.module.css";
import { BiError } from "react-icons/bi";

export const ErrorModal = (args: IErrorModal) => {
  const { message, show, reset } = args;
  const nodeRef = useRef(null);
  const nodeRefModal = useRef(null);
  const { setShowEventModal } = useContext(GlobalContext);

  return (
    <Fragment>
      <CSSTransition
        nodeRef={nodeRef}
        mountOnEnter
        unmountOnExit
        in={show}
        timeout={{ enter: 400, exit: 1000 }}
        classNames={{
          enterActive: animate.fadeEnterActive,
          exitActive: animate.fadeExitActive,
        }}
      >
        <div ref={nodeRef} className={styles.backBlur}></div>
      </CSSTransition>
      <CSSTransition
        nodeRef={nodeRefModal}
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
          ref={nodeRefModal}
          className="fixed z-50 inset-x-0 mx-auto w-1/4 rounded-lg mt-[5%] border-lg bg-[#374151] text-slate-50 py-2"
        >
          <h1 className="text-center border-b-2 border-gray-500">ERROR!</h1>
          <span className="flex text-lg justify-center text-center px-2 items-center space-x-2 my-3">
            <BiError color="#ff0000" size={"2rem"} />
            <h1>{message}!</h1>
          </span>
          <div className="flex justify-center">
            <button
              onClick={() => {
                reset();
                setShowEventModal(false);
              }}
              className="bg-blue-900 hover:bg-blue-700 py-[.1rem] px-4 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      </CSSTransition>
    </Fragment>
  );
};
