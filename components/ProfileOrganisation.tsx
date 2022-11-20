import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { useAppDispatch, useAppSelector } from "../hooks/store.hook";
import styles from "../styles/Profile.module.scss";
import ManageProfile from "./ManageProfile";
import "react-phone-number-input/style.css";
import { useState } from "react";
import { IAuthOrganSlice } from "../interfaces/slice.interface";
import toast, { Toaster } from "react-hot-toast";
import Select from "react-select";
import { OptionType } from "dayjs";
import { customStyles } from "../utils/util";
import { sectors } from "../utils/sectors";
import axios from "axios";
import {
  IFileInputType,
  IFileType,
  IUploadFile,
} from "../interfaces/upload.interface";
import { errorToastStyle, successToastStyle } from "../utils/styles.utils";
import { UPDATE_ORG } from "../graphql/mutations/organisation";
import { setOrgAuth, setRest } from "../store/slice/auth.slice";
import constants from "../config/constant.config";
import { useMutation } from "@apollo/client";
import router from "next/router";
import Loader from "./Loader";

const ProfileOrganisation = () => {
  const data: IAuthOrganSlice = useAppSelector(
    (state) => state.auth.userOrgData
  );
  const token = useAppSelector((state) => state.auth.token);
  console.log(token);
  // console.log(">>>*** ==", data);

  const [textInput, setTextInput] = useState({
    name: `${data?.name}`,
    type: `${data?.sector}`,
    address: `${data?.address}`,
    people: `${data?.employees}`,
    phone: `${data?.phone}`,
    email: `${data?.email}`,
  });

  const dispatch = useAppDispatch();

  const [selectedFile, setSelectedFile] = useState({
    file: null,
    isUploaded: false,
    img: null,
  });

  const [updateOrgan, { loading, reset }] = useMutation(UPDATE_ORG, {
    onCompleted: (data) => {
      toast.success(data.updateOrganisation?.message, successToastStyle);
      console.log("DATA ==> ", data);
      dispatch(setOrgAuth(data.updateOrganisation));
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

  const onChangeName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      name: evt.target.value,
      type: prev.type,
      address: prev.address,
      people: prev.people,
      phone: prev.phone,
      email: prev.email,
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

  const optionSector = sectors;

  const selectSector = (option: OptionType | null | any) => {
    if (option) {
      setTextInput((prev) => ({
        name: prev.name,
        type: option.value,
        address: prev.address,
        people: prev.people,
        phone: prev.phone,
        email: prev.email,
      }));
    }
  };

  const logout = () => {
    dispatch(setRest());
    router.push("/login");
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
            updateOrgan({
              variables: {
                updateInput: {
                  email: textInput.email,
                  name: textInput.name,
                  sector: textInput.type,
                  phone: textInput.phone,
                  address: textInput.address,
                  employees: +textInput.people,
                  logo: imageUrl,
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
      updateOrgan({
        variables: {
          updateInput: {
            email: textInput.email,
            name: textInput.name,
            sector: textInput.type,
            phone: textInput.phone,
            address: textInput.address,
            employees: +textInput.people,
            logo: data.logo,
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
        profile="/profile/organisation"
        change="/profile/change-password"
        delete="/profile/delete-account"
      />
      <div className={styles.userProfile}>
        <h1>User Profile</h1>
        <div className={styles.userImg}>
          <img
            src={
              selectedFile.img
                ? selectedFile.img
                : `${constants.beHost}${data?.logo}`
            }
            alt="Logo"
          />
          <div>
            <h1>{data?.name}</h1>
            <h2>{data?.email}</h2>
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
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 w-full">
            <div className="w-full md:mr-1">
              <input
                required
                placeholder="Establishment Name"
                name="name"
                type="text"
                className={styles.inputStyle}
                value={textInput.name}
                onChange={onChangeName}
              />
            </div>
            <div className="w-full md:ml-1 mt-3 md:mt-0">
              <Select
                isClearable
                options={optionSector}
                className={styles.select}
                defaultValue={{ value: textInput.type, label: textInput.type }}
                placeholder="Business Sector"
                onChange={selectSector}
                styles={customStyles}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center mb-4 w-full">
            <div className="w-full mr-1">
              <input
                required
                placeholder="No of Employees"
                name="people"
                type="number"
                className={styles.inputStyle}
                value={textInput.people}
                onChange={onChangePeople}
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

          <div className="flex flex-col space-x-2 md:flex-row justify-between items-center mb-4 w-full">
            <div className="w-full">
              <input
                required
                type="text"
                name="address"
                id="address"
                placeholder="Address"
                className={styles.inputStyle}
                value={textInput.address}
                onChange={onChangeAddress}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center mb-4 w-full">
            <div className="w-full">
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

export default ProfileOrganisation;
