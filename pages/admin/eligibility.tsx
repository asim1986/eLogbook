import ListEligible from "../../components/admin/ListEligible";
import DashSideBar from "../../components/DashSideBar";
import DashHeader from "../../components/DashHeader";
import Head from "next/head";


const Eligibility = () => {
  return (
    <>
      <Head>
        <title>Eligibility</title>
      </Head>
      <main>
        <DashHeader title="Eligibility" />
        <DashSideBar />
        <ListEligible />
      </main>
    </>
  );
};

export default Eligibility;
