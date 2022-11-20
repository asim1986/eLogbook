import DeleteAccount from "../../components/admin/DeleteAccount";
import { useAppSelector } from "../../hooks/store.hook";
import styles from "../../styles/Profile.module.scss";
import { Navbar } from "../../components/NavBar";
import { useRouter } from "next/router";
import Head from "next/head";
import Login from "../login";
import React from "react";

const DeleteUserAccount = () => {
  const isAuth = useAppSelector((state) => state.auth?.isAuth);
  const router = useRouter();

  if (!isAuth) {
    router.replace("/login");
    return <Login />;
  }
  
  return (
    <>
      <Head>
        <title>Delete Account</title>
      </Head>
      <Navbar />
      <main>
        <DeleteAccount style={styles.profiles} user="student" />
      </main>
    </>
  );
};

export default DeleteUserAccount;