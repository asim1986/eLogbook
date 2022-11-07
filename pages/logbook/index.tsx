import React, { useState, useContext, useEffect } from "react";
import CalendarHeader from "../../components/CalendarHeader";
import GlobalContext from "../../context/GlobalContext";
import EventModal from "../../components/EventModal";
import SidebarSM from "../../components/SideBarSM";
import { GetServerSideProps, NextPage } from "next";
import { Navbar } from "../../components/NavBar";
import Sidebar from "../../components/Sidebar";
import { getMonth } from "../../utils/util";
import Month from "../../components/Month";
import store from "../../store/store";
import Head from "next/head";

// export const getServerSideProps = (context: any) => {
//   const isAuth = store.getState().auth.isAuth;
//   const role = store.getState().auth.userData.user;

//   if ((!isAuth && role !== "Student" && role !== "Admin") || !role) {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// };

const LogBook: NextPage = () => {
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal, showSideBar } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

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
