import Activities from "../../components/admin/Activities";
import styles from "../../styles/Dashboard.module.scss";
import { Navbar } from "../../components/NavBar";
import Head from "next/head";

const LogBook = () => {
  return (
    <>
      <Head>
        <title>ActivityId</title>
      </Head>
      <Navbar />
      <main>
        <Activities
          style={styles.dashTableLogs}
          styleHeader={styles.mainHeaderLogs}
          user="student"
        />
      </main>
    </>
  );
};

export default LogBook;
