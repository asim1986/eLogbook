import { RiBook2Fill, RiChat3Fill, RiUserSettingsLine } from "react-icons/ri";
import { FaCaretDown, FaPowerOff } from "react-icons/fa";
import { CSSTransition } from "react-transition-group";
import { TbActivityHeartbeat } from "react-icons/tb";
import { useAppSelector } from "../hooks/store.hook";
import animate from "../styles/animate.module.css";
import styles from "../styles/Home.module.scss";
import { BiCheckShield } from "react-icons/bi";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import Link from "next/link";

const Links = () => {
  const router = useRouter();
  const nodeRef = useRef<any>(null);
  const nodeRefLogout = useRef<any>(null);
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const token  = useAppSelector((state) => state.auth.token);

  const [dropDown, setDropDown] = useState({
    user: false,
    profile: false,
    chat: false,
  });
  return (
    <div className={styles.nav_div}>
      {!(isAuth && token ) ? (
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
                router.pathname.split("/")[1] === "blog" ? styles.active : "",
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
          <a className={styles.nav_li}>
            <button
              onClick={() =>
                setDropDown((prev) => ({
                  user: !prev.user,
                  profile: prev.profile,
                  chat: prev.profile,
                }))
              }
              className={[
                styles.dropdownBtn,
                router.pathname.split("/")[1] === "signup" ? styles.active : "",
              ].join(" ")}
            >
              <div>
                Signup <FaCaretDown />
              </div>
              <CSSTransition
                nodeRef={nodeRef}
                mountOnEnter
                unmountOnExit
                in={dropDown.user}
                timeout={400}
                classNames={{
                  enterActive: animate.signupEnterActive,
                  exitActive: animate.signupExitActive,
                }}
              >
                <ul ref={nodeRef} className={styles.dropdown_content}>
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
                    <Link href="/signup/coordinator">
                      <a
                        className={[
                          styles.dropdownBtn,
                          router.pathname.split("/")[2] === "coordinator"
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
              </CSSTransition>
            </button>
          </a>

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
          <Link href="/logbook">
            <a
              className={[
                styles.nav_li,
                router.pathname === "/logbook" ? styles.active : "",
              ].join(" ")}
            >
              <div className="w-full flex items-center">
                <RiBook2Fill />
                <span className="pl-1">Logbook</span>
              </div>
            </a>
          </Link>
          <Link href="/chats">
            <a
              className={[
                styles.nav_li,
                router.pathname === "/chats" ? styles.active : "",
              ].join(" ")}
            >
              <div className="w-full flex items-center">
                <RiChat3Fill />
                <span className="pl-1">Chat</span>
              </div>
            </a>
          </Link>
          <Link href="/activities">
            <a
              className={[
                styles.nav_li,
                router.pathname === "/activities" ? styles.active : "",
              ].join(" ")}
            >
              <div className="w-full flex items-center">
                <TbActivityHeartbeat />
                <span className="pl-1">Activities</span>
              </div>
            </a>
          </Link>
          <Link href="/eligible/send">
            <a
              className={[
                styles.nav_li,
                router.pathname === "/eligible/send" ? styles.active : "",
              ].join(" ")}
            >
              <div className="w-full flex items-center">
                <BiCheckShield />
                <span className="pl-1">Eligible</span>
              </div>
            </a>
          </Link>
          <Link href="/profile/student">
            <a
              className={[
                styles.nav_li,
                router.pathname === "/profile" ? styles.active : "",
              ].join(" ")}
            >
              <div className="w-full flex items-center">
                <RiUserSettingsLine />
                <span className="pl-1">Profile</span>
              </div>
            </a>
          </Link>
          <a className={styles.nav_li}>
            <button
              onClick={() =>
                setDropDown((prev) => ({
                  user: prev.user,
                  profile: !prev.profile,
                  chat: prev.chat,
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
              <CSSTransition
                nodeRef={nodeRefLogout}
                mountOnEnter
                unmountOnExit
                in={dropDown.profile}
                timeout={400}
                classNames={{
                  enterActive: animate.signupEnterActive,
                  exitActive: animate.signupExitActive,
                }}
              >
                <ul ref={nodeRefLogout} className={styles.dropdown_content}>
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
                          <FaPowerOff /> <span className="pl-1">Logout</span>{" "}
                        </div>
                      </a>
                    </Link>
                  </li>
                </ul>
              </CSSTransition>
            </button>
          </a>
        </>
      )}
    </div>
  );
};

export default Links;
