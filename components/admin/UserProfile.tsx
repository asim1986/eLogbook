import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { IoPersonRemoveOutline } from "react-icons/io5";
import styles from "../../styles/Profile.module.scss";
import { RiUserSettingsLine } from "react-icons/ri";
import { VscShield } from "react-icons/vsc";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const UserProfile = () => {
  const router = useRouter();
  const [textInput, setTextInput] = useState({
    name: { firstName: "", lastName: "" },
    email: "",
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
    <div className={styles.profile}>
      <div className={styles.manageProfile}>
        <h1>Manage Profile</h1>
        <Link href="/admin/profile">
          <button
            className={[
              styles.userPasswordBtn,
              router.pathname === "/admin/profile" ? styles.userPswBtn : "",
            ].join(" ")}
          >
            <span>
              <RiUserSettingsLine size={"1.3rem"} />
            </span>
            User Profile
          </button>
        </Link>
        <Link href="/admin/change-password">
          <button
            className={[
              styles.userPasswordBtn,
              router.pathname === "/admin/change-password"
                ? styles.userPswBtn
                : "",
            ].join(" ")}
          >
            <span>
              <VscShield size={"1.3rem"} />
            </span>
            Change Password
          </button>
        </Link>
        <Link href="/admin/delete-account">
          <button
            className={[
              styles.userPasswordBtn,
              router.pathname === "/admin/delete-account"
                ? styles.userPswBtn
                : "",
            ].join(" ")}
          >
            <span>
              <IoPersonRemoveOutline size={"1.3rem"} />
            </span>
            Delete Account
          </button>
        </Link>
      </div>

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
          <div className="flex flex-row justify-center mb-4 w-full">
            <div className="w-full mr-1">
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
            <div className="w-full ml-1">
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

          <div className="flex flex-row justify-center mb-2 w-full">
            <div className="w-full mb-4 mr-2">
              <input
                required
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className={styles.inputStyle}
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
                className={styles.inputStyle}
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
