import Activities from "../../components/admin/Activities";
import styles from "../../styles/Dashboard.module.scss";
import { useAppSelector } from "../../hooks/store.hook";
import { Navbar } from "../../components/NavBar";
import { useRouter } from "next/router";
import Head from "next/head";
import Login from "../login";

const StudentLogBook = () => {
  const role = useAppSelector((state) => state.auth?.userStudData?.user);
  const isAuth = useAppSelector((state) => state.auth?.isAuth);
  const router = useRouter();

  if ((!isAuth && role !== "Student" && role !== "Admin") || !role) {
    router.replace("/login");
    return <Login />;
  }

  return (
    <>
      <Head>
        <title>Student Activities</title>
      </Head>
      <Navbar />
      <main>
        <Activities
          user="student"
          isStudent={true}
          style={styles.dashTableLogs}
          styleHeader={styles.mainHeaderLogStud}
        />
      </main>
    </>
  );
};

export default StudentLogBook;
