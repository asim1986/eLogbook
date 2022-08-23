import Head from "next/head";
import styles from "../../styles/Signup.module.scss";
import Link from "next/link";
import React, { useState } from "react";
import { Navbar } from "../../components/NavBar";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

const Organisation = () => {
  const [textInput, setTextInput] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [selectedFile, setSelectedFile] = useState({
    file: null,
    isUploaded: false,
  });

  const onChangeHandlerEmail = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      email: evt.target.value,
      password: prev.password,
    }));
  };

  const onChangeHandlerPassword = (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTextInput((prev) => ({
      email: prev.email,
      password: evt.target.value,
    }));
  };

  const onFileUpload = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile({ file: evt.target.files[0], isUploaded: true });
  };
  return (
    <>
      <Head>
        <title>Signup | Organisation</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main>
        <section className={styles.hero}>
          <div className={styles.signupContainer}>
            <div className="p-3 w-full sm:p-8 lg:p-10">
              <h1 className={styles.h1}>Create an Organisational Account</h1>
              <form className="mt-4">
                <div className="flex flex-col mb-4 space-y-6 md:flex-row md:space-y-0 md:space-x-6">
                  <div className="w-full">
                    <input
                      required
                      placeholder="Establishment/Industry Name"
                      name="name"
                      type="text"
                      className={styles.signupInput}
                      value=""
                    />
                  </div>
                  <div className="w-full">
                    <input
                      required
                      placeholder="Business Type Undertaken"
                      name="lastName"
                      type="business type"
                      className={styles.signupInput}
                      value=""
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <input
                    required
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Organisation Address"
                    className={styles.signupInput}
                    value={textInput.email}
                    onChange={onChangeHandlerEmail}
                  />
                </div>
                <div className="flex flex-col mb-4 space-y-6 md:flex-row md:space-y-0 md:space-x-6">
                  <div className="w-full">
                    <input
                      required
                      placeholder="No of People Employed"
                      name="name"
                      type="number"
                      className={styles.signupInput}
                      value=""
                    />
                  </div>
                  <div className="w-full">
                    <input
                      required
                      placeholder="Phone Number"
                      name="phone"
                      type="tel"
                      className={styles.signupInput}
                      value=""
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <input
                    required
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    className={styles.signupInput}
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
                    className={styles.signupInput}
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
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        required
                        id="terms"
                        aria-describedby="terms"
                        name="terms"
                        type="checkbox"
                        className={styles.checkBox}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="terms"
                        className="font-medium text-gray-900 dark:text-white"
                      >
                        I accept the
                        <a
                          className={styles.terms}
                          href="/terms-and-conditions/"
                        >
                          Terms and Conditions
                        </a>
                      </label>
                    </div>
                  </div>
                  <div
                    className={[
                      styles.uploadAvatarBtn,
                      selectedFile.isUploaded ? styles.fileUpload : "",
                    ].join(" ")}
                  >
                    <label>
                      <input
                        type="file"
                        name="avatar"
                        id="avatar"
                        accept="image/png, image/jpg, image/jpeg"
                        onChange={onFileUpload}
                      />
                      {selectedFile.isUploaded
                        ? "File Uploaded"
                        : "Upload Logo"}
                    </label>
                  </div>
                </div>
                <div className={styles.btnWrapper}>
                  <button className={styles.signupBtn} type="submit">
                    <span className="flex justify-center items-center">
                      signup
                    </span>
                  </button>
                </div>
                <div className={styles.notReg}>
                  Already have an account?
                  <Link href="/login">
                    <a className={styles.actionBtn}>
                      Login here.
                    </a>
                  </Link>
                </div>
              </form>
            </div>
          </div>
          <div className={styles.spacer}></div>
        </section>
      </main>
    </>
  );
};

export default Organisation;
