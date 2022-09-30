import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import React, { Fragment, useContext, useState } from "react";
import { allInstitutions } from "../utils/institutions";
import { IFormInput } from "../interfaces/formInput";
import GlobalContext from "../context/GlobalContext";
import UPDATE_AVATAR from "../schema/updateAvatar";
import styles from "../styles/Signup.module.scss";
import { useMutation } from "@apollo/client";
import { customStyles } from "../utils/util";
import "react-phone-number-input/style.css";
import { ErrorModal } from "./ErrorModal";
import { gender } from "../utils/gender";
import { level } from "../utils/levels";
import Select from "react-select";
import Loader from "./Loader";
import Link from "next/link";
import axios from "axios";

const StudentForm = ({ admin, btnTitle }: IFormInput): JSX.Element => {
  const { showEventModal, setShowEventModal } = useContext(GlobalContext);
  const [textInput, setTextInput] = useState({
    name: { firstName: "", lastName: "" },
    email: "",
    phone: "",
    password: "",
    institute: "",
    level: "",
    gender: "",
    address: "",
    other: "",
    dept: "",
    matric: "",
  });
  const [addStudent, { data, loading, error, reset }] = useMutation(
    UPDATE_AVATAR,
    {
      onError: ({ graphQLErrors, networkError }) => {
        // alert(error?.message);
        setShowEventModal(true);
        if (graphQLErrors)
          graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
          );
        if (networkError) console.log(`[Network error]: ${networkError}`);
      },
    }
  );

  const [showPassword, setShowPassword] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [selectedFile, setSelectedFile] = useState({
    file: null,
    isUploaded: false,
    img: null,
  });

  const onChangeHandlerFirst = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      name: {
        firstName: evt.target.value,
        lastName: prev.name.lastName,
      },
      email: prev.email,
      phone: prev.phone,
      password: prev.password,
      institute: prev.institute,
      level: prev.level,
      gender: prev.gender,
      address: prev.address,
      other: prev.other,
      dept: prev.dept,
      matric: prev.matric,
    }));
  };

  const onChangeHandlerLast = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      name: {
        firstName: prev.name.firstName,
        lastName: evt.target.value,
      },
      email: prev.email,
      phone: prev.phone,
      password: prev.password,
      institute: prev.institute,
      level: prev.level,
      gender: prev.gender,
      address: prev.address,
      other: prev.other,
      dept: prev.dept,
      matric: prev.matric,
    }));
  };

  const onChangeHandlerEmail = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      name: {
        firstName: prev.name.firstName,
        lastName: prev.name.lastName,
      },
      email: evt.target.value,
      phone: prev.phone,
      password: prev.password,
      institute: prev.institute,
      level: prev.level,
      gender: prev.gender,
      address: prev.address,
      other: prev.other,
      dept: prev.dept,
      matric: prev.matric,
    }));
  };

  const onChangeHandlerPhone = (value: string | undefined) => {
    setTextInput((prev) => ({
      name: {
        firstName: prev.name.firstName,
        lastName: prev.name.lastName,
      },
      email: prev.email,
      phone: value,
      password: prev.password,
      institute: prev.institute,
      level: prev.level,
      gender: prev.gender,
      address: prev.address,
      other: prev.other,
      dept: prev.dept,
      matric: prev.matric,
    }));
  };

  const onChangeHandlerPassword = (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTextInput((prev) => ({
      name: {
        firstName: prev.name.firstName,
        lastName: prev.name.lastName,
      },
      email: prev.email,
      phone: prev.phone,
      password: evt.target.value,
      institute: prev.institute,
      level: prev.level,
      gender: prev.gender,
      address: prev.address,
      other: prev.other,
      dept: prev.dept,
      matric: prev.matric,
    }));
  };

  const onChangeHandlerAddress = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      name: {
        firstName: prev.name.firstName,
        lastName: prev.name.lastName,
      },
      email: prev.email,
      phone: prev.phone,
      password: prev.password,
      institute: prev.institute,
      level: prev.level,
      gender: prev.gender,
      address: evt.target.value,
      other: prev.other,
      dept: prev.dept,
      matric: prev.matric,
    }));
  };

  const onChangeHandlerOther = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      name: {
        firstName: prev.name.firstName,
        lastName: prev.name.lastName,
      },
      email: prev.email,
      phone: prev.phone,
      password: prev.password,
      institute: prev.institute,
      level: prev.level,
      gender: prev.gender,
      address: prev.address,
      other: evt.target.value,
      dept: prev.dept,
      matric: prev.matric,
    }));
  };

  const onChangeHandlerDept = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      name: {
        firstName: prev.name.firstName,
        lastName: prev.name.lastName,
      },
      email: prev.email,
      phone: prev.phone,
      password: prev.password,
      institute: prev.institute,
      level: prev.level,
      gender: prev.gender,
      address: prev.address,
      other: prev.other,
      dept: evt.target.value,
      matric: prev.matric,
    }));
  };

  const onChangeHandlerMatric = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      name: {
        firstName: prev.name.firstName,
        lastName: prev.name.lastName,
      },
      email: prev.email,
      phone: prev.phone,
      password: prev.password,
      institute: prev.institute,
      level: prev.level,
      gender: prev.gender,
      address: prev.address,
      other: prev.other,
      dept: prev.dept,
      matric: evt.target.value,
    }));
  };

  const onFileUpload = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const mainFile = evt.target.files;
    setSelectedFile({
      file: mainFile[0],
      isUploaded: true,
      img: URL.createObjectURL(mainFile[0]),
    });
  };

  type OptionType = { label: string; value: string }[];

  const options: OptionType = allInstitutions.map((inst) => {
    return { value: inst, label: inst };
  });

  const optionsLevel: OptionType = level;

  const optionsGender: OptionType = gender;

  const optionsPlace: OptionType = [{ value: "Upcoming", label: "Upcoming" }];

  const selectInstitution = (option: OptionType | null | any) => {
    if (option) {
      setTextInput((prev) => ({
        name: {
          firstName: prev.name.firstName,

          lastName: prev.name.lastName,
        },
        email: prev.email,
        phone: prev.phone,
        password: prev.password,
        institute: option.value,
        level: prev.level,
        gender: prev.gender,
        address: prev.address,
        other: prev.other,
        dept: prev.dept,
        matric: prev.matric,
      }));
    }
    setShowInput(option.value === "Others" ? true : false);
  };

  const selectLevel = (option: OptionType | null | any) => {
    if (option) {
      setTextInput((prev) => ({
        name: {
          firstName: prev.name.firstName,

          lastName: prev.name.lastName,
        },
        email: prev.email,
        phone: prev.phone,
        password: prev.password,
        institute: prev.institute,
        level: option.value,
        gender: prev.gender,
        address: prev.address,
        other: prev.other,
        dept: prev.dept,
        matric: prev.matric,
      }));
    }
    setShowInput(option.value === "Others" ? true : false);
  };

  const selectGender = (option: OptionType | null | any) => {
    if (option) {
      setTextInput((prev) => ({
        name: {
          firstName: prev.name.firstName,

          lastName: prev.name.lastName,
        },
        email: prev.email,
        phone: prev.phone,
        password: prev.password,
        institute: prev.institute,
        level: prev.level,
        gender: option.value,
        address: prev.address,
        other: prev.other,
        dept: prev.dept,
        matric: prev.matric,
      }));
    }
    setShowInput(option.value === "Others" ? true : false);
  };

  // if (error) ErrorToast(error.message);

  const onSubmitHandler = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    // addStudent({
    //   variables: {
    //     testInput: {
    //       file: selectedFile.file,
    //       id: "8eccc4a7-e697-427c-833a-1afd941e3432",
    //     },
    //   },
    // });
    // console.log("DATA***", data);
    const formData = new FormData();
    const query = `mutation($updateInput: AvatarInput!) { updateAvatar(updateInput: $updateInput) { message imageUrl status } }`;

    type UpdateInputType = { id: string; file: null };
    const updateInput: UpdateInputType = {
      id: "6d8c1b26-34d4-4551-ad91-1e2b4c94dafa",
      file: null,
    };
    const map = { "0": ["variables.updateInput.file"] };
    const operations = JSON.stringify({ query, variables: { updateInput } });
    formData.append("operations", operations);
    formData.append("map", JSON.stringify(map));
    formData.append("0", selectedFile.file);
    await axios
      .post("http://localhost:8080/api/graphql", formData, {
        headers: {
          "apollo-require-preflight": true,
        },
      })
      .then((response) => console.log("RESPONSE****", response))
      .catch((error) => console.log(error));
  };

  return (
    <Fragment>
      {loading && <Loader show={true} />}
      <ErrorModal
        message={error?.message}
        show={showEventModal}
        reset={reset}
      />
      <form className="mt-4" onSubmit={onSubmitHandler}>
        <div className="flex flex-col-reverse md:flex-row justify-between">
          <div className="w-full">
            <div className="flex flex-col md:flex-row mb-4">
              <div className="w-full mb-4 md:mb-0 md:mr-1">
                <input
                  required
                  placeholder="First Name"
                  name="firstName"
                  type="text"
                  className={styles.signupInput}
                  value={textInput.name.firstName}
                  onChange={onChangeHandlerFirst}
                />
              </div>
              <div className="w-full md:ml-1">
                <input
                  required
                  placeholder="Last Name"
                  name="lastName"
                  type="text"
                  className={styles.signupInput}
                  value={textInput.name.lastName}
                  onChange={onChangeHandlerLast}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="w-full mb-4">
                <input
                  required
                  type="text"
                  name="matno"
                  id="matno"
                  placeholder="Matriculation Number"
                  className={styles.signupInput}
                  value={textInput.matric}
                  onChange={onChangeHandlerMatric}
                />
              </div>
              <div className="w-full mb-4 md:mb-0 md:ml-2">
                <PhoneInput
                  international
                  countryCallingCodeEditable={false}
                  placeholder="Phone Number"
                  className={styles.phoneInput}
                  defaultCountry="NG"
                  value={textInput.phone}
                  onChange={onChangeHandlerPhone}
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
          </div>
          <div>
            <div className={styles.passport}>
              <img
                src={
                  selectedFile.img
                    ? selectedFile.img
                    : "../images/thumbnail.png"
                }
                alt="passport"
              />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <div className="w-full">
            <input
              required
              placeholder="House Address"
              name="address"
              type="text"
              className={styles.signupInput}
              value={textInput.address}
              onChange={onChangeHandlerAddress}
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
                value={textInput.other}
                onChange={onChangeHandlerOther}
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
              value={textInput.dept}
              onChange={onChangeHandlerDept}
            />
          </div>
          <div className="w-full flex flex-row justify-between">
            <div className="w-full mr-1">
              <Select
                options={optionsLevel}
                className={styles.select}
                placeholder="Level"
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
          <Select
            options={optionsPlace}
            className={styles.select}
            placeholder="Select Place of SIWES"
            onChange={selectInstitution}
            styles={customStyles}
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
          {!admin && (
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
          )}
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
              {selectedFile.isUploaded ? "File Uploaded" : "Upload Passport"}
            </label>
          </div>
        </div>
        <div className={styles.btnWrapper}>
          <button className={styles.signupBtn} type="submit">
            <span className="flex justify-center items-center">{btnTitle}</span>
          </button>
        </div>
        {!admin && (
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Already have an account?
            <Link href="/login">
              <a className="ml-1 text-blue-700 hover:underline dark:text-blue-500">
                Login here.
              </a>
            </Link>
          </div>
        )}
      </form>
    </Fragment>
  );
};

export default StudentForm;
