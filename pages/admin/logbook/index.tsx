import ListLogbooks from "../../../components/admin/ListLogbooks";
import { useAppSelector } from "../../../hooks/store.hook";
import styles from "../../../styles/Dashboard.module.scss";
import DashSideBar from "../../../components/DashSideBar";
import DashHeader from "../../../components/DashHeader";
import { useRouter } from "next/router";
import Head from "next/head";
import AdminLogin from "..";

const LogBook = () => {
  const role = useAppSelector((state) => state.auth?.userAdminData?.user);
  const isAuth = useAppSelector((state) => state.auth?.isAuth);
  const router = useRouter();

  if ((!isAuth && role !== "Admin") || !role) {
    router.replace("/admin");
    return <AdminLogin />;
  }
  
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
