import Head from "next/head";
import styles from "../styles/Login.module.scss";
import Link from "next/link";
import React, { useState } from "react";
import { Navbar } from "../components/NavBar";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";


const Login = () => {
  const [textInput, setTextInput] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);


  const onChangeHandlerEmail = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      email: evt.target.value,
      password: prev.password,
    }));
  };

  const onChangeHandlerPassword = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      email: prev.email,
      password: evt.target.value,
    }));
  };

  return (
    <>
      <Head>
        <title>E-LogBook | Login</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main>
        <section className={styles.hero}>
          <div className={styles.loginContainer}>
            <div className="p-6 w-full sm:p-8 lg:p-10">
              <h1 className={styles.h1}>Login to your account</h1>
              <form className="mt-8">
                <div className="mb-6">
                  <label htmlFor="email" className={styles.label}>Your email</label>
                  <input
                    required
                    type="email"
                    name="email"
                    id="email"
                    placeholder="name@email.com"
                    className={styles.loginInput}
                    value={textInput.email}
                    onChange={onChangeHandlerEmail}
                  />
                </div>
                <div className={styles.passwordInput}>
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Password"
                    className={styles.loginInput}
                    value={textInput.password}
                    onChange={onChangeHandlerPassword}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <AiFillEyeInvisible size="1.5rem" />
                    ) : (
                      <AiFillEye size="1.5rem" />
                    )}
                  </button>
                </div>
                <div className="flex items-start mb-6">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      name="remember"
                      type="checkbox"
                      className={styles.checkBox}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="font-medium text-gray-900 dark:text-white"
                    >
                      Remember me
                    </label>
                  </div>
                  <a className={styles.forgetPassword} href="/forgot-password/">
                    Forgot Password?
                  </a>
                </div>
                <div className={styles.btnWrapper}>
                  <button className={styles.loginBtn} type="submit">
                    <span className="flex justify-center items-center">
                      Login
                    </span>
                  </button>
                </div>

                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Not registered?
                  <Link href="/signup">
                    <a className="ml-1 text-blue-700 hover:underline dark:text-blue-500">
                      Create an account.
                    </a>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Login;
