import styles from "../../styles/Signup.module.scss";
import { useContext, useState } from "react";
import { CSSTransition } from "react-transition-group";
import GlobalContext from "../../context/GlobalContext";
import animate from "../../styles/animate.module.css";
import { MdClose } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { CgTrashEmpty } from "react-icons/cg";
import { RiCheckFill } from "react-icons/ri";

const ViewLogbook = ({ show }: { show: boolean }) => {
  const { setShowDetail, setShowAddModal } = useContext(GlobalContext);
  const labels = [
    { title: "ID", value: 1661438735332 },
    {
      title: "Day",
      value: new Date("2022-08-25T23:00:00.000Z").toDateString(),
    },
    {
      title: "description",
      value:
        "Thank God for adding another year to my years. To Him be all the Glory and all the praise for what He is doing. Amen",
    },
    { title: "Label", value: "gray" },
    { title: "Date", value: new Date().toDateString() },
    { title: "Approved", value: true },
  ];

  const activities = [
    {
      title: "Birthday",
      description: "",
      label: "red",
      day: new Date("2022-08-25T23:00:00.000Z"),
      id: 1661438735332,
    },
  ];

  return (
    <>
      <CSSTransition
        mountOnEnter
        unmountOnExit
        in={show}
        timeout={{ enter: 400, exit: 1000 }}
        classNames={{
          enter: "",
          enterActive: animate.fadeEnterActive,
          exit: "",
          exitActive: animate.fadeExitActive,
        }}
      >
        <div className={styles.backDrop}></div>
      </CSSTransition>
      <CSSTransition
        mountOnEnter
        unmountOnExit
        in={show}
        timeout={{ enter: 400, exit: 1000 }}
        classNames={{
          enter: "",
          enterActive: animate.animateEnterActive,
          exit: "",
          exitActive: animate.animateExitActive,
        }}
      >
        <div className={styles.addStudent}>
          <div className="sm:p-5 lg:p-5">
            <div className="flex justify-between w-full">
              <div className="">
                <MdClose
                  onClick={() => setShowDetail(false)}
                  size={"1.5rem"}
                  className="cursor-pointer p-0 m-0 hover:text-red-500"
                />
              </div>
              <div className="flex justify-between mr-2">
                <FaEdit
                  size={"1.5rem"}
                  onClick={() => {
                    setShowDetail(false);
                    setShowAddModal(true);
                  }}
                  className="cursor-pointer mr-2 hover:text-blue-500"
                />
                <CgTrashEmpty
                  size={"1.5rem"}
                  className="cursor-pointer hover:text-red-500"
                />
              </div>
            </div>

            <h1>{activities[0].title}</h1>
            <div className="flex flex-row flex-wrap w-full mt-2">
              <div className={styles.passportSt}>
                <img src="../../images/image3.jpg" alt="diagram" />
              </div>
              <div className={styles.infoSection}>
                {labels.map((lbl, idx) => (
                  <div key={idx}>
                    <span className="text-gray-500 w-1/4 uppercase">
                      {lbl.title}
                    </span>
                    <span className="font-bold text-start w-3/4">
                      {lbl.title === "Label" ? (
                        <span
                          className={`bg-${lbl.value}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                        ></span>
                      ) : lbl.title === "Approved" ? (
                        lbl.value ? (
                          <span>
                            <RiCheckFill
                              className="text-white bg-green-500 w-5 h-5 rounded-full"
                              size={"1.2rem"}
                            />
                          </span>
                        ) : (
                          <span>
                            <MdClose
                              className="text-white bg-red-500 w-5 h-5 rounded-full"
                              size={"1.2rem"}
                            />
                          </span>
                        )
                      ) : (
                        <span>{lbl.value}</span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CSSTransition>
    </>
  );
};

export default ViewLogbook;
