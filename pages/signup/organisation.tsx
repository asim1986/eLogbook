import OrganisationForm from "../../components/OrganisationForm";
import styles from "../../styles/Signup.module.scss";
import { Navbar } from "../../components/NavBar";
import "react-phone-number-input/style.css";
import Head from "next/head";

const Organisation = () => {

  return (
    <>
      <Head>
        <title>Signup | Organisation</title>
      </Head>
      <Navbar />
      <main>
        <section className={styles.hero}>
          <div className={styles.signupContainer}>
            <div className="p-3 sm:p-5 lg:p-6 w-full">
              <h1 className={styles.h1}>Create an Organisational Account</h1>
              <OrganisationForm isAdmin={false} btnTitle={"signup"} />
            </div>
          </div>
          <div className={styles.spacer}></div>
        </section>
      </main>
    </>
  );
};

export default Organisation;
