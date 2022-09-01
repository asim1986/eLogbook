import DeleteAccount from "../../components/admin/DeleteAccount";
import DashSideBar from "../../components/DashSideBar";
import DashHeader from "../../components/DashHeader";
import Head from "next/head";
import React from "react";

const DeleteUserAccount = () => {
  return (
    <>
      <Head>
        <title>Delete Account</title>
      </Head>
      <main>
        <DashHeader title="Account Settings" />
        <DashSideBar />
        <DeleteAccount />
      </main>
    </>
  );
};

export default DeleteUserAccount;
