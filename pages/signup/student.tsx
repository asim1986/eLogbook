import Head from "next/head";
import styles from "../../styles/Signup.module.scss";
import Link from "next/link";
import React, { useState } from "react";
import { Navbar } from "../../components/NavBar";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { allInstitutions } from "../../utils/institutions";
import Select, { ActionMeta, Options } from "react-select";
import { defaultStyles } from "react-select/dist/declarations/src/styles";

const Student = () => {
  const [textInput, setTextInput] = useState({
    email: "",
    password: "",
    institute: "",
    level: "",
    gender: "",
    address: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [selectedFile, setSelectedFile] = useState({
    file: null,
    isUploaded: false,
  });

  const onChangeHandlerEmail = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      email: evt.target.value,
      password: prev.password,
      institute: prev.institute,
      level: prev.level,
      gender: prev.gender,
      address: prev.address,
    }));
  };

  const onChangeHandlerPassword = (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTextInput((prev) => ({
      email: prev.email,
      password: evt.target.value,
      institute: prev.institute,
      level: prev.level,
      gender: prev.gender,
      address: prev.address,
    }));
  };

  const onChangeHandlerAddress = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      email: prev.email,
      password: prev.password,
      institute: prev.institute,
      level: prev.level,
      gender: prev.gender,
      address: evt.target.value,
    }));
  };

  const onFileUpload = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile({ file: evt.target.files[0], isUploaded: true });
  };

  type OptionType = { label: string; value: string }[];

  const options: OptionType = allInstitutions.map((inst) => {
    return { value: inst, label: inst };
  });

  const optionsLevel: OptionType = [
    { value: "ND1", label: "ND1" },
    { value: "NC2", label: "NC2" },
    { value: "300", label: "300" },
    { value: "400", label: "400" },
  ];

  const optionsGender: OptionType = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  const selectInstitution = (option: OptionType | null | any) => {
    if (option) {
      setTextInput((prev) => ({
        email: prev.email,
        password: prev.password,
        institute: option.value,
        level: prev.level,
        gender: prev.gender,
        address: prev.address,
      }));
    }
    setShowInput(option.value === "Others" ? true : false);
  };

  const selectLevel = (option: OptionType | null | any) => {
    if (option) {
      setTextInput((prev) => ({
        email: prev.email,
        password: prev.password,
        institute: prev.institute,
        level: option.value,
        gender: prev.gender,
        address: prev.address,
      }));
    }
    setShowInput(option.value === "Others" ? true : false);
  };

  const selectGender = (option: OptionType | null | any) => {
    if (option) {
      setTextInput((prev) => ({
        email: prev.email,
        password: prev.password,
        institute: prev.institute,
        level: prev.level,
        gender: option.value,
        address: prev.address,
      }));
    }
    setShowInput(option.value === "Others" ? true : false);
  };

  const customStyles = {
    option: (defaultStyles: any, state: any) => ({
      ...defaultStyles,
      backgroundColor: "#1f2937",
      cursor: "pointer",
      ":hover": { backgroundColor: "#1d4ed8" },
      ":active": {
        ...defaultStyles[":active"],
        backgroundColor: state.isSelected ? "red" : "blue",
      },
    }),
    singleValue: (defaultStyles: any, state: any) => ({
      ...defaultStyles,
      lineHeight: ".6rem",
      padding: ".95rem 0",
      color: "#eaeaea",
      width: "100%",
    }),
  };

  return (
    <>
      <Head>
        <title>Signup | Student</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main>
        <section className={styles.hero}>
          <div className={styles.signupContainer}>
            <div className="p-2 w-full sm:p-8 lg:p-10">
              <h1 className={styles.h1}>Create a Student Account</h1>
              <form className="mt-4">
                <div className={styles.fullName}>
                  <div className={styles.names}>
                    <div className="w-full">
                      <input
                        required
                        placeholder="First Name"
                        name="firstName"
                        type="text"
                        className={styles.signupInput}
                        value=""
                      />
                    </div>
                    <div className="w-full">
                      <input
                        required
                        placeholder="Other Name"
                        name="firstName"
                        type="text"
                        className={styles.signupInput}
                        value=""
                      />
                    </div>
                    <div className="w-full">
                      <input
                        required
                        placeholder="Last Name"
                        name="lastName"
                        type="text"
                        className={styles.signupInput}
                        value=""
                      />
                    </div>
                  </div>
                  <div className={styles.passport}>
                    <img src="../images/Passport.jpg" alt="passport" />
                  </div>
                  <div className="w-full">
                    <input
                      required
                      type="text"
                      name="matno"
                      id="matno"
                      placeholder="Matriculation Number"
                      className={styles.signupInput}
                      value={textInput.email}
                      onChange={onChangeHandlerEmail}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <div className="mb-4">
                    <Select
                      options={options}
                      className={styles.select}
                      placeholder="Select Institution"
                      onChange={selectInstitution}
                      styles={customStyles}
                    />
                  </div>
                </div>
                {showInput && (
                  <div className="mb-4">
                    <div className="w-full">
                      <input
                        required
                        placeholder="Institution Name"
                        name="other"
                        type="text"
                        className={styles.signupInput}
                        value=""
                      />
                    </div>
                  </div>
                )}
                <div className="flex flex-col mb-4 space-y-4 md:flex-row md:space-y-0 md:space-x-2">
                  <div className="w-full">
                    <input
                      required
                      placeholder="Department"
                      name="dept"
                      type="text"
                      className={styles.signupInput}
                      value=""
                    />
                  </div>
                  <div className="w-full flex flex-row justify-between">
                    <div className="w-full mr-1">
                      <Select
                        options={optionsLevel}
                        className={styles.select}
                        placeholder="Select Level"
                        onChange={selectLevel}
                        styles={customStyles}
                      />
                    </div>
                    <div className="w-full ml-1">
                      <Select
                        options={optionsGender}
                        className={styles.select}
                        placeholder="Gender"
                        onChange={selectGender}
                        styles={customStyles}
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <input
                    required
                    type="text"
                    name="address"
                    id="address"
                    placeholder="House Address"
                    className={styles.signupInput}
                    value={textInput.address}
                    onChange={onChangeHandlerAddress}
                  />
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
                          className="ml-1 text-blue-700 dark:text-blue-500 hover:underline"
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
                        : "Upload Passport"}
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
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Already have an account?
                  <Link href="/login">
                    <a className="ml-1 text-blue-700 hover:underline dark:text-blue-500">
                      Login here.
                    </a>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </section>
        <div className={styles.spacer}></div>
      </main>
    </>
  );
};

export default Student;
