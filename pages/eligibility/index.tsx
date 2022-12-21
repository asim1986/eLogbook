import ListEligible from "../../components/admin/ListEligible";
import { useAppSelector } from "../../hooks/store.hook";
import { Navbar } from "../../components/NavBar";
import { useRouter } from "next/router";
import { NextPage } from "next";
import Head from "next/head";
import Login from "../login";

const Eligibility: NextPage = () => {
  const role = useAppSelector(
    (state) => state.auth?.userCoordData?.user || state.auth?.userSupData?.user
  );
  const isAuth = useAppSelector((state) => state.auth?.isAuth);
  const router = useRouter();

  if ((!isAuth && role !== "Coordinator" && role !== "Admin") || !role) {
    router.replace("/login");
    return <Login />;
  }
  
  return (
    <>
      <Head>
        <title>Eligibility</title>
      </Head>
      <Navbar />
      <main>
        <ListEligible isAdmin={false}  />
      </main>
    </>
  );
};

export default Eligibility;
