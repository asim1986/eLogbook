import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import styles from "../../styles/Signup.module.scss";
import { Navbar } from "../../components/NavBar";
import "react-phone-number-input/style.css";
import React, { useState } from "react";
import Link from "next/link";
import Head from "next/head";

const Organisation = () => {
  const [textInput, setTextInput] = useState({
    name: "",
    type: "",
    address: "",
    people: "",
    phone: "",
    email: "",
    password: "",
  });

  const [selectedFile, setSelectedFile] = useState({
    file: null,
    isUploaded: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const onChangeName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      name: evt.target.value,
      type: prev.type,
      address: prev.address,
      people: prev.people,
      phone: prev.phone,
      email: prev.email,
      password: prev.password,
    }));
  };

  const onChangeType = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      name: prev.name,
      type: evt.target.value,
      address: prev.address,
      people: prev.people,
      phone: prev.phone,
      email: prev.email,
      password: prev.password,
    }));
  };

  const onChangeAddress = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      name: prev.name,
      type: prev.type,
      address: evt.target.value,
      people: prev.people,
      phone: prev.phone,
      email: prev.email,
      password: prev.password,
    }));
  };

  const onChangePeople = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      name: prev.name,
      type: prev.type,
      address: prev.address,
      people: evt.target.value,
      phone: prev.phone,
      email: prev.email,
      password: prev.password,
    }));
  };

  const onChangePhone = (value: string | undefined) => {
    setTextInput((prev) => ({
      name: prev.name,
      type: prev.type,
      address: prev.address,
      people: prev.people,
      phone: value,
      email: prev.email,
      password: prev.password,
    }));
  };

  const onChangeEmail = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      name: prev.name,
      type: prev.type,
      address: prev.address,
      people: prev.people,
      phone: prev.phone,
      email: prev.email,
      password: prev.password,
    }));
  };

  const onChangePassword = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      name: prev.name,
      type: prev.type,
      address: prev.address,
      people: prev.people,
      phone: prev.phone,
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
            <div className="p-3 sm:p-5 lg:p-6 w-full">
              <h1 className={styles.h1}>Create an Organisational Account</h1>
              <form className="mt-4">
                <div className="flex flex-col mb-4 space-y-4 md:flex-row md:space-y-0 md:space-x-2">
                  <div className="w-full">
                    <input
                      required
                      placeholder="Establishment/Industry Name"
                      name="name"
                      type="text"
                      className={styles.signupInput}
                      value={textInput.name}
                      onChange={onChangeName}
                    />
                  </div>
                  <div className="w-full">
                    <input
                      required
                      placeholder="Business Type Undertaken"
                      name="type"
                      type="text"
                      className={styles.signupInput}
                      value={textInput.type}
                      onChange={onChangeType}
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
                    value={textInput.address}
                    onChange={onChangeAddress}
                  />
                </div>
                <div className="flex flex-col mb-4 space-y-4 md:flex-row md:space-y-0 md:space-x-2">
                  <div className="w-full">
                    <input
                      required
                      placeholder="No of People Employed"
                      name="people"
                      type="number"
                      className={styles.signupInput}
                      value={textInput.people}
                      onChange={onChangePeople}
                    />
                  </div>
                  <div className="w-full">
                    <PhoneInput
                      international
                      countryCallingCodeEditable={false}
                      placeholder="Phone Number"
                      className={styles.phoneInput}
                      defaultCountry="NG"
                      value={textInput.phone}
                      onChange={onChangePhone}
                      error={
                        textInput.phone
                          ? isValidPhoneNumber(textInput.phone)
                            ? undefined
                            : "Invalid phone number"
                          : "Phone number required"
                      }
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
                    onChange={onChangeEmail}
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
                    onChange={onChangePassword}
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
                    <a className={styles.actionBtn}>Login here.</a>
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
