import { IoPersonRemoveOutline } from "react-icons/io5";
import styles from "../styles/Profile.module.scss";
import { RiUserSettingsLine } from "react-icons/ri";
import "react-phone-number-input/style.css";
import { VscShield } from "react-icons/vsc";
import { useRouter } from "next/router";
import Link from "next/link";

interface LinkType {
    profile: string,
    change: string,
    delete: string
}

const ManageProfile = (props: LinkType) => {
  const router = useRouter();

  return (
    <div className={styles.manageProfile}>
      <h1>Manage Profile</h1>
      <Link href={props.profile}>
        <button
          className={[
            styles.userPasswordBtn,
            router.pathname === props.profile ? styles.userPswBtn : "",
          ].join(" ")}
        >
          <span>
            <RiUserSettingsLine size={"1.3rem"} />
          </span>
          User Profile
        </button>
      </Link>
      <Link href={props.change}>
        <button
          className={[
            styles.userPasswordBtn,
            router.pathname === props.change
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
      <Link href={props.delete}>
        <button
          className={[
            styles.userPasswordBtn,
            router.pathname === props.delete
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
  );
};

export default ManageProfile;
