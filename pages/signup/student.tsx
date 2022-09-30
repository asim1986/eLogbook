import StudentForm from "../../components/StudentForm";
import styles from "../../styles/Signup.module.scss";
import { Navbar } from "../../components/NavBar";
import "react-phone-number-input/style.css";
import Head from "next/head";

const Student = () => {
  return (
    <>
      <Head>
        <title>Signup | Student</title>
      </Head>
      <Navbar />
      <main>
        <section className={styles.hero}>
          <div className={styles.signupContainer}>
            <div className="p-3 sm:p-5 lg:p-6 w-full">
              <h1 className={styles.h1}>Create a Student Account</h1>
              <StudentForm admin={false} btnTitle={"signup"} />
            </div>
          </div>
        </section>
        <div className={styles.spacer}></div>
      </main>
    </>
  );
};

export default Student;
