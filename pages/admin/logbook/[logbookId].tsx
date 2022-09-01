import Activities from "../../../components/admin/Activities";
import DashSideBar from "../../../components/DashSideBar";
import DashHeader from "../../../components/DashHeader";
import Head from "next/head";


const LogBook = () => {
  return (
    <>
      <Head>
        <title>LogbookId</title>
      </Head>
      <main>
        <DashHeader title="Purity's Activities" />
        <DashSideBar />
        <Activities />
      </main>
    </>
  );
};

export default LogBook;