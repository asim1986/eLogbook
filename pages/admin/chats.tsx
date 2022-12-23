import { useAppSelector } from "../../hooks/store.hook";
import DashSideBar from "../../components/DashSideBar";
import DashHeader from "../../components/DashHeader";
import styles from "../../styles/Chat.module.scss";
import Chat from "../../components/admin/chat";
import { useRouter } from "next/router";
import { NextPage } from "next";
import Head from "next/head";
import AdminLogin from ".";
import React from "react";

const Chats: NextPage = () => {
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
        <title>Chat</title>
      </Head>
      <main>
        <DashHeader title="Chats" />
        <DashSideBar />
        <Chat style={styles.chat} />
      </main>
    </>
  );
};

export default Chats;
