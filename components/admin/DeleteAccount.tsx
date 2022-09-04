import GlobalContext from "../../context/GlobalContext";
import styles from "../../styles/Profile.module.scss";
import ManageProfile from "../ManageProfile";
import DeleteModal from "./DeleteModal";
import { useContext } from "react";

interface DeleteAccountType {
  user: string;
  style: any;
}

const DeleteAccount = ({ user, style }: DeleteAccountType) => {
  const { showDetail, setShowDetail } = useContext(GlobalContext);

  return (
    <>
      <DeleteModal
        show={showDetail}
        title={"Delete Account!"}
        content={"Are you sure you want to delete your account?"}
      />
      <div className={style}>
        <ManageProfile
          profile={user === "admin" ? "/admin/profile" : `/profile/${user}`}
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
