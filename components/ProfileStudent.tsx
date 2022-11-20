import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import styles from "../styles/Profile.module.scss";
import ManageProfile from "./ManageProfile";
import "react-phone-number-input/style.css";
import Select from "react-select";
import { useState } from "react";
import router from "next/router";
import { useAppDispatch, useAppSelector } from "../hooks/store.hook";
import { IAuthStudSlice } from "../interfaces/slice.interface";
import { setOrgAuth, setRest } from "../store/slice/auth.slice";
import { useMutation } from "@apollo/client";
import toast, { Toaster } from "react-hot-toast";
import { UPDATE_ORG } from "../graphql/mutations/organisation";
import { successToastStyle, errorToastStyle } from "../utils/styles.utils";
import Loader from "./Loader";
import { IFileType, IUploadFile } from "../interfaces/upload.interface";
import constants from "../config/constant.config";
import axios from "axios";
import { UPDATE_STUDENT } from "../graphql/mutations/student";

const ProfileStudent = () => {
  const data: IAuthStudSlice = useAppSelector(
    (state) => state.auth.userStudData
  );
  const token = useAppSelector((state) => state.auth.token);
  console.log(token);
  // console.log(">>>*** ==", data);
  const dispatch = useAppDispatch();

  const [textInput, setTextInput] = useState({
    name: { firstName: `${data.firstName}`, lastName: `${data.lastName}` },
    email: `${data.email}`,
    phone: `${data.phone}`,
    gender: `${data.gender}`,
    level: `${data.level}`,
    institute: `${data.institute}`,
    address: `${data.address}`,
    dept: `${data.department}`,
    matric: `${data.matricNo}`,
  });

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
      gender: prev.gender,
      level: prev.level,
      institute: prev.institute,
      address: prev.address,
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
      gender: prev.gender,
      level: prev.level,
      institute: prev.institute,
      address: prev.address,
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
      gender: prev.gender,
      level: prev.level,
      institute: prev.institute,
      address: prev.address,
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
      gender: prev.gender,
      level: prev.level,
      institute: prev.institute,
      address: evt.target.value,
      dept: prev.dept,
      matric: prev.matric,
    }));
  };

  const onFileUpload = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const mainFile = evt.target.files;
    // console.log(mainFile[0]);
    setSelectedFile({
      file: mainFile[0],
      isUploaded: true,
      img: URL.createObjectURL(mainFile[0]),
    });
  };

  const resetImage = () => {
    setSelectedFile((prev) => ({
      file: null,
      isUploaded: false,
      img: null,
    }));
  };

  const [updateStudent, { loading, reset }] = useMutation(UPDATE_STUDENT, {
    onCompleted: (data) => {
      toast.success(data.updateStudent?.message, successToastStyle);
      console.log("DATA ==> ", data);
      dispatch(setOrgAuth(data.updateStudent));
      reset();
    },
    onError: ({ graphQLErrors, networkError }) => {
      try {
        if (graphQLErrors)
          graphQLErrors.forEach(({ message, locations, path }) => {
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            );
            const tokenErr = message.split(":")[0];
            toast.error(`${message}`, errorToastStyle);
            if (tokenErr === "TokenExpiredError") {
              logout();
            }
          });
        if (networkError) {
          toast.error(`${networkError}`, errorToastStyle);
          console.log(`[Network error]: ${networkError}`);
        }
      } catch (err) {
        console.log("ERR****", err);
      }
    },
  });

  const logout = () => {
    dispatch(setRest());
    router.push("/login");
  };

  const optionsPlace: OptionType = [
    { value: `${data.place}`, label: `${data.place}` },
  ];

  type OptionType = { label: string; value: string }[];

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

  const selectGender = (option: OptionType | null | any) => {
    if (option) {
      setTextInput((prev) => ({
        name: {
          firstName: prev.name.firstName,
          lastName: prev.name.lastName,
        },
        email: prev.email,
        phone: prev.phone,
        level: prev.level,
        institute: prev.institute,
        gender: option.value,
        address: prev.address,
        dept: prev.dept,
        matric: prev.matric,
      }));
    }
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
      lineHeight: ".5rem",
      padding: ".90rem 0",
      color: "#eaeaea",
      width: "100%",
    }),
  };

  const changeLevel = (option: OptionType | null | any) => {
    if (option) {
      setTextInput((prev) => ({
        name: {
          firstName: prev.name.firstName,
          lastName: prev.name.lastName,
        },
        email: prev.email,
        phone: prev.phone,
        level: option.value,
        institute: prev.institute,
        gender: option.value,
        address: prev.address,
        dept: prev.dept,
        matric: prev.matric,
      }));
    }
  };

  const onSubmitHandler = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (selectedFile.file) {
      const formData = new FormData();
      const query = `mutation($updateInput: FileUpdateInput!) { updateFile(updateInput: $updateInput) { message imageUrl status } }`;

      const fileInput: IFileType = {
        id: `${data?.id}`,
        type: "logo",
        file: null,
      };

      const map = { "0": ["variables.updateInput.file"] };
      const operations = JSON.stringify({
        query,
        variables: { updateInput: fileInput },
      });
      formData.append("operations", operations);
      formData.append("map", JSON.stringify(map));
      formData.append("0", selectedFile.file);

      // console.log("formData === ", constants.graphqlBaseUrl);
      await axios
        .post(constants.graphqlBaseUrl, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "apollo-require-preflight": true,
          },
        })
        .then((response) => {
          const status = response.status;
          console.log("RESPONSESS ===", response);
          if (response?.data?.errors) {
            const errMsg = response?.data?.errors;
            toast.error(errMsg[0].message, errorToastStyle);
            const tokenErr = errMsg[0].message.split(":")[0];
            if (tokenErr === "TokenExpiredError") {
              logout();
            }
            return;
          }
          const { updateFile } = response?.data?.data;
          console.log("DATES ===", updateFile);
          const { imageUrl } = updateFile as IUploadFile;
          console.log("IMAGEURL ===", imageUrl);

          if (status === 200) {
            updateStudent({
              variables: {
                updateInput: {
                  address: textInput.address,
                  avatar: imageUrl,
                  email: textInput.email,
                  firstName: textInput.name.firstName,
                  gender: textInput.gender,
                  lastName: textInput.name.lastName,
                  level: textInput.level,
                  phone: textInput.phone,
                },
              },
            });
          }
        })
        .catch((error) => {
          console.log("ERROR ====", error);
          toast.error(
            "An error occurred while uploading image",
            errorToastStyle
          );
        });
    } else {
      updateStudent({
        variables: {
          updateInput: {
            address: textInput.address,
            avatar: data.avatar,
            email: textInput.email,
            firstName: textInput.name.firstName,
            gender: textInput.gender,
            lastName: textInput.name.lastName,
            level: textInput.level,
            phone: textInput.phone,
          },
        },
      });
    }
  };

  return (
    <div className={styles.profiles}>
      <Toaster position="top-center" reverseOrder={false} />
      {loading && <Loader show={true} />}
      <ManageProfile
        profile={`/profile/${data?.user?.toLowerCase()}`}
        change="/profile/change-password"
        delete="/profile/delete-account"
      />

      <div className={styles.userProfile}>
        <h1>User Profile</h1>
        <div className={styles.userImg}>
          <img
            src={
              selectedFile.img ? selectedFile.img : "../images/thumbnail.png"
            }
            alt="passport"
          />
          <div>
            <h1>{`${data?.firstName} ${data?.lastName}`}</h1>
            <h2>{`${data?.email}`}</h2>
            <div className="flex items-center justify-between my-3">
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
                  {selectedFile.isUploaded ? "File Uploaded" : "Change Image"}
                </label>
              </div>
              <button
                className={
                  selectedFile.isUploaded
                    ? "bg-red-700 rounded-lg px-3 py-1 text-sm"
                    : styles.uploadAvatarBtn
                }
                onClick={resetImage}
              >
                Reset Image
              </button>
            </div>
          </div>
        </div>

        <form className="mt-4" onSubmit={onSubmitHandler}>
          <div className="flex flex-col md:flex-row justify-between mb-4 w-full">
            <div className="w-full md:mr-1">
              <input
                required
                placeholder="First Name"
                name="firstName"
                type="text"
                className={styles.inputStyle}
                value={textInput.name.firstName}
                onChange={onChangeHandlerFirst}
              />
            </div>
            <div className="w-full md:ml-1 mt-3 md:mt-0">
              <input
                required
                placeholder="Last Name"
                name="lastName"
                type="text"
                className={styles.inputStyle}
                value={textInput.name.lastName}
                onChange={onChangeHandlerLast}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between mb-4 w-full">
            <div className="w-full mr-1">
              <input
                required
                placeholder="Matriculation number"
                name="matric"
                type="text"
                className={styles.inputStyle}
                value={textInput.matric}
                readOnly
              />
            </div>
            <div className="flex flex-row mt-3 md:mt-0 w-full">
              <div className="md:mx-1 mx-0 w-full">
                <Select
                  id="long-value"
                  instanceId="long-value"
                  options={optionsLevel}
                  defaultValue={{
                    value: `${data?.level}`,
                    label: `${
                      data?.level === "L4"
                        ? "400"
                        : data?.level === "L3"
                        ? "300"
                        : data?.level
                    }`,
                  }}
                  className={styles.select}
                  placeholder="Level"
                  onChange={changeLevel}
                  value={optionsLevel}
                  styles={customStyles}
                />
              </div>
              <div className="w-full ml-2 md:ml-1">
                <Select
                  id="long-value"
                  instanceId="long-value"
                  defaultValue={{
                    value: `${data?.gender}`,
                    label: `${data?.gender}`,
                  }}
                  options={optionsGender}
                  value={optionsGender}
                  className={styles.select}
                  placeholder="Gender"
                  onChange={selectGender}
                  styles={customStyles}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between mb-4 w-full">
            <div className="w-full md:mr-2 mr-0">
              <input
                required
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className={styles.inputStyle}
                value={textInput.email}
                readOnly
              />
            </div>
            <div className="w-full md:ml-1 mt-3 md:mt-0">
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

          <div className="flex flex-col md:flex-row justify-between mb-4 w-full">
            <div className="w-full md:mr-1 mr-0">
              <input
                required
                placeholder="Address"
                name="firstName"
                type="text"
                className={styles.inputStyle}
                value={textInput.address}
                onChange={onChangeHandlerAddress}
              />
            </div>
            <div className="w-full md:ml-1 mt-3 md:mt-0">
              <Select
                id="long-value"
                instanceId="long-value"
                isDisabled
                defaultValue={{
                  value: `${data?.organisation?.email}`,
                  label: `${data?.organisation?.name}`,
                }}
                className={styles.select}
                placeholder="Select Place of SIWES"
                styles={customStyles}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between mb-4 w-full">
            <div className="w-full md:mr-1 mr-0">
              <input
                required
                placeholder="Department"
                name="dept"
                id="dept"
                type="text"
                className={styles.inputStyle}
                value={textInput.dept}
                readOnly
              />
            </div>
            <div className="w-full md:ml-1 mt-3 md:mt-0">
              <input
                required
                placeholder="Institution"
                name="institution"
                id="institution"
                type="text"
                className={styles.inputStyle}
                value={textInput.institute}
                readOnly
              />
            </div>
          </div>

          <div className="flex justify-center p-0 mb-4">
            <button className={styles.saveBtn} type="submit">
              <span className="flex justify-center items-center">
                Save Changes
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileStudent;
