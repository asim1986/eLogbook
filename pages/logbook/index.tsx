import CalendarHeader from "../../components/CalendarHeader";
import GlobalContext from "../../context/GlobalContext";
import { useAppDispatch, useAppSelector } from "../../hooks/store.hook";
import EventModal from "../../components/EventModal";
import SidebarSM from "../../components/SideBarSM";
import { Navbar } from "../../components/NavBar";
import Sidebar from "../../components/Sidebar";
import Month from "../../components/Month";
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import Head from "next/head";
import Login from "../login";
import { useLazyQuery } from "@apollo/client";
import { client } from "../../graphql/apolloClient";
import { setRest } from "../../store/slice/auth.slice";
import { GET_STUD_LOG } from "../../graphql/query/student";
import { StudLog } from "../../interfaces/comp.interface";

const LogBook: NextPage = () => {
  const studentId = useAppSelector((state) => state.auth?.userStudData?.id);
  const role = useAppSelector((state) => state.auth?.userStudData?.user);
  const { showEventModal, showSideBar } = useContext(GlobalContext);
  const isAuth = useAppSelector((state) => state.auth?.isAuth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const logout = async () => {
    // Reset Apollo Cache
    client.resetStore();
    dispatch(setRest());
    router.push("/login");
  };

  const [getStudLog, { data }] = useLazyQuery(GET_STUD_LOG, {
    onError: ({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) => {
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          );
          const tokenErr = message.split(":")[0];
          if (tokenErr === "TokenExpiredError") {
            logout();
          }
        });
      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
      }
    },
  });

  useEffect(() => {
    getStudLog({
      variables: {
        studentId,
      },
    });
  }, []);

  const logBookData: StudLog[] = data?.student.logbooks

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
      <EventModal show={showEventModal} logBookData={logBookData} />
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
