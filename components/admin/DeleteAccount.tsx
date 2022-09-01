import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { IoPersonRemoveOutline } from "react-icons/io5";
import styles from "../../styles/Profile.module.scss";
import { RiUserSettingsLine } from "react-icons/ri";
import { VscShield } from "react-icons/vsc";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const DeleteAccount = () => {
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
        <div className={styles.deleteAccount}>
          <h1>Delete Account</h1>
          <p>
            Please note, that all the files you have created or saved will be
            permanently and completely deleted. And these files can not be
            recovered.
          </p>
          <button>Delete Account</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;