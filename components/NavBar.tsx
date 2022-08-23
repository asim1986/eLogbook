import Link from "next/link";
import { useState } from "react";
import styles from "../styles/Home.module.scss";
import {
  FaBuilding,
  FaCaretDown,
  FaChalkboardTeacher,
  FaPowerOff,
} from "react-icons/fa";
import { useRouter } from "next/router";
import { RiBook2Fill, RiChat3Fill, RiUserSettingsLine } from "react-icons/ri";
import { MdSupervisedUserCircle } from "react-icons/md";

export const Navbar = () => {
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState({ user: false, profile: false, chat: false });
  const router = useRouter();

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <>
      <nav className={styles.nav}>
        <Link href="/">
          <a className="inline-flex items-center p-2 mr-4">
            <img
              src="../e-logbook logo.png"
              className="mr-3 h-6 sm:h-9"
              alt="Logo"
            />
            <span className="text-xl text-white font-bold tracking-wide">
              E-LogBook
            </span>
          </a>
        </Link>
        <button
          className="inline-flex p-3 rounded lg:hidden text-white ml-auto hover:text-white outline-none"
          onClick={handleClick}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <div
          className={`${
            active ? "" : "hidden"
          } w-full lg:inline-flex lg:flex-grow lg:w-auto`}
        >
          <div className={styles.nav_div}>
            {router.pathname !== "/dashboard" ? (
              <>
                <Link href="/">
                  <a
                    className={[
                      styles.nav_li,
                      router.pathname === "/" ? styles.active : "",
                    ].join(" ")}
                  >
                    Home
                  </a>
                </Link>
                <Link href="/blog/blog-post">
                  <a
                    className={[
                      styles.nav_li,
                      router.pathname.split("/")[1] === "blog"
                        ? styles.active
                        : "",
                    ].join(" ")}
                  >
                    Blog
                  </a>
                </Link>
                <Link href="/login">
                  <a
                    className={[
                      styles.nav_li,
                      router.pathname === "/login" ? styles.active : "",
                    ].join(" ")}
                  >
                    Login
                  </a>
                </Link>
                <button
                  onClick={() =>
                    setDropDown((prev) => ({
                      user: !prev.user,
                      profile: prev.profile,
                      chat: prev.profile
                    }))
                  }
                  className={[
                    styles.dropdownBtn,
                    router.pathname.split("/")[1] === "signup"
                      ? styles.active
                      : "",
                  ].join(" ")}
                >
                  <div>
                    Signup <FaCaretDown />
                  </div>
                  {dropDown.user && (
                    <ul className={styles.dropdown_content}>
                      <li>
                        <Link href="/signup/organisation">
                          <a
                            className={[
                              styles.dropdownBtn,
                              router.pathname.split("/")[2] === "organisation"
                                ? styles.active
                                : "",
                            ].join(" ")}
                          >
                            <div className="m-0 p-0">Organisation</div>
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/signup/cordinator">
                          <a
                            className={[
                              styles.dropdownBtn,
                              router.pathname.split("/")[2] === "cordinator"
                                ? styles.active
                                : "",
                            ].join(" ")}
                          >
                            <div className="m-0 p-0">Cordinator</div>
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/signup/supervisor">
                          <a
                            className={[
                              styles.dropdownBtn,
                              router.pathname.split("/")[2] === "supervisor"
                                ? styles.active
                                : "",
                            ].join(" ")}
                          >
                            <div className="m-0 p-0">Supervisor</div>
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/eligible">
                          <a
                            className={[
                              styles.dropdownBtn,
                              router.pathname.split("/")[2] === "student"
                                ? styles.active
                                : "",
                            ].join(" ")}
                          >
                            <div className="m-0 p-0">Student</div>
                          </a>
                        </Link>
                      </li>
                    </ul>
                  )}
                </button>
                <Link href="/about">
                  <a
                    className={[
                      styles.nav_li,
                      router.pathname === "/about" ? styles.active : "",
                    ].join(" ")}
                  >
                    About
                  </a>
                </Link>
              </>
            ) : (
              <>
                <Link href="/profile">
                  <a
                    className={[
                      styles.nav_li,
                      router.pathname === "/login" ? styles.active : "",
                    ].join(" ")}
                  >
                    <div className="w-full flex items-center">
                      <RiBook2Fill />
                      <span className="pl-1">LogBook</span>
                    </div>
                  </a>
                </Link>
                <button
                  onClick={() =>
                    setDropDown((prev) => ({
                      user: prev.user,
                      profile: prev.profile,
                      chat: !prev.chat
                    }))
                  }
                  className={styles.dropdownBtn}
                >
                  <div className="w-full">
                    <RiChat3Fill />
                    <span className="px-1">Chat</span> <FaCaretDown />
                  </div>
                  {dropDown.chat && (
                    <ul className={styles.dropdown_content}>
                      <li>
                        <Link href="/user/profile">
                          <a
                            className={[
                              styles.dropdownBtn,
                              router.pathname.split("/")[2] === "organisation"
                                ? styles.active
                                : "",
                            ].join(" ")}
                          >
                            <div className="p-0 m-0">
                              <FaBuilding />{" "}
                              <span className="pl-1">Organisation</span>{" "}
                            </div>
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/">
                          <a
                            className={[
                              styles.dropdownBtn,
                              router.pathname.split("/")[2] === "cordinator"
                                ? styles.active
                                : "",
                            ].join(" ")}
                          >
                            <div className="p-0 m-0">
                              <FaChalkboardTeacher />{" "}
                              <span className="pl-1">Supervisor</span>{" "}
                            </div>
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/">
                          <a
                            className={[
                              styles.dropdownBtn,
                              router.pathname.split("/")[2] === "cordinator"
                                ? styles.active
                                : "",
                            ].join(" ")}
                          >
                            <div className="p-0 m-0">
                              <MdSupervisedUserCircle />{" "}
                              <span className="pl-1">Cordinator</span>{" "}
                            </div>
                          </a>
                        </Link>
                      </li>
                    </ul>
                  )}
                </button>
                <Link href="/profile">
                  <a
                    className={[
                      styles.nav_li,
                      router.pathname === "/login" ? styles.active : "",
                    ].join(" ")}
                  >
                    <div className="w-full flex items-center">
                      <RiUserSettingsLine />
                      <span className="pl-1">Profile</span>
                    </div>
                  </a>
                </Link>
                <button
                  onClick={() =>
                    setDropDown((prev) => ({
                      user: prev.user,
                      profile: !prev.profile,
                      chat: prev.chat
                    }))
                  }
                  className={styles.dropdownBtn}
                >
                  <div className="w-full">
                    <img
                      src="../images/thumbnail.png"
                      className={styles.displayPic}
                    />
                    <span className="pl-2">Vicolas</span> <FaCaretDown />
                  </div>
                  {dropDown.profile && (
                    <ul className={styles.dropdown_content}>
                      <li>
                        <Link href="/user/profile">
                          <a
                            className={[
                              styles.dropdownBtn,
                              router.pathname.split("/")[2] === "organisation"
                                ? styles.active
                                : "",
                            ].join(" ")}
                          >
                            <div className="p-0 m-0">
                              <RiUserSettingsLine />{" "}
                              <span className="pl-1">Profile</span>{" "}
                            </div>
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/">
                          <a
                            className={[
                              styles.dropdownBtn,
                              router.pathname.split("/")[2] === "cordinator"
                                ? styles.active
                                : "",
                            ].join(" ")}
                          >
                            <div className="p-0 m-0">
                              <FaPowerOff />{" "}
                              <span className="pl-1">Logout</span>{" "}
                            </div>
                          </a>
                        </Link>
                      </li>
                    </ul>
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
