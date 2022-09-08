import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { allInstitutions } from "../../utils/institutions";
import styles from "../../styles/Signup.module.scss";
import { Navbar } from "../../components/NavBar";
import { customStyles } from "../../utils/util";
import "react-phone-number-input/style.css";
import React, { useState } from "react";
import Select from "react-select";
import Head from "next/head";
import Link from "next/link";

const Coordinator = () => {
  const [textInput, setTextInput] = useState({
    name: { firstName: "", lastName: "" },
    staffId: "",
    phone: "",
    dept: "",
    gender: "",
    institute: "",
    other: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [selectedFile, setSelectedFile] = useState({
    file: null,
    isUploaded: false,
  });

  type OptionType = { label: string; value: string }[];

  const optionsGender: OptionType = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  const options: OptionType = allInstitutions.map((inst) => {
    return { value: inst, label: inst };
  });

  const onChangeFirstName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      name: {
        firstName: evt.target.value,
        lastName: prev.name.lastName,
      },
      staffId: prev.staffId,
      phone: prev.phone,
      dept: prev.dept,
      gender: prev.gender,
      institute: prev.institute,
      other: prev.other,
      email: prev.email,
      password: prev.password,
    }));
  };

  const onChangeLastName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      name: {
        firstName: prev.name.firstName,
        lastName: evt.target.value,
      },
      staffId: prev.staffId,
      phone: prev.phone,
      dept: prev.dept,
      gender: prev.gender,
      institute: prev.institute,
      other: prev.other,
      email: prev.email,
      password: prev.password,
    }));
  };

  const onChangeStaffId = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      name: {
        firstName: prev.name.firstName,
        lastName: prev.name.lastName,
      },
      staffId: evt.target.value,
      phone: prev.phone,
      dept: prev.dept,
      gender: prev.gender,
      institute: prev.institute,
      other: prev.other,
      email: prev.email,
      password: prev.password,
    }));
  };

  const onChangePhone = (value: string | undefined) => {
    setTextInput((prev) => ({
      name: {
        firstName: prev.name.firstName,
        lastName: prev.name.lastName,
      },
      staffId: prev.staffId,
      phone: value,
      dept: prev.dept,
      gender: prev.gender,
      institute: prev.institute,
      other: prev.other,
      email: prev.email,
      password: prev.password,
    }));
  };

  const onChangeDept = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      name: {
        firstName: prev.name.firstName,
        lastName: prev.name.lastName,
      },
      staffId: prev.staffId,
      phone: prev.phone,
      dept: evt.target.value,
      gender: prev.gender,
      institute: prev.institute,
      other: prev.other,
      email: prev.email,
      password: prev.password,
    }));
  };

  const selectGender = (option: OptionType | null | any) => {
    if (option) {
      setTextInput((prev) => ({
        name: {
          firstName: prev.name.firstName,
          lastName: prev.name.lastName,
        },
        staffId: prev.staffId,
        phone: prev.phone,
        dept: prev.dept,
        gender: option.value,
        institute: prev.institute,
        other: prev.other,
        email: prev.email,
        password: prev.password,
      }));
    }
  };

  const selectInstitution = (option: OptionType | null | any) => {
    if (option) {
      setTextInput((prev) => ({
        name: {
          firstName: prev.name.firstName,
          lastName: prev.name.lastName,
        },
        staffId: prev.staffId,
        phone: prev.phone,
        dept: prev.dept,
        gender: prev.gender,
        institute: option.value,
        other: prev.other,
        email: prev.email,
        password: prev.password,
      }));
    }
    setShowInput(option?.value === "Others" ? true : false);
  };

  const onChangeOther = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      name: {
        firstName: prev.name.firstName,
        lastName: prev.name.lastName,
      },
      staffId: prev.staffId,
      phone: prev.phone,
      dept: prev.dept,
      gender: prev.gender,
      institute: prev.institute,
      other: evt.target.value,
      email: prev.email,
      password: prev.password,
    }));
  };

  const onChangeEmail = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      name: {
        firstName: prev.name.firstName,
        lastName: prev.name.lastName,
      },
      staffId: prev.staffId,
      phone: prev.phone,
      dept: prev.dept,
      gender: prev.gender,
      institute: prev.institute,
      other: evt.target.value,
      email: prev.email,
      password: prev.password,
    }));
  };

  const onChangePassword = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      name: {
        firstName: prev.name.firstName,
        lastName: prev.name.lastName,
      },
      staffId: prev.staffId,
      phone: prev.phone,
      dept: prev.dept,
      gender: prev.gender,
      institute: prev.institute,
      other: prev.other,
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
        <title>Signup | Cordinator</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main>
        <section className={styles.hero}>
          <div className={styles.signupContainer}>
            <div className="p-3 sm:p-5 lg:p-6 w-full">
              <h1 className={styles.h1}>Create a Cordinator Account</h1>
              <form className="mt-4">
                <div className="flex flex-col mb-4 space-y-4 md:flex-row md:space-y-0 md:space-x-2">
                  <div className="w-full">
                    <input
                      required
                      placeholder="First Name"
                      name="firstName"
                      type="text"
                      className={styles.signupInput}
                      value={textInput.name.firstName}
                      onChange={onChangeFirstName}
                    />
                  </div>
                  <div className="w-full">
                    <input
                      required
                      placeholder="Last Name"
                      name="lastName"
                      type="text"
                      className={styles.signupInput}
                      value={textInput.name.lastName}
                      onChange={onChangeLastName}
                    />
                  </div>
                </div>
                <div className="flex flex-col mb-4 space-y-4 md:flex-row md:space-y-0 md:space-x-2">
                  <div className="w-full ">
                    <input
                      required
                      type="text"
                      name="staffID"
                      id="staffID"
                      placeholder="Staff ID"
                      className={styles.signupInput}
                      value={textInput.staffId}
                      onChange={onChangeStaffId}
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
                <div className="flex flex-col mb-4 space-y-4 md:flex-row md:space-y-0 md:space-x-2">
                  <div className="w-full">
                    <input
                      required
                      placeholder="Department"
                      name="dept"
                      type="text"
                      className={styles.signupInput}
                      value={textInput.dept}
                      onChange={onChangeDept}
                    />
                  </div>
                  <div className="w-full">
                    <Select
                      isClearable
                      options={optionsGender}
                      className={styles.select}
                      placeholder="Gender"
                      onChange={selectGender}
                      styles={customStyles}
                    />
                  </div>
                </div>

                <div className="w-full">
                  <div className="mb-4">
                    <Select
                      isClearable
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
                        value={textInput.other}
                        onChange={onChangeOther}
                      />
                    </div>
                  </div>
                )}

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
                      <AiFillEyeInvisible
                        size="1.5rem"
                        className="text-gray-300 hover:text-gray-100"
                      />
                    ) : (
                      <AiFillEye
                        size="1.5rem"
                        className="text-gray-300 hover:text-gray-100"
                      />
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
      </main>
    </>
  );
};

export default Coordinator;
