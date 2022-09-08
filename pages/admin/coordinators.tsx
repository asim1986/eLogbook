import Head from "next/head";
import ListCoordinators from "../../components/admin/ListCoordinators";
import DashHeader from "../../components/DashHeader";
import DashSideBar from "../../components/DashSideBar";

const Coordinator = () => {
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
