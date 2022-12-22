import GlobalContext from "../../context/GlobalContext";
import { CSSTransition } from "react-transition-group";
import animate from "../../styles/animate.module.css";
import styles from "../../styles/Signup.module.scss";
import SupervisorForm from "../SupervisorForm";
import "react-phone-number-input/style.css";
import { useContext, useRef } from "react";
import BackBlurDrop from "../BackBlurDrop";
import { MdClose } from "react-icons/md";

const AddCordinator = ({ show }: { show: boolean }) => {
  const nodeRef = useRef(null);
  const { setShowAddModal } = useContext(GlobalContext);

  return (
    <>
      <BackBlurDrop show={show} />
      <CSSTransition
        nodeRef={nodeRef}
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
        <div ref={nodeRef} className={styles.addStudent}>
          <div className="sm:p-5 lg:p-5">
            <MdClose
              onClick={() => setShowAddModal(false)}
              className="cursor-pointer mt-3 ml-3 md:m-0 md:p-0 text-2xl md:text-3xl"
            />
            <h1>Add a Coordinator Account</h1>
            <SupervisorForm isAdmin={true} btnTitle={"Add"} isSupervisor={false} />
          </div>
        </div>
      </CSSTransition>
    </>
  );
};

export default AddCordinator;
