import ListSupervisor from "../../components/admin/ListSupervisors";
import { useAppSelector } from "../../hooks/store.hook";
import DashSideBar from "../../components/DashSideBar";
import DashHeader from "../../components/DashHeader";
import { useRouter } from "next/router";
import { NextPage } from "next";
import Head from "next/head";
import AdminLogin from ".";

const Supervisors: NextPage = () => {
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
        <title>Supervisors</title>
      </Head>
      <main>
        <DashHeader title="Supervisors" />
        <DashSideBar />
        <ListSupervisor />
      </main>
    </>
  );
};

export default Supervisors;
