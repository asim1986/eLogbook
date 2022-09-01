import UserProfile from "../../components/admin/UserProfile";
import DashSideBar from "../../components/DashSideBar";
import DashHeader from "../../components/DashHeader";
import Head from "next/head";
import React from "react";


const Profile = () => {
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <main>
        <DashHeader title="Account Settings" />
        <DashSideBar />
        <UserProfile />
      </main>
    </>
  );
};

export default Profile;