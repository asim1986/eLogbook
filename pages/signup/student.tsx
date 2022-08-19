import Head from "next/head";
import styles from "../../styles/Signup.module.scss";
import Link from "next/link";
import React, { useState } from "react";
import { Navbar } from "../../components/NavBar";

const Student = () => {
  return (
    <>
      <Head>
        <title>Signup | Student</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main>
        <section className={styles.hero}>
            
        </section>
      </main>
    </>
  );
};

export default Student;
