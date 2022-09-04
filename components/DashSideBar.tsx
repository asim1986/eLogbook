import Link from "next/link";
import {
  FaBlog,
  FaBuilding,
  FaChalkboardTeacher,
  FaPowerOff,
  FaUserGraduate,
} from "react-icons/fa";
import { BiCheckShield, BiHomeAlt } from "react-icons/bi";
import { IoChatbubblesOutline } from "react-icons/io5";
import { MdSupervisedUserCircle } from "react-icons/md";
import { RiBook2Line } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import styles from "../styles/Dashboard.module.scss";
import { useRouter } from "next/router";


const DashSideBar = () => {
  const router = useRouter();

  return (
    <aside className={styles.aside}>
      <div>
        <Link href="/">
          <a className="inline-flex items-center p-2 mr-4">
            <img
              src="../../e-logbook logo.png"
              className="mr-3 h-6 sm:h-9"
              alt="Logo"
            />
            <span className="text-xl text-white font-bold tracking-wide">
              E-LogBook
            </span>
          </a>
        </Link>
      </div>
      <div className={styles.sideBarBtnWrapper}>
        <Link href="/admin">
          <a
            className={[
              styles.sideBarBtn,
              router.pathname === "/admin" ? styles.active : "",
            ].join(" ")}
          >
            <BiHomeAlt size={"1.55rem"} />
            <span>Dashboard</span>
          </a>
        </Link>
        <Link href="/admin/students">
          <a className={[
              styles.sideBarBtn,
              router.pathname === "/admin/students" ? styles.active : "",
            ].join(" ")}>
            <FaUserGraduate size={"1.55rem"} />
            <span>Students</span>
          </a>
        </Link>
        <Link href="/admin/cordinators">
          <a className={[
              styles.sideBarBtn,
              router.pathname === "/admin/cordinators" ? styles.active : "",
            ].join(" ")}>
            <MdSupervisedUserCircle size={"1.7rem"} />
            <span>Coordinators</span>
          </a>
        </Link>
        <Link href="/admin/supervisors">
          <a className={[
              styles.sideBarBtn,
              router.pathname === "/admin/supervisors" ? styles.active : "",
            ].join(" ")}>
            <FaChalkboardTeacher size={"1.7rem"} />
            <span>Supervisors</span>
          </a>
        </Link>
        <Link href="/admin/organisations">
          <a className={[
              styles.sideBarBtn,
              router.pathname === "/admin/organisations" ? styles.active : "",
            ].join(" ")}>
            <FaBuilding size={"1.55rem"} />
            <span>Organisations</span>
          </a>
        </Link>
        <Link href="/admin/chats">
          <a className={[
              styles.sideBarBtn,
              router.pathname === "/admin/chats" ? styles.active : "",
            ].join(" ")}>
            <IoChatbubblesOutline size={"1.7rem"} />
            <span>Chat</span>
          </a>
        </Link>
        <Link href="/admin/eligibility">
          <a className={[
              styles.sideBarBtn,
              router.pathname === "/admin/eligibility" ? styles.active : "",
            ].join(" ")}>
            <BiCheckShield size={"1.7rem"} />
            <span>Eligibility</span>
          </a>
        </Link>
        <Link href="/admin/blogs">
          <a className={[
              styles.sideBarBtn,
              router.pathname === "/admin/blogs" ? styles.active : "",
            ].join(" ")}>
            <FaBlog size={"1.55rem"} />
            <span>Blog</span>
          </a>
        </Link>
        <Link href="/admin/logbook">
          <a className={[
              styles.sideBarBtn,
              router.pathname === "/admin/logbook" ? styles.active : "",
              router.pathname === "/admin/logbook/[logbookId]" ? styles.active : "",
            ].join(" ")}>
            <RiBook2Line size={"1.7rem"} />
            <span>Logbook</span>
          </a>
        </Link>
        <Link href="/admin/profile">
          <a className={[
              styles.sideBarBtn,
              router.pathname === "/admin/profile" ? styles.active : "",
              router.pathname === "/admin/change-password" ? styles.active : "",
              router.pathname === "/admin/delete-account" ? styles.active : "",

            ].join(" ")}>
            <CgProfile size={"1.7rem"} />
            <span>Profile</span>
          </a>
        </Link>
        <Link href="/" replace={true}>
          <a className={styles.sideBarBtn}>
            <FaPowerOff size={"1.5rem"} />
            <span>Logout</span>
          </a>
        </Link>
      </div>
    </aside>
  );
};

export default DashSideBar;
