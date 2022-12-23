import UserProfile from "../../components/admin/UserProfile";
import { useAppSelector } from "../../hooks/store.hook";
import DashSideBar from "../../components/DashSideBar";
import styles from "../../styles/Profile.module.scss";
import DashHeader from "../../components/DashHeader";
import { useRouter } from "next/router";
import { NextPage } from "next";
import Head from "next/head";
import AdminLogin from ".";
import React from "react";

const Profile: NextPage = () => {
  const role = useAppSelector((state) => state.auth?.userAdminData?.user);
  const isAuth = useAppSelector((state) => state.auth?.isAuth);
  const router = useRouter();

  if ((!isAuth && role !== "Admin") || !role) {
    router.replace("/admin");
    return <AdminLogin />;
  }

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <main>
        <DashHeader title="Account Settings" />
        <DashSideBar />
        <UserProfile style={styles.profile} />
      </main>
    </>
  );
};

export default Profile;
