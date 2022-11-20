import ListLogbooks from "../../components/admin/ListLogbooks";
import styles from "../../styles/Dashboard.module.scss";
import { useAppSelector } from "../../hooks/store.hook";
import { Navbar } from "../../components/NavBar";
import { useRouter } from "next/router";
import Head from "next/head";
import Login from "../login";

const Activities = () => {
  const role = useAppSelector(
    (state) => state.auth?.userCoordData?.user || state.auth?.userSupData?.user
  );
  const isAuth = useAppSelector((state) => state.auth?.isAuth);
  const router = useRouter();

  if (
    !isAuth &&
    role !== "Supervisor" &&
    role !== "Coordinator" &&
    role !== "Admin"
  ) {
    router.replace("/login");
    return <Login />;
  }

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
