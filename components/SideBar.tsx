import Link from "next/link";
import { useState } from "react";
import styles from "../styles/Home.module.scss";
import { FaCaretDown } from "react-icons/fa";
import { useRouter } from "next/router";

export const SideBar = () => {
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <>
      <aside
        id="sidebar"
        className="fixed inset-0 z-20 flex-none h-full w-72 lg:static lg:h-auto lg:overflow-y-visible lg:pt-0 lg:w-48 lg:block hidden"
        aria-labelledby="sidebar-label"
      >
        <h4 id="sidebar-label" className="sr-only">
          Browse docs
        </h4>
        <div
          id="navWrapper"
          className="overflow-y-auto z-20 h-full bg-white scrolling-touch max-w-2xs lg:h-[calc(100vh-3rem)] lg:block lg:sticky top:24 lg:top-28 dark:bg-gray-900 lg:mr-0"
        >
          <nav
            id="nav"
            className="pt-16 px-1 pl-3 lg:pl-0 lg:pt-2 font-normal text-base lg:text-sm pb-10 lg:pb-20 sticky?lg:h-(screen-18)"
            aria-label="Docs navigation"
          >
            <ul className="mb-0 list-unstyled">
              <li className="mt-8">
                <h5 className="mb-2 text-sm font-semibold tracking-wide text-gray-900 uppercase lg:text-xs dark:text-white">
                  Getting started
                </h5>
                <ul className="py-1 list-unstyled fw-normal small">
                  <li>
                    <a
                      href="/docs/getting-started/introduction/"
                      data-sidebar-item=""
                      className="py-2 transition-colors duration-200 relative block hover:text-gray-900 text-gray-500 dark:text-gray-400 dark:hover:text-white  text-blue-700 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-500"
                      aria-current="page"
                    >
                      Introduction{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/docs/getting-started/quickstart/"
                      data-sidebar-item=""
                      className="py-2 transition-colors duration-200 relative block hover:text-gray-900 text-gray-500 dark:text-gray-400 dark:hover:text-white "
                    >
                      Quickstart{" "}
                    </a>
                  </li>
                </ul>
              </li>
              <li className="mt-8">
                <h5 className="mb-2 text-sm font-semibold tracking-wide text-gray-900 uppercase lg:text-xs dark:text-white">
                  Customize
                </h5>
                <ul className="py-1 list-unstyled fw-normal small">
                  <li>
                    <a
                      href="/docs/customize/configuration/"
                      data-sidebar-item=""
                      className="py-2 transition-colors duration-200 relative block hover:text-gray-900 text-gray-500 dark:text-gray-400 dark:hover:text-white "
                    >
                      Configuration{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/docs/customize/dark-mode/"
                      data-sidebar-item=""
                      className="py-2 transition-colors duration-200 relative block hover:text-gray-900 text-gray-500 dark:text-gray-400 dark:hover:text-white "
                    >
                      Dark mode{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/docs/customize/theming/"
                      data-sidebar-item=""
                      className="py-2 transition-colors duration-200 relative block hover:text-gray-900 text-gray-500 dark:text-gray-400 dark:hover:text-white "
                    >
                      Theming{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/docs/customize/colors/"
                      data-sidebar-item=""
                      className="py-2 transition-colors duration-200 relative block hover:text-gray-900 text-gray-500 dark:text-gray-400 dark:hover:text-white "
                    >
                      Colors{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/docs/customize/icons/"
                      data-sidebar-item=""
                      className="py-2 transition-colors duration-200 relative block hover:text-gray-900 text-gray-500 dark:text-gray-400 dark:hover:text-white "
                    >
                      Icons{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/docs/customize/optimization/"
                      data-sidebar-item=""
                      className="py-2 transition-colors duration-200 relative block hover:text-gray-900 text-gray-500 dark:text-gray-400 dark:hover:text-white "
                    >
                      Optimization{" "}
                    </a>
                  </li>
                </ul>
              </li>
              <li className="mt-8">
                <h5 className="mb-2 text-sm font-semibold tracking-wide text-gray-900 uppercase lg:text-xs dark:text-white">
                  Components
                </h5>
                <ul className="py-1 list-unstyled fw-normal small">
                  <li>
                    <a
                      href="/docs/components/alerts/"
                      data-sidebar-item=""
                      className="py-2 transition-colors duration-200 relative block hover:text-gray-900 text-gray-500 dark:text-gray-400 dark:hover:text-white "
                    >
                      Alerts{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/docs/components/accordion/"
                      data-sidebar-item=""
                      className="py-2 transition-colors duration-200 relative block hover:text-gray-900 text-gray-500 dark:text-gray-400 dark:hover:text-white "
                    >
                      Accordion{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/docs/components/avatar/"
                      data-sidebar-item=""
                      className="py-2 transition-colors duration-200 relative block hover:text-gray-900 text-gray-500 dark:text-gray-400 dark:hover:text-white "
                    >
                      Avatar{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/docs/components/badge/"
                      data-sidebar-item=""
                      className="py-2 transition-colors duration-200 relative block hover:text-gray-900 text-gray-500 dark:text-gray-400 dark:hover:text-white "
                    >
                      Badge{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/docs/components/breadcrumb/"
                      data-sidebar-item=""
                      className="py-2 transition-colors duration-200 relative block hover:text-gray-900 text-gray-500 dark:text-gray-400 dark:hover:text-white "
                    >
                      Breadcrumb{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/docs/components/buttons/"
                      data-sidebar-item=""
                      className="py-2 transition-colors duration-200 relative block hover:text-gray-900 text-gray-500 dark:text-gray-400 dark:hover:text-white "
                    >
                      Buttons{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/docs/components/button-group/"
                      data-sidebar-item=""
                      className="py-2 transition-colors duration-200 relative block hover:text-gray-900 text-gray-500 dark:text-gray-400 dark:hover:text-white "
                    >
                      Button group{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/docs/components/card/"
                      data-sidebar-item=""
                      className="py-2 transition-colors duration-200 relative block hover:text-gray-900 text-gray-500 dark:text-gray-400 dark:hover:text-white "
                    >
                      Card{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/docs/components/carousel/"
                      data-sidebar-item=""
                      className="py-2 transition-colors duration-200 relative block hover:text-gray-900 text-gray-500 dark:text-gray-400 dark:hover:text-white "
                    >
                      Carousel{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/docs/components/dropdowns/"
                      data-sidebar-item=""
                      className="py-2 transition-colors duration-200 relative block hover:text-gray-900 text-gray-500 dark:text-gray-400 dark:hover:text-white "
                    >
                      Dropdowns{" "}
                      <span className="bg-blue-100 text-blue-800 text-2xs font-semibold ml-2 px-1.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-900">
                        NEW
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/docs/components/forms/"
                      data-sidebar-item=""
                      className="py-2 transition-colors duration-200 relative block hover:text-gray-900 text-gray-500 dark:text-gray-400 dark:hover:text-white "
                    >
                      Forms{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/docs/components/list-group/"
                      data-sidebar-item=""
                      className="py-2 transition-colors duration-200 relative block hover:text-gray-900 text-gray-500 dark:text-gray-400 dark:hover:text-white "
                    >
                      List Group{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/docs/components/typography/"
                      data-sidebar-item=""
                      className="py-2 transition-colors duration-200 relative block hover:text-gray-900 text-gray-500 dark:text-gray-400 dark:hover:text-white "
                    >
                      Typography{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/docs/components/modal/"
                      data-sidebar-item=""
                      className="py-2 transition-colors duration-200 relative block hover:text-gray-900 text-gray-500 dark:text-gray-400 dark:hover:text-white "
                    >
                      Modal{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/docs/components/tabs/"
                      data-sidebar-item=""
                      className="py-2 transition-colors duration-200 relative block hover:text-gray-900 text-gray-500 dark:text-gray-400 dark:hover:text-white "
                    >
                      Tabs{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/docs/components/navbar/"
                      data-sidebar-item=""
                      className="py-2 transition-colors duration-200 relative block hover:text-gray-900 text-gray-500 dark:text-gray-400 dark:hover:text-white "
                    >
                      Navbar{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/docs/components/mega-menu/"
                      data-sidebar-item=""
                      className="py-2 transition-colors duration-200 relative block hover:text-gray-900 text-gray-500 dark:text-gray-400 dark:hover:text-white "
                    >
                      Mega menu{" "}
                      <span className="bg-blue-100 text-blue-800 text-2xs font-semibold ml-2 px-1.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-900">
                        NEW
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/docs/components/footer/"
                      data-sidebar-item=""
                      className="py-2 transition-colors duration-200 relative block hover:text-gray-900 text-gray-500 dark:text-gray-400 dark:hover:text-white "
                    >
                      Footer{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/docs/components/sidebar/"
                      data-sidebar-item=""
                      className="py-2 transition-colors duration-200 relative block hover:text-gray-900 text-gray-500 dark:text-gray-400 dark:hover:text-white "
                    >
                      Sidebar{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/docs/components/drawer/"
                      data-sidebar-item=""
                      className="py-2 transition-colors duration-200 relative block hover:text-gray-900 text-gray-500 dark:text-gray-400 dark:hover:text-white "
                    >
                      Drawer{" "}
                      <span className="bg-blue-100 text-blue-800 text-2xs font-semibold ml-2 px-1.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-900">
                        NEW
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/docs/components/skeleton/"
                      data-sidebar-item=""
                      className="py-2 transition-colors duration-200 relative block hover:text-gray-900 text-gray-500 dark:text-gray-400 dark:hover:text-white "
                    >
                      Skeleton{" "}
                      <span className="bg-blue-100 text-blue-800 text-2xs font-semibold ml-2 px-1.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-900">
                        NEW
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/docs/components/pagination/"
                      data-sidebar-item=""
                      className="py-2 transition-colors duration-200 relative block hover:text-gray-900 text-gray-500 dark:text-gray-400 dark:hover:text-white "
                    >
                      Pagination{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/docs/components/rating/"
                      data-sidebar-item=""
                      className="py-2 transition-colors duration-200 relative block hover:text-gray-900 text-gray-500 dark:text-gray-400 dark:hover:text-white "
                    >
                      Rating{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/docs/components/timeline/"
                      data-sidebar-item=""
                      className="py-2 transition-colors duration-200 relative block hover:text-gray-900 text-gray-500 dark:text-gray-400 dark:hover:text-white "
                    >
                      Timeline{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/docs/components/video/"
                      data-sidebar-item=""
                      className="py-2 transition-colors duration-200 relative block hover:text-gray-900 text-gray-500 dark:text-gray-400 dark:hover:text-white "
                    >
                      Video{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/docs/components/kbd/"
                      data-sidebar-item=""
                      className="py-2 transition-colors duration-200 relative block hover:text-gray-900 text-gray-500 dark:text-gray-400 dark:hover:text-white "
                    >
                      KBD{" "}
                      <span className="bg-blue-100 text-blue-800 text-2xs font-semibold ml-2 px-1.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-900">
                        NEW
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/docs/components/progress/"
                      data-sidebar-item=""
                      className="py-2 transition-colors duration-200 relative block hover:text-gray-900 text-gray-500 dark:text-gray-400 dark:hover:text-white "
                    >
                      Progress{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/docs/components/popover/"
                      data-sidebar-item=""
                      className="py-2 transition-colors duration-200 relative block hover:text-gray-900 text-gray-500 dark:text-gray-400 dark:hover:text-white "
                    >
                      Popover{" "}
                      <span className="bg-blue-100 text-blue-800 text-2xs font-semibold ml-2 px-1.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-900">
                        NEW
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/docs/components/tables/"
                      data-sidebar-item=""
                      className="py-2 transition-colors duration-200 relative block hover:text-gray-900 text-gray-500 dark:text-gray-400 dark:hover:text-white "
                    >
                      Tables{" "}
                      <span className="bg-blue-100 text-blue-800 text-2xs font-semibold ml-2 px-1.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-900">
                        NEW
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/docs/components/spinner/"
                      data-sidebar-item=""
                      className="py-2 transition-colors duration-200 relative block hover:text-gray-900 text-gray-500 dark:text-gray-400 dark:hover:text-white "
                    >
                      Spinner{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/docs/components/toast/"
                      data-sidebar-item=""
                      className="py-2 transition-colors duration-200 relative block hover:text-gray-900 text-gray-500 dark:text-gray-400 dark:hover:text-white "
                    >
                      Toast{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/docs/components/tooltips/"
                      data-sidebar-item=""
                      className="py-2 transition-colors duration-200 relative block hover:text-gray-900 text-gray-500 dark:text-gray-400 dark:hover:text-white "
                    >
                      Tooltips{" "}
                    </a>
                  </li>
                </ul>
              </li>
              <li className="mt-8">
                <h5 className="mb-2 text-sm font-semibold tracking-wide text-gray-900 uppercase lg:text-xs dark:text-white">
                  Forms
                </h5>
                <ul className="py-1 list-unstyled fw-normal small">
                  <li>
                    <a
                      href="/docs/forms/input-field/"
                      data-sidebar-item=""
                      className="py-2 transition-colors duration-200 relative block hover:text-gray-900 text-gray-500 dark:text-gray-400 dark:hover:text-white "
                    >
                      Input Field{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/docs/forms/file-input/"
                      data-sidebar-item=""
                      className="py-2 transition-colors duration-200 relative block hover:text-gray-900 text-gray-500 dark:text-gray-400 dark:hover:text-white "
                    >
                      File Input{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/docs/forms/search-input/"
                      data-sidebar-item=""
                      className="py-2 transition-colors duration-200 relative block hover:text-gray-900 text-gray-500 dark:text-gray-400 dark:hover:text-white "
                    >
                      Search Input{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/docs/forms/select/"
                      data-sidebar-item=""
                      className="py-2 transition-colors duration-200 relative block hover:text-gray-900 text-gray-500 dark:text-gray-400 dark:hover:text-white "
                    >
                      Select{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/docs/forms/textarea/"
                      data-sidebar-item=""
                      className="py-2 transition-colors duration-200 relative block hover:text-gray-900 text-gray-500 dark:text-gray-400 dark:hover:text-white "
                    >
                      Textarea{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/docs/forms/checkbox/"
                      data-sidebar-item=""
                      className="py-2 transition-colors duration-200 relative block hover:text-gray-900 text-gray-500 dark:text-gray-400 dark:hover:text-white "
                    >
                      Checkbox{" "}
                      <span className="bg-blue-100 text-blue-800 text-2xs font-semibold ml-2 px-1.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-900">
                        NEW
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/docs/forms/radio/"
                      data-sidebar-item=""
                      className="py-2 transition-colors duration-200 relative block hover:text-gray-900 text-gray-500 dark:text-gray-400 dark:hover:text-white "
                    >
                      Radio{" "}
                      <span className="bg-blue-100 text-blue-800 text-2xs font-semibold ml-2 px-1.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-900">
                        NEW
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/docs/forms/toggle/"
                      data-sidebar-item=""
                      className="py-2 transition-colors duration-200 relative block hover:text-gray-900 text-gray-500 dark:text-gray-400 dark:hover:text-white "
                    >
                      Toggle{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/docs/forms/range/"
                      data-sidebar-item=""
                      className="py-2 transition-colors duration-200 relative block hover:text-gray-900 text-gray-500 dark:text-gray-400 dark:hover:text-white "
                    >
                      Range{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/docs/forms/floating-label/"
                      data-sidebar-item=""
                      className="py-2 transition-colors duration-200 relative block hover:text-gray-900 text-gray-500 dark:text-gray-400 dark:hover:text-white "
                    >
                      Floating Label{" "}
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
};
