import { useAppSelector } from "../hooks/store.hook";
import styles from "../styles/Chat.module.scss";
import { Navbar } from "../components/NavBar";
import Chat from "../components/admin/chat";
import { useRouter } from "next/router";
import Head from "next/head";
import Login from "./login";
import React from "react";

const Chats = () => {
  const isAuth = useAppSelector((state) => state.auth?.isAuth);
  const router = useRouter();

  if (!isAuth) {
    router.replace("/login");
    return <Login />;
  }

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
