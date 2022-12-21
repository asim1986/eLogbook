import { IFileInputType, IUploadFile } from "../interfaces/upload.interface";
import {
  errorToastStyle,
  successToastStyle,
  warnToastStyle,
} from "../utils/styles.utils";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { setCoordAuth, setSupAuth } from "../store/slice/auth.slice";
import { REGISTER_COORD } from "../graphql/mutations/coordinator";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { REGISTER_SUP } from "../graphql/mutations/supervisor";
import { allInstitutions } from "../utils/institutions";
import { IFormInput } from "../interfaces/formInput";
import { useAppDispatch } from "../hooks/store.hook";
import styles from "../styles/Signup.module.scss";
import constants from "../config/constant.config";
import { staffTitle } from "../utils/title.utils";
import { toast, Toaster } from "react-hot-toast";
import { useMutation } from "@apollo/client";
import { customStyles } from "../utils/util";
import "react-phone-number-input/style.css";
import { gender } from "../utils/gender";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Select from "react-select";
import Loader from "./Loader";
import Link from "next/link";
import axios from "axios";
import { uploadToCloudinary } from "../utils/cloudUpload";
import { depts } from "../utils/department";

const SuperviorForm = ({ isSupervisor, isAdmin, btnTitle }: IFormInput) => {
  const [textInput, setTextInput] = useState({
    name: { firstName: "", lastName: "", title: "" },
    staffId: "",
    phone: "",
    dept: "",
    gender: "",
    institute: "",
    other: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { prod, dev } = constants;

  const [addUser, { loading, reset }] = useMutation(
    isSupervisor ? REGISTER_SUP : REGISTER_COORD,
    {
      onCompleted: (data) => {
        toast.success("Registered successfully!", successToastStyle);
        router.push("/activities");
        console.log("DATA ==> ", data);
        dispatch(
          isSupervisor
            ? setSupAuth(data?.supervisor)
            : setCoordAuth(data?.coordinator)
        );
        // dispatch(setUser(data));
        reset();
        setIsLoading(false);
      },
      onError: ({ graphQLErrors, networkError }) => {
        setIsLoading(false);
        if (graphQLErrors)
          graphQLErrors.forEach(({ message, locations, path }) => {
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            );
            const tokenErr = message.split(":")[0];
            console.log("ERROR ==", tokenErr);
            toast.error(`${message}`, errorToastStyle);
          });
        if (networkError) {
          toast.error(`${networkError}`, errorToastStyle);
          console.log(`[Network error]: ${networkError}`);
        }
      },
    }
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [selectedFile, setSelectedFile] = useState({
    file: null,
    isUploaded: false,
  });

  type OptionType = { label: string; value: string }[];

  const optionsDept = depts;
  const optionsGender = gender;
  const optionsTitle = staffTitle;

  const options: OptionType = allInstitutions.map((inst) => {
    return { value: inst, label: inst };
  });

  const onChangeFirstName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      name: {
        firstName: evt.target.value,
        lastName: prev.name.lastName,
        title: prev.name.title,
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
        title: prev.name.title,
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
        title: prev.name.title,
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
        title: prev.name.title,
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
        title: prev.name.title,
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

  const selectTitle = (option: OptionType | null | any) => {
    if (option) {
      setTextInput((prev) => ({
        name: {
          firstName: prev.name.firstName,
          lastName: prev.name.lastName,
          title: option.value,
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

  const selectDept = (option: OptionType | null | any) => {
    if (option) {
      setTextInput((prev) => ({
        name: {
          firstName: prev.name.firstName,
          lastName: prev.name.lastName,
          title: prev.name.title,
        },
        staffId: prev.staffId,
        phone: prev.phone,
        dept: option.value,
        gender: prev.gender,
        institute: prev.institute,
        other: prev.other,
        email: prev.email,
        password: prev.password,
      }));
    }
  };

  const selectGender = (option: OptionType | null | any) => {
    if (option) {
      setTextInput((prev) => ({
        name: {
          firstName: prev.name.firstName,
          lastName: prev.name.lastName,
          title: prev.name.title,
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
          title: prev.name.title,
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
        title: prev.name.title,
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
        title: prev.name.title,
      },
      staffId: prev.staffId,
      phone: prev.phone,
      dept: prev.dept,
      gender: prev.gender,
      institute: prev.institute,
      other: prev.other,
      email: evt.target.value,
      password: prev.password,
    }));
  };

  const onChangePassword = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      name: {
        firstName: prev.name.firstName,
        lastName: prev.name.lastName,
        title: prev.name.title,
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

  const onSubmitHandler = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!selectedFile.file) {
      addUser({
        variables: {
          registerInput: {
            title: textInput.name.title,
            firstName: textInput.name.firstName,
            lastName: textInput.name.lastName,
            staffID: textInput.staffId,
            email: textInput.email,
            password: textInput.password,
            department: textInput.dept,
            institute: textInput.institute,
            phone: textInput.phone,
            gender: textInput.gender,
          },
        },
      });
    } else {
      // Check File Size and type
      const { file } = selectedFile;
      const { type: t, size } = file as File;

      if (t !== "image/png" && t !== "image/jpg" && t !== "image/jpeg") {
        toast.error("Invalid file Uploaded", warnToastStyle);
        return;
      }

      if (size > 100000) {
        toast.error("Maximum file size is 100KB!", warnToastStyle);
        return;
      }
      // DEVELOPMENT ENVIRONMENT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
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
          .post(constants.graphqlBaseUrl, formData, {
            headers: {
              "apollo-require-preflight": true,
            },
          })
          .then((response) => {
            const status = response.status;
            const { data } = response.data;
            const { imageUrl } = data.uploadFile as IUploadFile;
            if (status === 200) {
              addUser({
                variables: {
                  registerInput: {
                    title: textInput.name.title,
                    firstName: textInput.name.firstName,
                    lastName: textInput.name.lastName,
                    staffID: textInput.staffId,
                    email: textInput.email,
                    password: textInput.password,
                    department: textInput.dept,
                    institute: textInput.institute,
                    phone: textInput.phone,
                    gender: textInput.gender,
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
      // PRODUCTION ENVIRONMENT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      if (dev) {
        try {
          const { file } = selectedFile;
          setIsLoading(true);
          const imgUrl = await uploadToCloudinary({ file, type: "avatar" });
          if (imgUrl || imgUrl !== "") {
            addUser({
              variables: {
                registerInput: {
                  title: textInput.name.title,
                  firstName: textInput.name.firstName,
                  lastName: textInput.name.lastName,
                  staffID: textInput.staffId,
                  email: textInput.email,
                  password: textInput.password,
                  department: textInput.dept,
                  institute: textInput.institute,
                  phone: textInput.phone,
                  gender: textInput.gender,
                  avatar: imgUrl,
                },
              },
            });
          }
          setIsLoading(false);
        } catch (err) {
          console.log(err);
          setIsLoading(false);
          const error: any = err;
          if (error?.status === 100 || error?.status === 101 || error?.status === 102) {
            toast.error(error?.msg, warnToastStyle);
            return;
          }
          toast.error(`${err}`, errorToastStyle);
        }
      }
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      {loading && <Loader show={true} />}
      <form className="mt-4" onSubmit={onSubmitHandler}>
        <div className="flex flex-col mb-4 space-y-4 md:flex-row md:space-y-0 md:space-x-2">
          <div className="w-full lg:w-8/12">
            <Select
              isClearable
              options={optionsTitle}
              className={styles.select}
              placeholder="Title"
              onChange={selectTitle}
              styles={customStyles}
            />
          </div>
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
            <Select
                isClearable
                options={optionsDept}
                className={styles.select}
                placeholder="Department"
                onChange={selectDept}
                styles={customStyles}
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
    </>
  );
};

export default SuperviorForm;
