import React from "react";
import CreateEventButton from "./CreateEventButton";
import SmallCalendar from "./SmallCalendar";
import styles from "../styles/Logbook.module.scss";
import Labels from "./Labels";

export default function Sidebar() {
  return (
    <aside className={styles.eventAside}>
      <CreateEventButton />
      <SmallCalendar />
      <Labels />
    </aside>
  );
}
