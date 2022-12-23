import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useAppSelector } from "../../hooks/store.hook";
import styles from "../../styles/Profile.module.scss";
import ManageProfile from "../ManageProfile";
import { useState } from "react";

const UserProfile = (props: any) => {
  const adminData = useAppSelector((state) => state.auth.userAdminData);
  const { firstName, lastName, avatar, email } = adminData;

  const [textInput, setTextInput] = useState({
    name: { firstName: `${firstName}`, lastName: `${lastName}` },
    email: `${email}`,
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
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
      email: evt.target.value,
      password: prev.password,
    }));
  };

  const onChangeHandlerLast = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      name: {
        firstName: prev.name.firstName,
        lastName: evt.target.value,
      },
      email: evt.target.value,
      password: prev.password,
    }));
  };

  const onChangeHandlerEmail = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      name: {
        firstName: prev.name.firstName,
        lastName: prev.name.lastName,
      },
      email: evt.target.value,
      password: prev.password,
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
      password: evt.target.value,
    }));
  };

  const onFileUpload = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const mainFile = evt.target.files;
    if (mainFile.length !== 0) {
      setSelectedFile({
        file: mainFile[0],
        isUploaded: true,
        img: URL.createObjectURL(mainFile[0]),
      });
    }
  };

  const resetImage = () => {
    setSelectedFile((prev) => ({
      file: null,
      isUploaded: false,
      img: null,
    }));
  };

  return (
    <div className={props.style}>
      <ManageProfile
        profile="/admin/profile"
        change="/admin/change-password"
        delete="/admin/delete-account"
      />

      <div className={styles.userProfile}>
        <h1>User Profile</h1>
        <div className={styles.userImg}>
          <img
            src={
              selectedFile.img
                ? selectedFile.img
                : avatar
                ? avatar
                : "../images/thumbnail.png"
            }
            alt="passport"
          />
          <div>
            <h1>{`${firstName} ${lastName}`}</h1>
            <h2>{`${email}`}</h2>
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
          <div className="flex flex-col md:flex-row justify-between mb-3 w-full">
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
            <div className="w-full mt-3 md:mt-0 md:ml-1">
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

          <div className="flex flex-col md:flex-row justify-between mb-2 md:mb-3 w-full">
            <div className="w-full mb-3">
              <input
                required
                readOnly
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className={styles.inputStyle}
                value={textInput.email}
                onChange={onChangeHandlerEmail}
              />
            </div>
          </div>

          <div className="flex justify-center p-0 m-0">
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

export default UserProfile;
