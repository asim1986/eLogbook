import Head from "next/head";
import styles from "../../styles/Signup.module.scss";
import Link from "next/link";
import React, { useState } from "react";
import { Navbar } from "../../components/NavBar";
import {
  FaBuilding,
  FaChalkboardTeacher,
  FaUserGraduate,
} from "react-icons/fa";
import { MdSupervisedUserCircle } from "react-icons/md";

const Signup = () => {
  return (
    <>
      <Head>
        <title>E-LogBook | Signup</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main>
        <section className={styles.hero}>
          <div className={styles.signup}>
            <div className="p-6 w-full sm:p-8 lg:p-10">
              <h1 className={styles.h1}>Create an account as...</h1>
              <div className={styles.types}>
                <Link href="/signup/organisation">
                  <div>
                    <FaBuilding size="8rem" />
                    <h1>Organisation</h1>
                  </div>
                </Link>
                <Link href="/signup/cordinator">
                  <div>
                    <MdSupervisedUserCircle size="8rem" />
                    <h1>Cordinator</h1>
                  </div>
                </Link>
                <Link href="/signup/supervisor">
                  <div>
                    <FaChalkboardTeacher size="8rem" />
                    <h1>Supervisor</h1>
                  </div>
                </Link>
                <Link href="/eligible">
                  <div>
                    <FaUserGraduate size="8rem" />
                    <h1>Student</h1>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Signup;
