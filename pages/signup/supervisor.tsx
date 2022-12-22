import SupervisorForm from "../../components/SupervisorForm";
import styles from "../../styles/Signup.module.scss";
import { Navbar } from "../../components/NavBar";
import "react-phone-number-input/style.css";
import Head from "next/head";

const Supervisor = () => {
  return (
    <>
      <Head>
        <title>Signup | Supervisor</title>
      </Head>
      <Navbar />
      <main>
        <section className={styles.hero}>
          <div className={styles.signupContainer}>
            <div className="p-3 sm:p-5 lg:p-6 w-full">
              <h1 className={styles.h1}>Create a Supervisor Account</h1>
              <SupervisorForm isSupervisor={true} isAdmin={false} btnTitle={"signup"} />
            </div>
          </div>
          <div className={styles.spacer}></div>
        </section>
      </main>
    </>
  );
};

export default Supervisor;
