import ListLogbooks from "../../../components/admin/ListLogbooks";
import styles from "../../../styles/Dashboard.module.scss";
import DashSideBar from "../../../components/DashSideBar";
import DashHeader from "../../../components/DashHeader";
import Head from "next/head";


const LogBook = () => {
  return (
    <>
      <Head>
        <title>Logbook</title>
      </Head>
      <main>
        <DashHeader title="Logbook" />
        <DashSideBar />
        <ListLogbooks
          style={styles.dashTableAdminLog}
          styleHeader={styles.mainHeaderAdminLog}
          user="admin"
        />
      </main>
    </>
  );
};

export default LogBook;
