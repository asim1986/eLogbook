import ListCoordinators from "../../components/admin/ListCoordinators";
import { useAppSelector } from "../../hooks/store.hook";
import DashSideBar from "../../components/DashSideBar";
import DashHeader from "../../components/DashHeader";
import { useRouter } from "next/router";
import { NextPage } from "next";
import Head from "next/head";
import AdminLogin from ".";

const Coordinator: NextPage = () => {
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
        <title>Coordinators</title>
      </Head>
      <main>
        <DashHeader title="Coordinators" />
        <DashSideBar />
        <ListCoordinators />
      </main>
    </>
  );
};

export default Coordinator;
