import ProfileStudent from "../../components/ProfileStudent";
import { useAppSelector } from "../../hooks/store.hook";
import { Navbar } from "../../components/NavBar";
import { useRouter } from "next/router";
import Head from "next/head";
import Login from "../login";

const StudentProfile = () => {
  const role = useAppSelector((state) => state.auth.userStudData.user);
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  console.log("ROLE ==>>>>> ", role);
  const router = useRouter();

  if ((!isAuth && role !== "Student" && role !== "Admin") || !role) {
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
        <ProfileStudent />
      </main>
    </>
  );
};

export default StudentProfile;
