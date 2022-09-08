import ProfileSupervisor from "../../components/ProfileSupervisor";
import { Navbar } from "../../components/NavBar";
import Head from "next/head";

const SupervisorProfile = () => {
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main>
        <ProfileSupervisor />
      </main>
    </>
  );
};

export default SupervisorProfile;
