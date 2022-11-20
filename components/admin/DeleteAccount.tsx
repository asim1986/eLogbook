import { successToastStyle, errorToastStyle } from "../../utils/styles.utils";
import { useAppDispatch, useAppSelector } from "../../hooks/store.hook";
import { DELETE_ORG } from "../../graphql/mutations/organisation";
import { DELETE_CORD } from "../../graphql/mutations/coordinator";
import { DELETE_SUP } from "../../graphql/mutations/supervisor";
import { DELETE_STUD } from "../../graphql/mutations/student";
import { DocumentNode, useMutation } from "@apollo/client";
import { DELETE_FILE } from "../../graphql/mutations/file";
import GlobalContext from "../../context/GlobalContext";
import { setRest } from "../../store/slice/auth.slice";
import styles from "../../styles/Profile.module.scss";
import toast, { Toaster } from "react-hot-toast";
import { useContext, useState } from "react";
import ManageProfile from "../ManageProfile";
import DeleteModal from "./DeleteModal";
import { useRouter } from "next/router";
import Loader from "../Loader";

interface DeleteAccountType {
  user: string;
  style: any;
}

const DeleteAccount = ({ user, style }: DeleteAccountType) => {
  const { showDetail, setShowDetail } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const logout = () => {
    dispatch(setRest());
    router.push("/login");
  };

  let userEmail: string = "";
  let userID: string = "";

  const role = useAppSelector(
    (state) =>
      state.auth?.userCoordData?.user ||
      state.auth?.userSupData?.user ||
      state.auth?.userStudData?.user ||
      state.auth?.userOrgData?.user
  );
  let mutationType: DocumentNode | null = null;

  switch (role) {
    case "Student":
      const emailStud = useAppSelector(
        (state) => state.auth.userStudData.email
      );
      const emailStudID = useAppSelector((state) => state.auth.userStudData.id);
      userEmail = emailStud;
      userID = emailStudID;
      mutationType = DELETE_STUD;
      break;
    case "Coordinator":
      const emailCoord = useAppSelector(
        (state) => state.auth.userCoordData.email
      );
      const emailCoordID = useAppSelector(
        (state) => state.auth.userCoordData.id
      );
      userEmail = emailCoord;
      userID = emailCoordID;
      mutationType = DELETE_CORD;
      break;
    case "Supervisor":
      const emailSup = useAppSelector((state) => state.auth.userSupData.email);
      const emailSupID = useAppSelector((state) => state.auth.userSupData.id);
      userEmail = emailSup;
      userID = emailSupID;
      mutationType = DELETE_SUP;
      break;
    case "Organisation":
      const emailOrg = useAppSelector((state) => state.auth.userOrgData.email);
      const emailID = useAppSelector((state) => state.auth.userOrgData.id);
      userEmail = emailOrg;
      userID = emailID;
      mutationType = DELETE_ORG;
      break;
  }

  const [deleteAccount, { loading }] = useMutation(mutationType, {
    onCompleted: (data) => {
      toast.success(
        data?.deleteOrganisation?.message ||
          data?.deleteStudent?.message ||
          data?.deleteCoordinator?.message ||
          data?.deleteSupervisor?.message,
        successToastStyle
      );
      setIsLoading(false);
      // Redirect to Login Page
      logout();  
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
      setIsLoading(false);
    },
  });

  const [deleteFile, { loading: loading_ }] = useMutation(DELETE_FILE, {
    onCompleted: (data) => {
      toast.success(data?.deleteFile?.message, successToastStyle);
      // Delete Account
      deleteAccount({
        variables: {
          emailInput: {
            email: userEmail,
          },
        },
      });
    },
    onError: ({ graphQLErrors, networkError }) => {
      try {
        if (graphQLErrors)
          graphQLErrors.forEach(({ message, locations, path }) => {
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            );
            console.log("MESSAGE ==> ", message);
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
        setIsLoading(false);
      }
    },
  });

  const onYesHandler = () => {
    if (loading || loading_) {
      setIsLoading(true);
    }
    deleteFile({
      variables: {
        deleteInput: userID,
      },
    });
  };

  return (
    <>
      <DeleteModal
        show={showDetail}
        title={"Delete Account!"}
        content={"Are you sure you want to delete your account?"}
        onYes={onYesHandler}
      />
      <Toaster position="top-center" reverseOrder={false} />
      {isLoading && <Loader show={true} />}
      <div className={style}>
        <ManageProfile
          profile={
            user === "admin"
              ? "/admin/profile"
              : `/profile/${role.toLowerCase()}`
          }
          change={
            user === "admin"
              ? "/admin/change-password"
              : "/profile/change-password"
          }
          delete={
            user === "admin"
              ? "/admin/delete-account"
              : "/profile/delete-account"
          }
        />

        <div className={styles.userProfile}>
          <div className={styles.deleteAccount}>
            <h1>Delete Account</h1>
            <p>
              Please note, that all the files you have created or saved will be
              permanently and completely deleted. And these files can not be
              recovered.
            </p>
            <button onClick={() => setShowDetail(true)}>Delete Account</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteAccount;
