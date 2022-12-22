import { successToastStyle, errorToastStyle } from "../../utils/styles.utils";
import { CLOUD_DEL_FILE, DELETE_FILE } from "../../graphql/mutations/file";
import { useAppDispatch, useAppSelector } from "../../hooks/store.hook";
import { DeleteAccountType } from "../../interfaces/comp.interface";
import { DELETE_ORG } from "../../graphql/mutations/organisation";
import { DELETE_CORD } from "../../graphql/mutations/coordinator";
import { DELETE_SUP } from "../../graphql/mutations/supervisor";
import { DELETE_STUD } from "../../graphql/mutations/student";
import { DocumentNode, useMutation } from "@apollo/client";
import GlobalContext from "../../context/GlobalContext";
import { setRest } from "../../store/slice/auth.slice";
import styles from "../../styles/Profile.module.scss";
import constants from "../../config/constant.config";
import { client } from "../../graphql/apolloClient";
import toast, { Toaster } from "react-hot-toast";
import { useContext, useState } from "react";
import ManageProfile from "../ManageProfile";
import DeleteModal from "./DeleteModal";
import { useRouter } from "next/router";
import Loader from "../Loader";

const DeleteAccount = ({ user, style }: DeleteAccountType) => {
  const { showDetail, setShowDetail } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(false);
  let mutationType: DocumentNode | null = null;
  const dispatch = useAppDispatch();
  const { dev, prod } = constants;
  const router = useRouter();
  let userEmail: string = "";
  let userID: string = "";

  const role = useAppSelector(
    (state) =>
      state.auth?.userCoordData?.user ||
      state.auth?.userSupData?.user ||
      state.auth?.userStudData?.user ||
      state.auth?.userOrgData?.user
  );

  const avatar = useAppSelector(
    (state) =>
      state.auth?.userCoordData?.avatar ||
      state.auth?.userSupData?.avatar ||
      state.auth?.userStudData?.avatar ||
      state.auth?.userOrgData?.logo
  );

  const logout = async () => {
    // Reset Apollo Cache
    client.resetStore();
    dispatch(setRest());
    router.push("/login");
  };

  const studData = useAppSelector((state) => state.auth.userStudData);
  const coordData = useAppSelector((state) => state.auth.userCoordData);
  const supData = useAppSelector((state) => state.auth.userSupData);
  const orgData = useAppSelector((state) => state.auth.userOrgData);

  switch (role) {
    case "Student":      
      userEmail = studData.email;
      userID = studData.id;
      mutationType = DELETE_STUD;
      break;
    case "Coordinator":
      userEmail = coordData.email;
      userID = coordData.id;
      mutationType = DELETE_CORD;
      break;
    case "Supervisor":
      userEmail = supData.email;
      userID = supData.id;
      mutationType = DELETE_SUP;
      break;
    case "Organisation":
      userEmail = orgData.email;
      userID = orgData.id;
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
      localStorage.removeItem("logBookData");
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

  const [delCloudFile, { loading: cLoad, reset: cReset }] = useMutation(
    CLOUD_DEL_FILE,
    {
      onCompleted: (data) => {
        toast.success(data?.deleteFromCloudinary?.message, successToastStyle);
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
    }
  );

  const onYesHandler = () => {
    if (loading || loading_ || cLoad) {
      setIsLoading(true);
    }
    // PRODUCTION ENVIRONMENT >>>>>>>>>>>>>>>>>>>>>>>>>
    if (prod) {
      delCloudFile({
        variables: {
          input: {
            oldImgURL: avatar,
          },
        },
      });
      return;
    }    
    // DEVELOPMENT ENVIRONMENT >>>>>>>>>>>>>>>>>>>>>>>
    if (dev) {
      deleteFile({
        variables: {
          deleteInput: {
            id: userID,
          },
        },
      });
    }
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
