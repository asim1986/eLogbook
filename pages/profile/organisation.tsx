import ProfileOrganisation from "../../components/ProfileOrganisation";
import { Navbar } from "../../components/NavBar";
import store from "../../store/store";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { AuthOrganGate } from "../../components/AuthGate";
import Login from "../login";
import { useAuthToken } from "../../hooks/useAuthToken";
const [ authToken ] = useAuthToken();

// export const getServerSideProps = async () => {
  
//   // const authToken = store.getState().auth.token || 'sdfsdfsdf';
//   const role = store.getState().auth.userOrgData?.user;

//   if (!authToken && (role !== "Organisation" && role !== "Admin")) {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// };

const OrganisationProfile = () => {
  const role = store.getState().auth.userData?.user;
  const isAuth = store.getState().auth.isAuth;
  console.log("ROLE ==> ", isAuth);
  const router = useRouter();

  if (!isAuth && role !== "Organisation" && role !== "Admin") {
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

// export const getServerSideProps = async () => {
//   const isAuth = store.getState().auth.isAuth;
//   const role = store.getState().auth.userData.user;
//   console.log("ROLE ==> ", isAuth);

//   if (!isAuth) {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: { isAuth },
//   };
// };

export default OrganisationProfile;
