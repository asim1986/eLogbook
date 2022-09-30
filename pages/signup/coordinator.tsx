import SuperviorForm from "../../components/SupervisorForm";
import styles from "../../styles/Signup.module.scss";
import { Navbar } from "../../components/NavBar";
import "react-phone-number-input/style.css";
import Head from "next/head";

const Coordinator = () => {
  return (
    <>
      <Head>
        <title>Signup | Cordinator</title>
      </Head>
      <Navbar />
      <main>
        <section className={styles.hero}>
          <div className={styles.signupContainer}>
            <div className="p-3 sm:p-5 lg:p-6 w-full">
              <h1 className={styles.h1}>Create a Coordinator Account</h1>
              <SuperviorForm admin={false} btnTitle={"signup"} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Coordinator;
