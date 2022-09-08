import ProfileCoordinator from "../../components/ProfileCoordinator";
import { Navbar } from "../../components/NavBar";
import Head from "next/head";

const CoordinatorProfile = () => {
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main>
        <ProfileCoordinator />
      </main>
    </>
  );
};

export default CoordinatorProfile;
