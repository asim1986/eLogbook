import ProfileOrganisation from "../../components/ProfileOrganisation";
import { Navbar } from "../../components/NavBar";
import Head from "next/head";

const OrganisationProfile = () => {
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main>
        <ProfileOrganisation />
      </main>
    </>
  );
};

export default OrganisationProfile;
