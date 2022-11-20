import React, { useState, useContext, useEffect } from "react";
import CalendarHeader from "../../components/CalendarHeader";
import GlobalContext from "../../context/GlobalContext";
import { useAppSelector } from "../../hooks/store.hook";
import EventModal from "../../components/EventModal";
import SidebarSM from "../../components/SideBarSM";
import { Navbar } from "../../components/NavBar";
import Sidebar from "../../components/Sidebar";
import { getMonth } from "../../utils/util";
import Month from "../../components/Month";
import { useRouter } from "next/router";
import { NextPage } from "next";
import Head from "next/head";
import Login from "../login";

const LogBook: NextPage = () => {
  const { monthIndex, showEventModal, showSideBar } = useContext(GlobalContext);
  const role = useAppSelector((state) => state.auth?.userStudData?.user);
  const isAuth = useAppSelector((state) => state.auth?.isAuth);
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const router = useRouter();

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);  
  // console.log("ROLE ==>>>>> ", role); 

  if (!isAuth && role !== "Student" && role !== "Admin") {
    router.replace("/login");
    return <Login />;
  }

  return (
    <>
      <Head>
        <title>Logbook</title>
      </Head>
      <Navbar />
      <EventModal show={showEventModal} />
      <div className="h-screen flex flex-col">
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
