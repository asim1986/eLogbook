import { CSSTransition, SwitchTransition } from "react-transition-group";
import { useAppSelector } from "../hooks/store.hook";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import animate from "../styles/animate.module.css";
import styles from "../styles/Home.module.scss";
import { MdClose } from "react-icons/md";
import { useRef, useState } from "react";
import Link from "next/link";
import Links from "./Links";

export const Navbar = () => {
  const role = useAppSelector((state) => state.auth.userAdminData.user);
  const [active, setActive] = useState(false);
  const nodeRef = useRef<any>(null);
  const nodeRefBtn = useRef(null);

  return (
    <>
      <nav className={styles.nav}>
        <Link href={role === "Admin" ? '/admin/dashboard' : '/'}>
          <a className="inline-flex items-center mr-4 ml-5">
            <img
              src="../e-logbook logo.png"
              className="mr-2 h-6 sm:h-9 md:h-11 landscape:h-6"
              alt="Logo"
            />
            <span className="text-xl landscape:text-xl md:text-2xl text-white font-bold tracking-wide">
              E-LogBook
            </span>
          </a>
        </Link>

        <SwitchTransition mode={"out-in"}>
          <CSSTransition
            key={active ? "close" : "open"}
            timeout={400}
            nodeRef={nodeRefBtn}
            addEndListener={(done: () => void) => {
              nodeRefBtn.current?.addEventListener(
                "transitionend",
                done,
                false
              );
            }}
            classNames={animate.menubtn}
          >
            <button
              ref={nodeRefBtn}
              className="inline-flex p-3 rounded lg:hidden text-white ml-auto hover:text-white outline-none overflow-y-auto"
              onClick={() => setActive((prev) => !prev)}
            >
              {active ? (
                <MdClose className="w-8 h-8 md:h-10 p-0" />
              ) : (
                <HiOutlineMenuAlt3 className="w-8 h-8 md:h-10 p-0" />
              )}
            </button>
          </CSSTransition>
        </SwitchTransition>
        <div className="hidden w-full lg:inline-flex lg:flex-grow lg:w-auto">
          <Links />
        </div>
      </nav>
      <CSSTransition
        nodeRef={nodeRef}
        in={active}
        mountOnEnter
        unmountOnExit
        timeout={400}
        classNames={{
          enterActive: animate.navBarEnterActive,
          exitActive: animate.navBarExitActive,
        }}
      >
        <div
          id="lit"
          ref={nodeRef}
          className={`${active ? "" : "block"} ${styles.mobileLink}`}
        >
          <Links />
        </div>
      </CSSTransition>
    </>
  );
};
