import { successToastStyle, errorToastStyle } from "../../utils/styles.utils";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { setAdminAuth } from "../../store/slice/auth.slice";
import { useAppDispatch } from "../../hooks/store.hook";
import { LOGIN_ADMIN } from "../../graphql/query/admin";
import styles from "../../styles/Login.module.scss";
import toast, { Toaster } from "react-hot-toast";
import { useLazyQuery } from "@apollo/client";
import Loader from "../../components/Loader";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import Head from "next/head";

const AdminLogin: NextPage = () => {
  const [textInput, setTextInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [loginAdmin, { loading }] = useLazyQuery(LOGIN_ADMIN, {
    onCompleted: (data) => {
      console.log("DATA ==> ", data.loginAdmin);
      dispatch(setAdminAuth(data.loginAdmin));
      toast.success(data.loginAdmin?.message, successToastStyle);
      router.push("/admin/dashboard");
    },
    onError: ({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) => {
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          );
          toast.error(`${message}`, errorToastStyle);
        });
      if (networkError) {
        toast.error(`${networkError}`, errorToastStyle);
        console.log(`[Network error]: ${networkError}`);
      }
    },
  });

  const onChangeHandlerEmail = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      email: evt.target.value,
      password: prev.password,
      role: prev.role,
    }));
  };

  const onChangeHandlerPassword = (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTextInput((prev) => ({
      email: prev.email,
      password: evt.target.value,
      role: prev.role,
    }));
  };

  const onSubmitHandler = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    loginAdmin({
      variables: {
        loginInput: {
          email: textInput.email,
          password: textInput.password,
        },
      },
    });
  };

  return (
    <>
      <Head>
        <title>Admin | Login</title>
      </Head>
      <main>
        <section className={styles.adminLoginHero}>
          <div className={styles.adminLoginContainer}>
            <div className="p-6 w-full sm:p-8 lg:p-10">
              <h1 className={styles.h1}>Admin Login</h1>
              <Toaster position="top-center" reverseOrder={false} />
              {loading && <Loader show={true} />}
              <form className="mt-8" onSubmit={onSubmitHandler}>
                <div className="mb-6">
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
                      required
                      className={styles.checkBox}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="font-medium text-white"
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
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default AdminLogin;
