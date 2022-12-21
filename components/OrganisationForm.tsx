import { errorToastStyle, successToastStyle, warnToastStyle } from "../utils/styles.utils";
import { IFileInputType, IUploadFile } from "../interfaces/upload.interface";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { REGISTER_ORG } from "../graphql/mutations/organisation";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { uploadToCloudinary } from "../utils/cloudUpload";
import { setOrgAuth } from "../store/slice/auth.slice";
import { IFormInput } from "../interfaces/formInput";
import { useAppDispatch } from "../hooks/store.hook";
import styles from "../styles/Signup.module.scss";
import constants from "../config/constant.config";
import toast, { Toaster } from "react-hot-toast";
import { useMutation } from "@apollo/client";
import { customStyles } from "../utils/util";
import "react-phone-number-input/style.css";
import { sectors } from "../utils/sectors";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Select from "react-select";
import Loader from "./Loader";
import Link from "next/link";
import axios from "axios";


const OrganisationForm = ({ isAdmin, btnTitle }: IFormInput) => {
  const [textInput, setTextInput] = useState({
    name: "",
    sector: "",
    address: "",
    employees: "",
    phone: "",
    email: "",
    password: "",
  });
  const router = useRouter();
  const { dev, prod } = constants;
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [addOrgan, { loading, reset }] = useMutation(REGISTER_ORG, {
    onCompleted: (data) => {
      toast.success("Registered successfully!", successToastStyle);
      router.push("/profile/organisation");
      console.log("DATA ==> ", data);
      dispatch(setOrgAuth(data?.organisation));
      // dispatch(setUser(data));
      reset();
    },
    onError: ({ graphQLErrors, networkError }) => {
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
  });

  const [selectedFile, setSelectedFile] = useState({
    file: null,
    isUploaded: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  type OptionType = { label: string; value: string }[];

  const optionSector = sectors;

  const onChangeName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      name: evt.target.value,
      sector: prev.sector,
      address: prev.address,
      employees: prev.employees,
      phone: prev.phone,
      email: prev.email,
      password: prev.password,
    }));
  };

  const selectSector = (option: OptionType | null | any) => {
    if (option) {
      setTextInput((prev) => ({
        name: prev.name,
        sector: option.value,
        address: prev.address,
        employees: prev.employees,
        phone: prev.phone,
        email: prev.email,
        password: prev.password,
      }));
    }
  };

  const onChangeAddress = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      name: prev.name,
      sector: prev.sector,
      address: evt.target.value,
      employees: prev.employees,
      phone: prev.phone,
      email: prev.email,
      password: prev.password,
    }));
  };

  const onChangeEmployee = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      name: prev.name,
      sector: prev.sector,
      address: prev.address,
      employees: evt.target.value,
      phone: prev.phone,
      email: prev.email,
      password: prev.password,
    }));
  };

  const onChangePhone = (value: string | undefined) => {
    setTextInput((prev) => ({
      name: prev.name,
      sector: prev.sector,
      address: prev.address,
      employees: prev.employees,
      phone: value,
      email: prev.email,
      password: prev.password,
    }));
  };

  const onChangeEmail = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      name: prev.name,
      sector: prev.sector,
      address: prev.address,
      employees: prev.employees,
      phone: prev.phone,
      email: evt.target.value,
      password: prev.password,
    }));
  };

  const onChangePassword = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      name: prev.name,
      sector: prev.sector,
      address: prev.address,
      employees: prev.employees,
      phone: prev.phone,
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
      toast.error("Please Upload Organisation Logo!", warnToastStyle);
      return;
    }
    // DEVELOPMENT ENVIRONMENT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    if (prod) {
      const formData = new FormData();
      const query = `mutation($input: FileInput!) { uploadFile(input: $input) { imageUrl status message } }`;

      const fileInput: IFileInputType = {
        file: null,
        type: "logo",
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
          // console.log("RESPONSE****", response);
          const status = response.status;
          const { data } = response.data;
          const { imageUrl } = data.uploadFile as IUploadFile;
          // const { imageUrl } = data;
          if (status === 200) {
            addOrgan({
              variables: {
                registerInput: {
                  name: textInput.name,
                  sector: textInput.sector,
                  phone: textInput.phone,
                  address: textInput.address,
                  employees: +textInput.employees,
                  email: textInput.email,
                  password: textInput.password,
                  logo: imageUrl,
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
    // PRODUCTION ENVIRONMENT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    if (dev) {
      try {
        const { file } = selectedFile;
        setIsLoading(true);
        const logoUrl = await uploadToCloudinary({ file, type: "logo" });
        if (logoUrl || logoUrl !== "") {
          addOrgan({
            variables: {
              registerInput: {
                name: textInput.name,
                sector: textInput.sector,
                phone: textInput.phone,
                address: textInput.address,
                employees: +textInput.employees,
                email: textInput.email,
                password: textInput.password,
                logo: logoUrl,
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
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      {loading || (isLoading && <Loader show={true} />)}
      <form className="mt-4" onSubmit={onSubmitHandler}>
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
            <Select
              isClearable
              options={optionSector}
              className={styles.select}
              placeholder="Business Sector"
              onChange={selectSector}
              styles={customStyles}
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
              placeholder="Number of Employees"
              name="employees"
              type="number"
              className={styles.signupInput}
              value={textInput.employees}
              onChange={onChangeEmployee}
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
                  <a className={styles.terms} href="/terms-and-conditions/">
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
              {selectedFile.isUploaded ? "File Uploaded" : "Upload Logo"}
            </label>
          </div>
        </div>
        <div className={styles.btnWrapper}>
          <button className={styles.signupBtn} type="submit">
            <span className="flex justify-center items-center">{btnTitle}</span>
          </button>
        </div>
        {!isAdmin && (
          <div className={styles.notReg}>
            Already have an account?
            <Link href="/login">
              <a className={styles.actionBtn}>Login here.</a>
            </Link>
          </div>
        )}
      </form>
    </>
  );
};

export default OrganisationForm;
