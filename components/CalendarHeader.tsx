import dayjs from "dayjs";
import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import styles from "../styles/Logbook.module.scss";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdViewSidebar,
} from "react-icons/md";

const CalendarHeader = () => {
  const { monthIndex, setMonthIndex, setShowSideBar } = useContext(GlobalContext);
  const handlePrevMonth = () => {
    setMonthIndex(monthIndex - 1);
  };

  const handleNextMonth = () => {
    setMonthIndex(monthIndex + 1);
  };

  const handleReset = () => {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs(new Date()).month()
    );
  };

  return (
    <header className="mt-12 px-4 py-0 flex items-center w-full flex-wrap">
      <span className={styles.showSideBarBtn} onClick={() => setShowSideBar(true)}>
        <MdViewSidebar size={"2rem"} />
      </span>
      <h1 className={styles.eventHeaderH1}>Activities</h1>
      <button onClick={handleReset} className={styles.resetBtn}>
        Today
      </button>
      <button onClick={handlePrevMonth}>
        <span className={styles.eventArrow}>
          <MdKeyboardArrowLeft size={"2rem"} className="py-0" />
        </span>
      </button>
      <button onClick={handleNextMonth}>
        <span className={styles.eventArrow}>
          <MdKeyboardArrowRight size={"2rem"} className="py-0" />
        </span>
      </button>
      <h2 className={styles.currentMonth}>
        {dayjs(new Date(dayjs(new Date()).year(), monthIndex)).format(
          "MMMM YYYY"
        )}
      </h2>
    </header>
  );
};

export default CalendarHeader;
