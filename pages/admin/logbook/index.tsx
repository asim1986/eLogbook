import ListLogbooks from "../../../components/admin/ListLogbooks";
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
        <ListLogbooks />
      </main>
    </>
  );
};

export default LogBook;
