import ProfileSupervisor from "../../components/ProfileSupervisor";
import { useAppSelector } from "../../hooks/store.hook";
import { Navbar } from "../../components/NavBar";
import { useRouter } from "next/router";
import Head from "next/head";
import Login from "../login";

const SupervisorProfile = () => {
  const role = useAppSelector(
    (state) => state.auth?.userCoordData?.user || state.auth?.userSupData?.user
  );
  const isAuth = useAppSelector((state) => state.auth?.isAuth);
  const router = useRouter();

  if ((!isAuth && role !== "Supervisor" && role !== "Admin") || !role) {
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
        <ProfileSupervisor />
      </main>
    </>
  );
};

export default SupervisorProfile;
