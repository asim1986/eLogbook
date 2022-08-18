import Link from "next/link";
import { useState } from "react";
import styles from "../styles/Home.module.scss";
import { FaCaretDown } from "react-icons/fa";

export const Navbar = () => {
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <>
      <nav className={styles.nav}>
        <Link href="/">
          <a className="inline-flex items-center p-2 mr-4 ">
          <img
              src="./e-logbook logo.png"
              className="mr-3 h-6 sm:h-9"
              alt="E-LogBook Logo"
            />
            <span className="text-xl text-white font-bold tracking-wide">
              E-LogBook
            </span>
          </a>
        </Link>
        <button
          className=" inline-flex p-3 rounded lg:hidden text-white ml-auto hover:text-white outline-none"
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
        {/*Note that in this div we will use a ternary operator to decide whether or not to display the content of the div  */}
        <div className={`${active ? "" : "hidden"} w-full lg:inline-flex lg:flex-grow lg:w-auto`}>
          <div className={styles.nav_div}>
            <Link href="/">
              <a className={styles.nav_li}>Home</a>
            </Link>
            <Link href="/">
              <a className={styles.nav_li}>Blog</a>
            </Link>
            <Link href="/">
              <a className={styles.nav_li}>Login</a>
            </Link>
            <button
              className={styles.dropdownBtn}
              onClick={() => setDropDown((prev) => !prev)}
            >
              <div>Signup <FaCaretDown /></div> 
              {dropDown && (
                <ul className={styles.dropdown_content}>
                  <li>
                    <a href="#!">Organisation</a>
                  </li>
                  <li>
                    <a href="#!">Cordinator</a>
                  </li>
                  <li>
                    <a href="#!">Supervisor</a>
                  </li>
                  <li>
                    <a href="#!">Student</a>
                  </li>
                </ul>
              )}
            </button>
            <Link href="/">
              <a className={styles.nav_li}>About</a>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};
