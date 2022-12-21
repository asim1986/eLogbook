import { errorToastStyle, successToastStyle, warnToastStyle } from "../utils/styles.utils";
import { IFileInputType, IUploadFile } from "../interfaces/upload.interface";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import React, { Fragment, useContext, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/store.hook";
import { REGISTER_STUDENT } from "../graphql/mutations/student";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { ORGANISATIONS } from "../graphql/query/organisation";
import { setEligReset } from "../store/slice/eligible.slice";
import { uploadToCloudinary } from "../utils/cloudUpload";
import { allInstitutions } from "../utils/institutions";
import { setStudAuth } from "../store/slice/auth.slice";
import { useMutation, useQuery } from "@apollo/client";
import { IFormInput } from "../interfaces/formInput";
import GlobalContext from "../context/GlobalContext";
import constants from "../config/constant.config";
import styles from "../styles/Signup.module.scss";
import toast, { Toaster } from "react-hot-toast";
import { customStyles } from "../utils/util";
import { depts } from "../utils/department";
import "react-phone-number-input/style.css";
import { gender } from "../utils/gender";
import { level } from "../utils/levels";
import { useRouter } from "next/router";
import Select from "react-select";
import Loader from "./Loader";
import Link from "next/link";
import axios from "axios";


const StudentForm = ({ isAdmin, btnTitle }: IFormInput): JSX.Element => {
  const eligData = useAppSelector((state) => state.eligible);
  const {graphqlBaseUrl, prod, dev} = constants;
  const [textInput, setTextInput] = useState({
    name: { firstName: "", lastName: "" },
    email: "",
    phone: "",
    password: "",
    institute: eligData ? eligData.institute : "",
    place: "",
    level: eligData ? eligData.level : "",
    gender: "",
    address: "",
    other: "",
    dept: eligData ? eligData.department : "",
    matric: eligData ? eligData.matricNo : "",
  });
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading: load, data: orgData } = useQuery(ORGANISATIONS);

  const listOrg = orgData?.organisations?.map((i: any) => {
    return { value: i.email, label: i.name };
  });

  const [addStudent, { loading, reset }] = useMutation(REGISTER_STUDENT, {
    onCompleted: (data) => {
      toast.success(data?.student.message, successToastStyle);
      router.push("/logbook");
      // console.log("STUDENT DATA => ", data?.student);
      dispatch(setStudAuth(data?.student));
      reset();
      dispatch(setEligReset());
    },
    onError: ({ graphQLErrors, networkError }) => {
      // alert(error?.message);
      // setShowEventModal(true);
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

  const [showPassword, setShowPassword] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [selectedFile, setSelectedFile] = useState({
    file: null,
    isUploaded: false,
    img: null,
  });

  type OptionType = { label: string; value: string }[];

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
      place: prev.place,
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
      place: prev.place,
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
      place: prev.place,
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
      place: prev.place,
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
      place: prev.place,
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
      place: prev.place,
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
      place: prev.place,
      level: prev.level,
      gender: prev.gender,
      address: prev.address,
      other: evt.target.value,
      dept: prev.dept,
      matric: prev.matric,
    }));
  };

  const selectDept = (option: OptionType | null | any) => {
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
        place: prev.place,
        level: prev.level,
        gender: prev.gender,
        address: prev.address,
        other: prev.other,
        dept: option.value,
        matric: prev.matric,
      }));
    }
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
      place: prev.place,
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
    if(mainFile.length !== 0) {
      setSelectedFile({
        file: mainFile[0],
        isUploaded: true,
        img: URL.createObjectURL(mainFile[0]),
      });
    }    
  };

  const options: OptionType = allInstitutions.map((inst) => {
    return { value: inst, label: inst };
  });

  const optionsLevel: OptionType = level;

  const optionsDept: OptionType = depts;

  const optionsGender: OptionType = gender;

  const optionsPlace: OptionType = load ? [{ label: "Loading" }] : listOrg;

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
        place: prev.place,
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
        place: prev.place,
        level: option.value,
        gender: prev.gender,
        address: prev.address,
        other: prev.other,
        dept: prev.dept,
        matric: prev.matric,
      }));
    }
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
        place: prev.place,
        level: prev.level,
        gender: option.value,
        address: prev.address,
        other: prev.other,
        dept: prev.dept,
        matric: prev.matric,
      }));
    }
  };

  const selectPlace = (option: OptionType | null | any) => {
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
        place: option.value,
        level: prev.level,
        gender: prev.gender,
        address: prev.address,
        other: prev.other,
        dept: prev.dept,
        matric: prev.matric,
      }));
    }
  };

  const onSubmitHandler = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!selectedFile.file) {
      toast.error("Please Upload a Passport!", warnToastStyle);
      return;
    }
    // DEVELOPMENT ENVIRONMENT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    if (prod) {
      const formData = new FormData();
      const query = `mutation($input: FileInput!) { uploadFile(input: $input) { imageUrl status message } }`;

      const fileInput: IFileInputType = {
        file: null,
        type: "avatar",
      };

      const map = { "0": ["variables.input.file"] };
      const operations = JSON.stringify({
        query,
        variables: { input: fileInput },
      });
      formData.append("operations", operations);
      formData.append("map", JSON.stringify(map));
      formData.append("0", selectedFile.file);

      await axios
      .post(graphqlBaseUrl, formData, {
        headers: {
          "apollo-require-preflight": true,
        },
      })
      .then((response) => {
        // console.log("RESPONSE****", response);
        if (response?.data?.errors) {
          const errMsg = response?.data?.errors[0];
          toast.error(errMsg?.message, errorToastStyle);
          return;
        }

        const status = response?.status;
        const { data } = response?.data;
        const { imageUrl } = data?.uploadFile as IUploadFile;
        // const { imageUrl }  = data;
        console.log("imageUrl Response***", imageUrl);
        console.log("Status ***>", status);

        if (status === 200) {
          addStudent({
            variables: {
              registeredInput: {
                firstName: textInput.name.firstName,
                lastName: textInput.name.lastName,
                email: textInput.email,
                password: textInput.password,
                matricNo: textInput.matric,
                phone: textInput.phone,
                institute: textInput.institute,
                department: textInput.dept,
                place: textInput.place,
                level: textInput.level,
                gender: textInput.gender,
                address: textInput.address,
                avatar: imageUrl,
              },
            },
          });
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          "An error occurred while uploading image",
          errorToastStyle
        );
      });
    }
    // PRODUCTION ENVIRONMENT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    else if (dev) {
      try {
        const { file } = selectedFile;
        const imgUrl = await uploadToCloudinary({file, type: "avatar"});
        if (imgUrl || imgUrl !== "") {
          addStudent({
            variables: {
              registeredInput: {
                firstName: textInput.name.firstName,
                lastName: textInput.name.lastName,
                email: textInput.email,
                password: textInput.password,
                matricNo: textInput.matric,
                phone: textInput.phone,
                institute: textInput.institute,
                department: textInput.dept,
                place: textInput.place,
                level: textInput.level,
                gender: textInput.gender,
                address: textInput.address,
                avatar: imgUrl,
              },
            },
          });
        }
      } catch (err) {
        const error: any = err;
          if (error?.status === 100 || error?.status === 101 || error?.status === 102) {
            toast.error(error?.msg, warnToastStyle);
            return;
          }
          toast.error(`${err}`, errorToastStyle);
      }
    }
  };

  return (
    <Fragment>
      <Toaster position="top-center" reverseOrder={false} />
      {loading && <Loader show={true} />}
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
              isClearable
              defaultValue={{
                value: `${eligData?.institute}`,
                label: `${eligData?.institute}`,
              }}
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
            <Select
                isClearable
                options={optionsDept}
                defaultValue={{
                  value: `${eligData?.department}`,
                  label: `${eligData?.department}`,
                }}
                className={styles.select}
                placeholder="Department"
                onChange={selectDept}
                styles={customStyles}
              />
          </div>
          <div className="w-full flex flex-row justify-between">
            <div className="w-full mr-1">
              <Select
                options={optionsLevel}
                isClearable
                defaultValue={{
                  value: `${eligData?.level}`,
                  label: `${
                    eligData?.level === "L4"
                      ? "400"
                      : eligData?.level === "L3"
                      ? "300"
                      : eligData?.level
                  }`,
                }}
                className={styles.select}
                placeholder="Level"
                onChange={selectLevel}
                styles={customStyles}
              />
            </div>
            <div className="w-full ml-1">
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
        </div>
        <div className="mb-4">
          <Select
            isClearable
            options={optionsPlace}
            className={styles.select}
            placeholder="Select Place of SIWES"
            onChange={selectPlace}
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
          {!isAdmin && (
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
        {!isAdmin && (
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
