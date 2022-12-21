import ProfileOrganisation from "../../components/ProfileOrganisation";
import { Navbar } from "../../components/NavBar";
import { useRouter } from "next/router";
import store from "../../store/store";
import Head from "next/head";
import Login from "../login";

const OrganisationProfile = () => {
  const role = store.getState().auth.userOrgData?.user;
  const isAuth = store.getState().auth.isAuth;
  console.log("ROLE ==>>>>> ", role);
  const router = useRouter();

  if ((!isAuth && role !== "Organisation" && role !== "Admin") || !role) {
    router.replace("/login");
    return <Login />;
  }

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
