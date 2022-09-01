import Head from "next/head";
import ListOrganisations from "../../components/admin/ListOrganisations";
import DashHeader from "../../components/DashHeader";
import DashSideBar from "../../components/DashSideBar";

const Organisations = () => {
  return (
    <>
      <Head>
        <title>Organisations</title>
      </Head>
      <main>
        <DashHeader title="Organisations" />
        <DashSideBar />
        <ListOrganisations />
      </main>
    </>
  );
};

export default Organisations;
