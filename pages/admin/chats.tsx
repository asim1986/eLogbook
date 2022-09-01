import DashSideBar from "../../components/DashSideBar";
import DashHeader from "../../components/DashHeader";
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
        <Chat />
      </main>
    </>
  );
};

export default Chats;
