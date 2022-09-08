import SendEligible from "../../components/SendEligible";
import { Navbar } from "../../components/NavBar";
import "react-phone-number-input/style.css";
import Head from "next/head";


const SendEligibleStudent = () => {
  return (
    <>
      <Head>
        <title>Send Eligible</title>
      </Head>
      <Navbar />

      <main>
        <SendEligible />
      </main>
    </>
  );
};

export default SendEligibleStudent;
