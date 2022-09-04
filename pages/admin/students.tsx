import ListStudents from "../../components/admin/ListStudents";
import DashSideBar from "../../components/DashSideBar";
import DashHeader from "../../components/DashHeader";
import Head from "next/head";

const Students = () => {
  return (
    <>
      <Head>
        <title>Students</title>
      </Head>
      <main>
        <DashHeader title="Students" />
        <DashSideBar />
        <ListStudents />
      </main>
    </>
  );
};

export default Students;
