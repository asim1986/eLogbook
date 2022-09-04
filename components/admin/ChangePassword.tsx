import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import styles from "../../styles/Profile.module.scss";
import ManageProfile from "../ManageProfile";
import { useState } from "react";

interface ChangePasswordType {
  user: string;
  style: any;
}

const ChangePassword = ({ user, style }: ChangePasswordType) => {
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
    <div className={style}>
      <ManageProfile
        profile={user === "admin" ? "/admin/profile" : `/profile/${user}`}
        change={
          user === "admin"
            ? "/admin/change-password"
            : "/profile/change-password"
        }
        delete={
          user === "admin" ? "/admin/delete-account" : "/profile/delete-account"
        }
      />

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

          <div className="flex flex-col md:flex-row justify-between mb-2 w-full">
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
