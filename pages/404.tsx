import Head from "next/head";
import { Navbar } from "../components/NavBar";
import styles from "../styles/Error.module.scss";
import Link from "next/link";

const PageNotFound = () => {
  return (
    <>
      <Head>
        <title>Page Not Found</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main>
        <section className={styles.hero}>
          <div className={styles.errorContent}>
            <span>404</span>
            <p>Sorry, we can not find the page you are looking for!</p>
            <Link href="/">Go Home</Link>
          </div>
        </section>
      </main>
    </>
  );
};

export default PageNotFound;
