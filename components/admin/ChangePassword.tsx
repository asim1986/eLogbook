import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import styles from "../../styles/Profile.module.scss";
import ManageProfile from "../ManageProfile";
import { useEffect, useState } from "react";
import { useApolloClient, useMutation } from "@apollo/client";
import { CHANGE_PASSWORD } from "../../graphql/mutations/changePsw";
import toast, { Toaster } from "react-hot-toast";
import { errorToastStyle, successToastStyle } from "../../utils/styles.utils";
import { setOrgAuth, setRest } from "../../store/slice/auth.slice";
import { useRouter } from "next/router";
import { IAuthOrganSlice } from "../../interfaces/slice.interface";
import { useAppDispatch, useAppSelector } from "../../hooks/store.hook";
import Loader from "../Loader";
import { ChangePasswordType } from "../../interfaces/comp.interface";
import { client } from "../../graphql/apolloClient";

const ChangePassword = ({ user, style }: ChangePasswordType) => {
  const [textInput, setTextInput] = useState({
    old: "",
    new: "",
    renew: "",
  });

  const role = useAppSelector(
    (state) =>
      state.auth?.userCoordData?.user ||
      state.auth?.userSupData?.user ||
      state.auth?.userStudData?.user ||
      state.auth?.userOrgData?.user
  );
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  let userId: string = "";

  const studData = useAppSelector((state) => state.auth.userStudData);
  const coordData = useAppSelector((state) => state.auth.userCoordData);
  const supData = useAppSelector((state) => state.auth.userSupData);
  const orgData = useAppSelector((state) => state.auth.userOrgData);

  switch (role) {
    case "Student":
      userId = studData.id;
      break;
    case "Supervisor":
      userId = supData.id;
      break;
    case "Coordinator":
      userId = coordData.id;
      break;
    case "Organisation":
      userId = orgData.id;
      break;
  }

  // console.log("USERID +++ => ", userId);
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

  const logout = async () => {
    // Reset Apollo Cache
    client.resetStore();
    dispatch(setRest());
    router.push("/login");
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

  const [changePsw, { loading, reset }] = useMutation(CHANGE_PASSWORD, {
    onCompleted: (data) => {
      toast.success(data?.changePassword?.message, successToastStyle);
      setTextInput({
        old: "",
        new: "",
        renew: "",
      });
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

  const onSubmitHandler = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (loading) {
      setIsLoading(true);
    }
    changePsw({
      variables: {
        input: {
          id: userId,
          password: textInput.old,
          con_password: textInput.renew,
          new_password: textInput.new,
        },
      },
    });
  };

  return (
    <div className={style}>
      <Toaster position="top-center" reverseOrder={false} />
      {loading && <Loader show={true} />}
      <ManageProfile
        profile={user === "admin" ? "/admin/profile" : `/profile/${role?.toLowerCase()}`}
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

        <form className="mt-4" onSubmit={onSubmitHandler}>
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
