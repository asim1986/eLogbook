import Head from "next/head";
import ListStudents from "../../components/admin/ListStudents";
import DashHeader from "../../components/DashHeader";
import DashSideBar from "../../components/DashSideBar";

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
