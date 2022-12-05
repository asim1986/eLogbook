import CalendarHeader from "../../components/CalendarHeader";
import GlobalContext from "../../context/GlobalContext";
import { useAppSelector } from "../../hooks/store.hook";
import EventModal from "../../components/EventModal";
import SidebarSM from "../../components/SideBarSM";
import { Navbar } from "../../components/NavBar";
import Sidebar from "../../components/Sidebar";
import Month from "../../components/Month";
import React, { useContext } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import Head from "next/head";
import Login from "../login";

const LogBook: NextPage = () => {
  const role = useAppSelector((state) => state.auth?.userStudData?.user);
  const { showEventModal, showSideBar } = useContext(GlobalContext);
  const isAuth = useAppSelector((state) => state.auth?.isAuth);
  const router = useRouter();

  if ((!isAuth && role !== "Student" && role !== "Admin") || !role) {
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
          <Month />
        </div>
      </div>
    </>
  );
};

export default LogBook;
