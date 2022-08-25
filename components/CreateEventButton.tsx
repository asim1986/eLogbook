import React, { useContext } from "react";
import { FaPlus } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import GlobalContext from "../context/GlobalContext";
import styles from "../styles/Logbook.module.scss";

const CreateEventButton = () => {
  const { setShowEventModal, setShowSideBar } = useContext(GlobalContext);
  return (
    <div className={styles.eventBtnWrapper}>
      <button
        onClick={() => {
          setShowEventModal(true);
          setShowSideBar(false);
        }}
        className={styles.eventCreateBtn}
      >
        <span>
          <FaPlus />
        </span>
        <span className="pl-1"> Create</span>
      </button>
      <button onClick={() => setShowSideBar(false)}>
        <MdClose size={"1.5rem"} />
      </button>
    </div>
  );
};

export default CreateEventButton;
