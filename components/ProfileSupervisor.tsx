import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import styles from "../styles/Profile.module.scss";
import ManageProfile from "./ManageProfile";
import "react-phone-number-input/style.css";
import Select from "react-select";
import { useState } from "react";
import { customStyles } from "../utils/util";

const ProfileSupervisor = () => {
  const [textInput, setTextInput] = useState({
    name: { firstName: "Olamide", lastName: "Adebayo" },
    email: "oladebayo@fulokoja.edu.ng",
    phone: "",
    gender: "Male",
    institute: "Federal University Lokoja",
    address: "Adj New Government House, Rayfield, Jos",
    dept: "Computer Science",
    staffId: "FUL153233AB",
  });

  const [selectedFile, setSelectedFile] = useState({
    file: null,
    isUploaded: false,
    img: null,
  });

  const onChangeFirstName = (evt: React.ChangeEvent<HTMLInputElement>) => {
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
      staffId: prev.staffId,
    }));
  };

  const onChangeLastName = (evt: React.ChangeEvent<HTMLInputElement>) => {
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
      staffId: prev.staffId,
    }));
  };

  const onChangePhone = (value: string | undefined) => {
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
      staffId: prev.staffId,
    }));
  };

  const onChangeAddress = (evt: React.ChangeEvent<HTMLInputElement>) => {
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
      staffId: prev.staffId,
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

  type OptionType = { label: string; value: string }[];

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
        staffId: prev.staffId,
      }));
    }
  };

  return (
    <div className={styles.profiles}>
      <ManageProfile
        profile="/profile/supervisor"
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
            <h1>Olamide Adebayo</h1>
            <h2>oladebayo@fulokoja.edu.ng</h2>
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
                onChange={onChangeFirstName}
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
                onChange={onChangeLastName}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center mb-4 w-full">
            <div className="w-full mr-1">
              <input
                required
                placeholder="Staff ID"
                name="staffId"
                type="text"
                className={styles.inputStyle}
                value={textInput.staffId}
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
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className={styles.inputStyle}
                value={textInput.email}
                readOnly
              />
            </div>
            <div className="w-full">
              <Select
                options={optionsGender}
                defaultValue={optionsGender[0]}
                className={styles.select}
                placeholder="Gender"
                onChange={selectGender}
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

export default ProfileSupervisor;
