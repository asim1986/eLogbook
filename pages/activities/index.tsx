import ListLogbooks from "../../components/admin/ListLogbooks";
import styles from "../../styles/Dashboard.module.scss";
import { Navbar } from "../../components/NavBar";
import Head from "next/head";

const Activities = () => {
  return (
    <>
      <Head>
        <title>Activities</title>
      </Head>
      <Navbar />
      <main>
        <ListLogbooks
          style={styles.dashTables}
          styleHeader={styles.mainHeaders}
          user="student"
        />
      </main>
    </>
  );
};

export default Activities;
