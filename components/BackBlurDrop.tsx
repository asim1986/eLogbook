import { CSSTransition } from "react-transition-group";
import GlobalContext from "../context/GlobalContext";
import animate from "../styles/animate.module.css";
import styles from "../styles/Signup.module.scss";
import { useContext, useRef } from "react";

const BackBlurDrop = ({ show }: { show: boolean }) => {
  const nodeRef = useRef<any>(null);
  const { setShowDetail, setShowAddModal } = useContext(GlobalContext);
  return (
    <CSSTransition
      nodeRef={nodeRef}
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
      <div
        onClick={() => {
          setShowDetail(false);
          setShowAddModal(false);
        }}
        ref={nodeRef}
        className={styles.backDrop}
      ></div>
    </CSSTransition>
  );
};

export default BackBlurDrop;
