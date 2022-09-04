import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import styles from "../styles/Profile.module.scss";
import ManageProfile from "./ManageProfile";
import "react-phone-number-input/style.css";
import Select from "react-select";
import { useState } from "react";

const ProfileStudent = () => {
  const [textInput, setTextInput] = useState({
    name: { firstName: "Vicolas", lastName: "Akoh" },
    email: "incrediblechamp1@gmail.com",
    phone: "",
    gender: "Male",
    institute: "Federal University Lokoja",
    address: "Adj New Government House, Rayfield, Jos",
    dept: "Computer Science",
    matric: "SCI17CSC031",
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

  const optionsPlace: OptionType = [{ value: "Upcoming", label: "Upcoming" }];

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

  return (
    <div className={styles.profiles}>
      <ManageProfile
        profile="/profile/student"
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
            <h1>Vicolas Akoh</h1>
            <h2>incrediblechamp1@gmail</h2>
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

        <form className="mt-4">
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
                  className={styles.select}
                  placeholder="Level"
                  onChange={() => {}}
                  value={optionsLevel}
                  styles={customStyles}
                />
              </div>
              <div className="w-full ml-2 md:ml-1">
                <Select
                id="long-value"
                instanceId="long-value"
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
                value={optionsPlace}
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
