import ProfileStudent from "../../components/ProfileStudent";
import { Navbar } from "../../components/NavBar";
import Head from "next/head";


const StudentProfile = () => {
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main>
        <ProfileStudent />
      </main>
    </>
  );
};

export default StudentProfile;