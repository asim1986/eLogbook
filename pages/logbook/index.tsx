import React, { useState, useContext, useEffect } from "react";
import CalendarHeader from "../../components/CalendarHeader";
import GlobalContext from "../../context/GlobalContext";
import EventModal from "../../components/EventModal";
import SidebarSM from "../../components/SideBarSM";
import { Navbar } from "../../components/NavBar";
import Sidebar from "../../components/Sidebar";
import { getMonth } from "../../utils/util";
import Month from "../../components/Month";
import Head from "next/head";


const LogBook = () => {
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal, showSideBar, showDetail } = useContext(GlobalContext);

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
        <EventModal show={showEventModal} />
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
