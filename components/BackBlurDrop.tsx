import { BackBlurDropType } from "../interfaces/comp.interface";
import { CSSTransition } from "react-transition-group";
import GlobalContext from "../context/GlobalContext";
import animate from "../styles/animate.module.css";
import styles from "../styles/Signup.module.scss";
import { useContext, useRef } from "react";

const BackBlurDrop = ({ show, style = false, isAdmin, exit = 1000 }: BackBlurDropType) => {
  const nodeRef = useRef<any>(null);
  const { setShowDetail, setShowAddModal } = useContext(GlobalContext);
  
  return (
    <CSSTransition
      nodeRef={nodeRef}
      mountOnEnter
      unmountOnExit
      in={show}
      timeout={{ enter: 400, exit }}
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
        className={`${style && !isAdmin ? styles.backDropUser : styles.backDrop}`}
      ></div>
    </CSSTransition>
  );
};

export default BackBlurDrop;
