import Activities from "../../../components/admin/Activities";
import styles from "../../../styles/Dashboard.module.scss";
import DashSideBar from "../../../components/DashSideBar";
import DashHeader from "../../../components/DashHeader";
import Head from "next/head";

const LogBook = () => {
  return (
    <>
      <Head>
        <title>LogbookId</title>
      </Head>
      <main>
        <DashHeader title="Purity's Activities" />
        <DashSideBar />
        <Activities
          style={styles.dashTableLog}
          styleHeader={styles.mainHeaderLog}
          user="admin"
        />
      </main>
    </>
  );
};

export default LogBook;
