import { useAppSelector } from "../../hooks/store.hook";
import StudentForm from "../../components/StudentForm";
import styles from "../../styles/Signup.module.scss";
import { Navbar } from "../../components/NavBar";
import "react-phone-number-input/style.css";
import router from "next/router";
import { NextPage } from "next";
import Head from "next/head";

const Student: NextPage = (props: any) => {
  const isEligible = useAppSelector((state) => state.eligible.isEligible);

  console.log("ISELIGIBLE ==> ", isEligible);

  if (!isEligible) {
    router.push("/eligible");
    return;
  }
  
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
              <StudentForm
                isSupervisor={false}
                isAdmin={false}
                btnTitle={"signup"}
              />
            </div>
          </div>
        </section>
        <div className={styles.spacer}></div>
      </main>
    </>
  );
};

export default Student;
