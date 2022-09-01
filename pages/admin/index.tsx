import Statistics from "../../components/admin/Statistics";
import DashSideBar from "../../components/DashSideBar";
import DashHeader from "../../components/DashHeader";
import Head from "next/head";
import React from "react";


const Dashboard = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <main>
        <DashHeader title="Dashboard" />
        <DashSideBar />
        <Statistics />
      </main>
    </>
  );
};

export default Dashboard;