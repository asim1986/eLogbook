import styles from "../styles/Login.module.scss";
import { Navbar } from "../components/NavBar";
import Head from "next/head";
import React from "react";


const About = () => {
  return (
    <>
      <Head>
        <title>E-LogBook | Login</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main>
        <section className={styles.hero}>
          <div className={styles.loginContainer}>
            <div className="p-6 w-full sm:p-8 lg:p-10">
              <h1 className={styles.h1}>About E-LogBook</h1>
              <p>
                An E-Logbook also known as Industrial Training or Internship
                E-Logbook is an electronic record-keeping application that is
                used by various Universities, Polytechnics, Colleges of
                Education, Colleges of Technology, and Colleges of Agriculture
                to keep track of students' daily or weekly activities, projects,
                or jobs carried out in their place of internship, work, or
                SIWES. This application can also be used to communicate between
                the student, the coordinator, and their respective schools'
                supervisors.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default About;
