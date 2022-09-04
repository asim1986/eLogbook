import DeleteAccount from "../../components/admin/DeleteAccount";
import styles from "../../styles/Profile.module.scss";
import { Navbar } from "../../components/NavBar";
import Head from "next/head";
import React from "react";

const DeleteUserAccount = () => {
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