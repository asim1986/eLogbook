import ChangePassword from "../../components/admin/ChangePassword";
import DashSideBar from "../../components/DashSideBar";
import DashHeader from "../../components/DashHeader";
import Head from "next/head";
import React from "react";

const ChangeUserPassword = () => {
  return (
    <>
      <Head>
        <title>Change Password</title>
      </Head>
      <main>
        <DashHeader title="Account Settings" />
        <DashSideBar />
        <ChangePassword />
      </main>
    </>
  );
};

export default ChangeUserPassword;
