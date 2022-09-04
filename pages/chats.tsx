import styles from "../styles/Chat.module.scss";
import { Navbar } from "../components/NavBar";
import Chat from "../components/admin/chat";
import Head from "next/head";
import React from "react";


const Chats = () => {
  return (
    <>
      <Head>
        <title>Chat</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main>
        <Chat style={styles.chats} />
      </main>
    </>
  );
};

export default Chats;