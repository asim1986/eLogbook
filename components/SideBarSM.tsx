import React from "react";
import CreateEventButton from "./CreateEventButton";
import SmallCalendar from "./SmallCalendar";
import styles from "../styles/Logbook.module.scss";
import Labels from "./Labels";

export default function SidebarSM() {
  return (
    <aside className={styles.eventAsideSM}>
      <CreateEventButton />
      <SmallCalendar />
      <Labels />
    </aside>
  );
}
