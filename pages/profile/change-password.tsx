import ChangePassword from "../../components/admin/ChangePassword";
import styles from "../../styles/Profile.module.scss";
import { Navbar } from "../../components/NavBar";
import Head from "next/head";
import React from "react";

const ChangeUserPassword = () => {
  return (
    <>
      <Head>
        <title>Change Password</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main>
        <ChangePassword style={styles.profiles} user="student"  />
      </main>
    </>
  );
};

export default ChangeUserPassword;
