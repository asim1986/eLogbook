import {
  FaBlog,
  FaBuilding,
  FaChalkboardTeacher,
  FaPowerOff,
  FaUserGraduate,
} from "react-icons/fa";
import { BiCheckShield, BiHomeAlt } from "react-icons/bi";
import { MdClose, MdSupervisedUserCircle } from "react-icons/md";
import styles from "../../styles/Dashboard.module.scss";
import GlobalContext from "../../context/GlobalContext";
import { IoChatbubblesOutline } from "react-icons/io5";
import { forwardRef, useContext } from "react";
import { RiBook2Line } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { useRouter } from "next/router";
import Link from "next/link";

type AsideType = { show: boolean; ref: string };

const Aside = forwardRef<HTMLDivElement, AsideType>(({ show }, ref) => {
  const router = useRouter();
  const { setShowSideBar } = useContext(GlobalContext);

  return (
    <aside ref={ref} className={`${show ? "" : "block"}  ${styles.aside}`}>
      {/* SlideBar close Arrow */}
      <span
        className={styles.showAsideBtn}
        onClick={() => {
          setShowSideBar(false);
        }}
      >
        <img src="../images/slideClose.png" className="m-0 h-20 sm:h-24" />
      </span>

      <div className="inline-flex justify-between items-center w-full">
        <div className="w-full">
          <Link href="/">
            <a className="inline-flex items-center p-2 mr-4">
              <img
                src="../../e-logbook logo.png"
                className="mr-2 h-6 sm:h-9"
                alt="Logo"
              />
              <span className="text-xl lit:text-sm text-white font-bold tracking-wide">
                E-LogBook
              </span>
            </a>
          </Link>
        </div>

        <div className="text-end" onClick={() => setShowSideBar(false)}>
          <MdClose className="p-0 m-0 lit:text-2xl text-3xl mr-2" />
        </div>
      </div>
      <div
        className={styles.sideBarBtnWrapper}
        onClick={() => {
          setShowSideBar(false);
        }}
      >
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
          <a
            className={[
              styles.sideBarBtn,
              router.pathname === "/admin/students" ? styles.active : "",
            ].join(" ")}
          >
            <FaUserGraduate size={"1.55rem"} />
            <span>Students</span>
          </a>
        </Link>
        <Link href="/admin/coordinators">
          <a
            className={[
              styles.sideBarBtn,
              router.pathname === "/admin/coordinators" ? styles.active : "",
            ].join(" ")}
          >
            <MdSupervisedUserCircle size={"1.7rem"} />
            <span>Coordinators</span>
          </a>
        </Link>
        <Link href="/admin/supervisors">
          <a
            className={[
              styles.sideBarBtn,
              router.pathname === "/admin/supervisors" ? styles.active : "",
            ].join(" ")}
          >
            <FaChalkboardTeacher size={"1.7rem"} />
            <span>Supervisors</span>
          </a>
        </Link>
        <Link href="/admin/organisations">
          <a
            className={[
              styles.sideBarBtn,
              router.pathname === "/admin/organisations" ? styles.active : "",
            ].join(" ")}
          >
            <FaBuilding size={"1.55rem"} />
            <span>Organisations</span>
          </a>
        </Link>
        <Link href="/admin/chats">
          <a
            className={[
              styles.sideBarBtn,
              router.pathname === "/admin/chats" ? styles.active : "",
            ].join(" ")}
          >
            <IoChatbubblesOutline size={"1.7rem"} />
            <span>Chat</span>
          </a>
        </Link>
        <Link href="/admin/eligibility">
          <a
            className={[
              styles.sideBarBtn,
              router.pathname === "/admin/eligibility" ? styles.active : "",
            ].join(" ")}
          >
            <BiCheckShield size={"1.7rem"} />
            <span>Eligibility</span>
          </a>
        </Link>
        <Link href="/admin/blogs">
          <a
            className={[
              styles.sideBarBtn,
              router.pathname === "/admin/blogs" ? styles.active : "",
            ].join(" ")}
          >
            <FaBlog size={"1.55rem"} />
            <span>Blog</span>
          </a>
        </Link>
        <Link href="/admin/logbook">
          <a
            className={[
              styles.sideBarBtn,
              router.pathname === "/admin/logbook" ? styles.active : "",
              router.pathname === "/admin/logbook/[logbookId]"
                ? styles.active
                : "",
            ].join(" ")}
          >
            <RiBook2Line size={"1.7rem"} />
            <span>Logbook</span>
          </a>
        </Link>
        <Link href="/admin/profile">
          <a
            className={[
              styles.sideBarBtn,
              router.pathname === "/admin/profile" ? styles.active : "",
              router.pathname === "/admin/change-password" ? styles.active : "",
              router.pathname === "/admin/delete-account" ? styles.active : "",
            ].join(" ")}
          >
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
});

Aside.displayName = "Aside";

export default Aside;
