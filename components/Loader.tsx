import { CSSTransition } from "react-transition-group";
import styles from "../styles/Logbook.module.scss";
import animate from "../styles/animate.module.css";
import { Rings } from "react-loader-spinner";
import { Fragment, useRef } from "react";

const Loader = ({ show }: { show: boolean }) => {
  const nodeRef = useRef(null);
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
      <div className="absolute z-50 mx-auto mt-[30vh] inset-x-0 flex justify-center">
        <Rings
          height="100"
          width="100"
          color="#1d4ed8"
          radius="6"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="rings-loading"
        />
      </div>
    </Fragment>
  );
};

export default Loader;
