import { FaRegBell } from "react-icons/fa";
import { RiUserSettingsLine } from "react-icons/ri";
import styles from "../styles/Dashboard.module.scss";
import Link from "next/link";

const DashHeader = ({ title }: { title: string }) => {
  return (
    <header className={styles.dashHeader}>
      <h1>{title}</h1>
      <div>
        <span>
          <FaRegBell size={"1.3rem"}  />
        </span>
        <span>
          <Link href="/admin/profile">
            <a>
              <RiUserSettingsLine size={"1.3rem"} />
            </a>
          </Link>
        </span>
        <span className={styles.username}>
          <div>
            <h3>Vicolas</h3>
            <p>admin</p>
          </div>
          <img src="../../images/Passport.jpg" className={styles.displayPic} />
        </span>
      </div>
    </header>
  );
};

export default DashHeader;
