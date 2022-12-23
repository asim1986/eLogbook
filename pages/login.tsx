import { setCoordAuth, setOrgAuth, setStudAuth, setSupAuth } from "../store/slice/auth.slice";
import { successToastStyle, errorToastStyle } from "../utils/styles.utils";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { setEligReset } from "../store/slice/eligible.slice";
import { DocumentNode, useLazyQuery } from "@apollo/client";
import { LOGIN_ORGAN } from "../graphql/query/organisation";
import { LOGIN_COORD } from "../graphql/query/coordinator";
import { LOGIN_STUDENT } from "../graphql/query/student";
import { LOGIN_SUP } from "../graphql/query/supervisor";
import GlobalContext from "../context/GlobalContext";
import { useAppDispatch } from "../hooks/store.hook";
import React, { useState, useContext } from "react";
import styles_ from "../styles/Signup.module.scss";
import styles from "../styles/Login.module.scss";
import toast, { Toaster } from "react-hot-toast";
import { Navbar } from "../components/NavBar";
import { customStyles } from "../utils/util";
import { roles } from "../utils/role.util";
import Loader from "../components/Loader";
import { useRouter } from "next/router";
import Select from "react-select";
import Link from "next/link";
import Head from "next/head";


const Login = () => {
  const [textInput, setTextInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [showPassword, setShowPassword] = useState(false);  
  const [docNode, setDocNode] = useState<DocumentNode>(LOGIN_COORD);
  const { logBookData } = useContext(GlobalContext);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [loginUser, { loading }] = useLazyQuery(docNode, {
    onCompleted: (data) => {
      //console.log("LOGIN DATA ==> ", data);
      if (data?.loginOrganisation) {
        router.push("/profile/organisation");
        console.log("DATA ==> ", data.loginOrganisation);
        dispatch(setOrgAuth(data.loginOrganisation));
      } else if (data?.loginStudent) {
        router.push("/logbook");
        console.log("DATA ==> ", data.loginStudent);
        dispatch(setStudAuth(data.loginStudent));
        dispatch(setEligReset());
        // localStorage.setItem("logBookData", JSON.stringify(logBookData));
      } else if (data?.loginSupervisor) {
        router.push("/activities");
        console.log("DATA ==> ", data.loginSupervisor);
        dispatch(setSupAuth(data.loginSupervisor));
      } else if (data?.loginCoordinator) {
        router.push("/activities");
        console.log("DATA ==> ", data.loginCoordinator);
        dispatch(setCoordAuth(data.loginCoordinator));
      }
      // dispatch(setUser(data));
      toast.success("Login Successfully", successToastStyle);
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

  type OptionType = { label: string; value: string }[];

  const optionRole = roles;

  const selectRole = (option: OptionType | null | any) => {
    if (option) {
      setTextInput((prev) => ({
        email: prev.email,
        password: prev.password,
        role: option.value,
      }));
      customRole(option.value);
    }
  };

  const customRole = (role: string) => {
    console.log("CUSTOM ROLE => ", role);
    if (role !== '') {
      switch (role) {
        case "Organisation":
          setDocNode(LOGIN_ORGAN);
          break;
        case "Student":
          setDocNode(LOGIN_STUDENT);
          break;
        case "Supervisor":
          setDocNode(LOGIN_SUP);
          break;
        case "Coordinator":
          setDocNode(LOGIN_COORD);
          break;
        default:
          toast.error("Please select your user type", errorToastStyle);
      }
    }
  }

  const onSubmitHandler = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (textInput.role === '')  {
      toast.error("Please select your user type", errorToastStyle);
    }

    loginUser({
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
                <div className="mb-6">
                  <Select
                    isClearable
                    options={optionRole}
                    className={styles_.select}
                    placeholder="Login As"
                    onChange={selectRole}
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
