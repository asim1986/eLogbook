import ListSupervisor from "../../components/admin/ListSupervisors";
import DashHeader from "../../components/DashHeader";
import DashSideBar from "../../components/DashSideBar";
import Head from "next/head";

const Supervisors = () => {
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
