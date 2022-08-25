import React, { useState, useContext, useEffect } from "react";
import styles from "../../styles/Logbook.module.scss";
import { getMonth } from "../../utils/util";
import Sidebar from "../../components/Sidebar";
import CalendarHeader from "../../components/CalendarHeader";
import Month from "../../components/Month";
import GlobalContext from "../../context/GlobalContext";
import EventModal from "../../components/EventModal";
import { Navbar } from "../../components/NavBar";
import Head from "next/head";
import SidebarSM from "../../components/SideBarSM";

const LogBook = () => {
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal, showSideBar } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <>
      <Head>
        <title>LogBook</title>
      </Head>
      <header><Navbar /></header>

      <div className="h-screen flex flex-col">
        {showEventModal && <EventModal />}
        <CalendarHeader />
        <div className="flex flex-1">
          <Sidebar />
          {showSideBar && <SidebarSM />}
          <Month month={currenMonth} />
        </div>
      </div>
    </>
  );
};

export default LogBook;
