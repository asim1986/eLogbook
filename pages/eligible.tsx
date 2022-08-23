import Head from "next/head";
import styles from "../styles/Login.module.scss";
import Link from "next/link";
import React, { useState } from "react";
import { Navbar } from "../components/NavBar";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

const Eligible = () => {
  const [textInput, setTextInput] = useState("");

  const onChangeEligible = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(evt.target.value);
  };

  return (
    <>
      <Head>
        <title>Eligible</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main>
        <section className={styles.hero}>
          <div className={styles.loginContainer}>
            <div className="p-6 w-full sm:p-8 lg:p-10">
              <h1 className={styles.h1}>Eligibility</h1>
              <form className="mt-8">
                <div className="mb-6">
                  <label htmlFor="eligible" className={styles.label}>
                    Enter your Matriculation number below to check eligibility
                  </label>
                  <input
                    required
                    type="text"
                    name="eligible"
                    id="eligible"
                    placeholder="Enter Matriculation Number"
                    className={styles.loginInput}
                    value={textInput}
                    onChange={onChangeEligible}
                  />
                </div>
                <div className={styles.btnWrapper}>
                  <button className={styles.loginBtn} type="submit">
                    <span className="flex justify-center items-center">
                      check
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Eligible;
