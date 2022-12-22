import CreateEventButton from "./CreateEventButton";
import styles from "../styles/Logbook.module.scss";
import SmallCalendar from "./SmallCalendar";
import Labels from "./Labels";
import React from "react";

const Sidebar = () => {
  return (
    <aside className={styles.eventAside}>
      <CreateEventButton />
      <SmallCalendar />
      <Labels />
    </aside>
  );
};

export default Sidebar;
