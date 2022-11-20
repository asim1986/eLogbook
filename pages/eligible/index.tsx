import { errorToastStyle, successToastStyle } from "../../utils/styles.utils";
import { setEligible } from "../../store/slice/eligible.slice";
import React, { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../hooks/store.hook";
import { ELIGIBLE } from "../../graphql/query/eligible";
import styles from "../../styles/Login.module.scss";
import toast, { Toaster } from "react-hot-toast";
import { Navbar } from "../../components/NavBar";
import { useLazyQuery } from "@apollo/client";
import Loader from "../../components/Loader";
import { useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import Head from "next/head";

const Eligible = () => {  
  const [isLoading, setIsLoading] = useState(false);
  const [matricNoErr, setMatricNoErr] = useState(false);
  const [textInput, setTextInput] = useState<string | null>("");
  const [showEligibleErr, setShowEligibleErr] = useState(false);
  const inputRef = useRef<HTMLInputElement>();
  const validMatricNo = new RegExp(
    "^([A-Z0-9]+){8}((,s)([A-Z0-9]+){7})*([A-Z0-9]+)$"
  );
  const router = useRouter();
  const dispatch = useDispatch();
  const isEligible = useAppSelector(state => state.eligible.isEligible);


  const onChangeEligible = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const newTextInput = evt.target.value;
    const maxLen = newTextInput.length;
    setTextInput(newTextInput);
    // Hide Eligible Error immediately you start typing
    if (textInput.length > maxLen || textInput.length < maxLen) {
      setShowEligibleErr(false);
    }

    if (!validMatricNo.test(newTextInput)) {
      setMatricNoErr(true);
    } else {
      setMatricNoErr(false);
    }
  };

  const [getEligible, { loading }] = useLazyQuery(ELIGIBLE, {
    onCompleted: (data) => {
      setIsLoading(false);
      toast.success("Congratulations! Register now", successToastStyle);
      const eligData = data.eligible;
      // console.log("ELIG <==>", eligData);
      dispatch(setEligible(eligData));
      router.push('/signup/student');
    },
    onError: ({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) => {
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          );
          toast.error(`${message}`, errorToastStyle);
          setShowEligibleErr(true);
        });
      if (networkError) {
        toast.error(`${networkError}`, errorToastStyle);
        console.log(`[Network error]: ${networkError}`);
      }
      setIsLoading(false);
    },
  });

  const onCheck = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    getEligible({
      variables: {
        eligibleId: textInput,
      },
    });
    loading && setIsLoading(true);
  };

  useEffect(() => {
    console.log(isEligible);
  }, [])

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
          <Toaster position="top-center" reverseOrder={false} />
          {isLoading && <Loader show={true} />}
          <div className={styles.loginContainer}>
            <div className="p-6 w-full sm:p-8 lg:p-10">
              <h1 className={styles.h1}>Eligibility</h1>
              <form className="mt-8" onSubmit={onCheck}>
                <div className="mb-6 relative">
                  <label htmlFor="eligible" className={styles.label}>
                    Enter your Matriculation number below to check eligibility
                  </label>
                  <input
                    ref={inputRef}
                    required
                    type="text"
                    name="eligible"
                    id="eligible"
                    placeholder="Enter Matriculation Number"
                    className={matricNoErr ? styles.loginInputErr : styles.loginInput}
                    value={textInput}
                    onChange={onChangeEligible}
                  />
                  {matricNoErr && <p className="text-red-700 py-2 rounded-lg text-sm absolute">
                    Invalid Matric Number
                  </p>}
                </div>
                <div className={styles.btnWrapper}>
                  <button className={styles.loginBtn} type="submit">
                    <span className="flex justify-center items-center">
                      check
                    </span>
                  </button>
                  {showEligibleErr && (
                    <p className="bg-[#430C11] text-[#f8d7da] py-2 rounded-lg">
                      Sorry you are not eligible! Please contact your
                      departmental Coordinator!
                    </p>
                  )}
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
