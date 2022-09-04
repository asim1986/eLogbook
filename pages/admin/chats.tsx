import DashSideBar from "../../components/DashSideBar";
import DashHeader from "../../components/DashHeader";
import styles from "../../styles/Chat.module.scss";
import Chat from "../../components/admin/chat";
import Head from "next/head";
import React from "react";

const Chats = () => {
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