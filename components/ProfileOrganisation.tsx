import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import styles from "../styles/Profile.module.scss";
import ManageProfile from "./ManageProfile";
import "react-phone-number-input/style.css";
import { useState } from "react";

const ProfileOrganisation = () => {
  const [textInput, setTextInput] = useState({
    name: "nHub Foundation",
    type: "Information Technology",
    address: "3rd Floor TAEN Building Along Old Airport Road, Jos",
    people: "10",
    phone: "",
    email: "solabayo@nhubfoundation.com",
  });

  const [selectedFile, setSelectedFile] = useState({
    file: null,
    isUploaded: false,
    img: null,
  });

  const onChangeName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      name: evt.target.value,
      type: prev.type,
      address: prev.address,
      people: prev.people,
      phone: prev.phone,
      email: prev.email
    }));
  };

  const onChangeType = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      name: prev.name,
      type: evt.target.value,
      address: prev.address,
      people: prev.people,
      phone: prev.phone,
      email: prev.email
    }));
  };

const onChangeAddress = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      name: prev.name,
      type: prev.type,
      address: evt.target.value,
      people: prev.people,
      phone: prev.phone,
      email: prev.email
    }));
  };

  const onChangePeople = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      name: prev.name,
      type: prev.type,
      address: prev.address,
      people: evt.target.value,
      phone: prev.phone,
      email: prev.email
    }));
  };

  const onChangePhone = (value: string | undefined) => {
    setTextInput((prev) => ({
      name: prev.name,
      type: prev.type,
      address: prev.address,
      people: prev.people,
      phone: value,
      email: prev.email
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

  return (
    <div className={styles.profiles}>
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
              selectedFile.img ? selectedFile.img : "../images/thumbnail.png"
            }
            alt="passport"
          />
          <div>
            <h1>nHub Foundation</h1>
            <h2>solabayo@nhubfoundation</h2>
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
              <input
                required
                placeholder="Business Type Undertaken"
                name="type"
                type="text"
                className={styles.inputStyle}
                value={textInput.type}
                onChange={onChangeType}
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
