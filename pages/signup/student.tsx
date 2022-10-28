import StudentForm from "../../components/StudentForm";
import styles from "../../styles/Signup.module.scss";
import { Navbar } from "../../components/NavBar";
import "react-phone-number-input/style.css";
import { useSelector } from "react-redux";
import store, { wrapper } from "../../store/store";
import { NextPage } from "next";
import Head from "next/head";
import { useAppSelector } from "../../hooks/store.hook";

export const getServerSideProps = (context: any) => {
  const isEligible = store.getState().eligible.isEligible;
  const userData = store.getState().eligible.userData;
  // const isEligible = useAppSelector(state => state.eligible.isEligible);

  console.log("ISELIGIBLE <==>", isEligible);

  // if (!isEligible) {
  //   return {
  //     redirect: {
  //       destination: "/eligible",
  //       permanent: false,
  //     },
  //   };
  // }

  return {
    props: { userData },
  };
};


const Student: NextPage = (props: any) => {
  console.log("ISELIGIBLE <==>", props.userData);

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
              <StudentForm admin={false} btnTitle={"signup"}  />
            </div>
          </div>
        </section>
        <div className={styles.spacer}></div>
      </main>
    </>
  );
};

export default Student;
