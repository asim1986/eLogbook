import Head from "next/head";
import ListCoordinators from "../../components/admin/ListCoordinators";
import DashHeader from "../../components/DashHeader";
import DashSideBar from "../../components/DashSideBar";

const Cordinator = () => {
  return (
    <>
      <Head>
        <title>Cordinators</title>
      </Head>
      <main>
        <DashHeader title="Coordinators" />
        <DashSideBar />
        <ListCoordinators />
      </main>
    </>
  );
};

export default Cordinator;
