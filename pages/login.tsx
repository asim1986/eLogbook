import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import styles_ from "../styles/Signup.module.scss";
import styles from "../styles/Login.module.scss";
import { Navbar } from "../components/NavBar";
import { customStyles } from "../utils/util";
import { roles } from "../utils/role.util";
import React, { useState } from "react";
import Select from "react-select";
import store from "../store/store";
import { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import { REGISTER_ORG } from "../graphql/mutations/student";
import { setOrgAuth } from "../store/slice/auth.slice";
import { successToastStyle, errorToastStyle } from "../utils/styles.utils";
import { LOGIN_ORGAN } from "../graphql/query/organisation";
import { useAppDispatch } from "../hooks/store.hook";
import Loader from "../components/Loader";

const Login = () => {
  const [textInput, setTextInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  // const isAuth = store.getState().auth.isAuth;
  // const role = store.getState().auth.userData.user;
  // console.log("ISAUTH <===> ", isAuth);

  const [loginOrgan, { loading, called }] = useLazyQuery(LOGIN_ORGAN, {
    onCompleted: (data) => {
      toast.success(data.loginOrganisation.message, successToastStyle);
      router.push("/profile/organisation");
      console.log("DATA ==> ", data);
      dispatch(setOrgAuth(data.loginOrganisation));
      setIsLoading(false);
    },
    onError: ({ graphQLErrors, networkError }) => {
      setIsLoading(false);
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

  type OptionType = { label: string; value: string }[];

  const optionRole = roles;

  const selectSector = (option: OptionType | null | any) => {
    if (option) {
      setTextInput((prev) => ({
        email: prev.email,
        password: prev.password,
        role: option.value,
      }));
    }
  };

  const onSubmitHandler = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (loading) {
      setIsLoading(true);
    }
    switch (textInput.role) {
      case "Organisation":
        loginOrgan({
          variables: {
            loginInput: {
              email: textInput.email,
              password: textInput.password,
            },
          },
        });
        break;
      default:
        toast.error('Please your user type', errorToastStyle);
    }
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
              <Toaster position="top-center" reverseOrder={false} />
              {isLoading && <Loader show={true} />}
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
                <div className="mb-6">
                  <Select
                    isClearable
                    options={optionRole}
                    className={styles_.select}
                    placeholder="Login As"
                    onChange={selectSector}
                    styles={customStyles}
                  />
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
