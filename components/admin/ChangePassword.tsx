import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { IoPersonRemoveOutline } from "react-icons/io5";
import styles from "../../styles/Profile.module.scss";
import { RiUserSettingsLine } from "react-icons/ri";
import { VscShield } from "react-icons/vsc";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";

const ChangePassword = () => {
  const router = useRouter();
  const [textInput, setTextInput] = useState({
    old: "",
    new: "",
    renew: "",
  });
  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    renew: false,
  });

  const onChangeOldPassword = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      old: evt.target.value,
      new: prev.new,
      renew: prev.renew,
    }));
  };

  const onChangeNewPassword = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      old: prev.old,
      new: evt.target.value,
      renew: prev.renew,
    }));
  };

  const onChangeConfirmNewPassword = (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTextInput((prev) => ({
      old: prev.old,
      new: prev.new,
      renew: evt.target.value,
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
        <h1>Change Password</h1>

        <form className="mt-4">
          <div className="mb-4 w-full">
            <div className={styles.passwordInputCh}>
              <label htmlFor="old">Enter Old Password</label>
              <input
                required
                type={showPassword.old ? "text" : "password"}
                name="old"
                id="old"
                placeholder="Old Password"
                className={styles.inputStyle}
                value={textInput.old}
                onChange={onChangeOldPassword}
              />
              <button
                type="button"
                onClick={() =>
                  setShowPassword((prev) => ({
                    old: !prev.old,
                    new: prev.new,
                    renew: prev.renew,
                  }))
                }
              >
                {showPassword.old ? (
                  <AiFillEyeInvisible size="1.5rem" />
                ) : (
                  <AiFillEye size="1.5rem" />
                )}
              </button>
            </div>
          </div>

          <div className="flex flex-row justify-between mb-2 w-full">
            <div className={styles.passwordInputCh}>
              <label htmlFor="new">Enter New Password</label>
              <input
                required
                type={showPassword.new ? "text" : "password"}
                name="new"
                id="new"
                placeholder="New Password"
                className={styles.inputStyle}
                value={textInput.new}
                onChange={onChangeNewPassword}
              />
              <button
                type="button"
                onClick={() =>
                  setShowPassword((prev) => ({
                    old: prev.old,
                    new: !prev.new,
                    renew: prev.renew,
                  }))
                }
              >
                {showPassword.new ? (
                  <AiFillEyeInvisible size="1.5rem" />
                ) : (
                  <AiFillEye size="1.5rem" />
                )}
              </button>
            </div>
            <div className={styles.passwordInputCh}>
              <label htmlFor="renew">Confirm New Password</label>
              <input
                required
                type={showPassword.renew ? "text" : "password"}
                name="renew"
                id="renew"
                placeholder="New Password"
                className={styles.inputStyle}
                value={textInput.renew}
                onChange={onChangeConfirmNewPassword}
              />
              <button
                type="button"
                onClick={() =>
                  setShowPassword((prev) => ({
                    old: prev.old,
                    new: prev.new,
                    renew: !prev.renew,
                  }))
                }
              >
                {showPassword.renew ? (
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

export default ChangePassword;
