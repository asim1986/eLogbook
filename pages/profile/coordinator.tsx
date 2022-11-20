import ProfileCoordinator from "../../components/ProfileCoordinator";
import { useAppSelector } from "../../hooks/store.hook";
import { Navbar } from "../../components/NavBar";
import { useRouter } from "next/router";
import Login from "../login";
import Head from "next/head";

const CoordinatorProfile = () => {
  const role = useAppSelector(
    (state) => state.auth?.userCoordData?.user || state.auth?.userSupData?.user
  );
  const isAuth = useAppSelector((state) => state.auth?.isAuth);
  const router = useRouter();

  if (!isAuth && role !== "Coordinator" && role !== "Admin") {
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
        <ProfileCoordinator />
      </main>
    </>
  );
};

export default CoordinatorProfile;
