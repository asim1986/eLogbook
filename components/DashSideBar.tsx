import { CSSTransition } from "react-transition-group";
import styles from "../styles/Dashboard.module.scss";
import GlobalContext from "../context/GlobalContext";
import animate from "../styles/animate.module.css";
import MainAside from "./admin/MainAside";
import { useContext, useRef } from "react";
import Aside from "./admin/Aside";

const DashSideBar = () => {
  const { showSideBar, setShowSideBar } = useContext(GlobalContext);
  const nodeRef = useRef(null);

  return (
    <>
      <div className={styles.showAside} onClick={() => setShowSideBar(true)}>
        <img src="../../images/slideOpen.png" className="m-0 h-20 sm:h-24 landscape:h-16" />
      </div>

      {/* SHOW FOR LARGE SCREEN */}
      <MainAside />

      {/* SHOW FOR SMALL AND MEDIUM SCREEN */}
      <CSSTransition
        in={showSideBar}
        key={"enter"}
        nodeRef={nodeRef}
        timeout={400}
        mountOnEnter
        unmountOnExit
        classNames={{
          enterActive: animate.slideEnterActive,
          exitActive: animate.slideExitActive,
        }}
      >
        <Aside ref={nodeRef} show={showSideBar} />
      </CSSTransition>
    </>
  );
};

export default DashSideBar;
