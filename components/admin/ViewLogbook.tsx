import { IViewLogbook } from "../../interfaces/viewlog.interface";
import GlobalContext from "../../context/GlobalContext";
import { CSSTransition } from "react-transition-group";
import animate from "../../styles/animate.module.css";
import constants from "../../config/constant.config";
import styles from "../../styles/Signup.module.scss";
import { CgTrashEmpty } from "react-icons/cg";
import { RiCheckFill } from "react-icons/ri";
import { useContext, useRef } from "react";
import BackBlurDrop from "../BackBlurDrop";
import { MdClose } from "react-icons/md";
import { FaEdit } from "react-icons/fa";


const ViewLogbook = ({ show, isAdmin, data }: IViewLogbook) => {
  const nodeRef = useRef<any>(null);
  const { prod, dev, beHost } = constants;
  const { setShowDetail, setShowAddModal } = useContext(GlobalContext);
  const labels = [
    { title: "ID", value: data?.id },
    {
      title: "Day",
      value: new Date(`${data?.day}`).toDateString(),
    },
    {
      title: "Description",
      value: data?.description,
    },
    { title: "Label", value: data?.label },
    { title: "Date", value: new Date().toDateString() },
    { title: "Approved", value: data?.approved },
  ];

  const activities = [
    {
      title: data?.title,
      description: "",
      label: "red",
      day: new Date("2022-08-25T23:00:00.000Z"),
      id: 1661438735332,
    },
  ];

  return (
    <>
      <BackBlurDrop show={show} style={true} isAdmin={isAdmin} />
      <CSSTransition
        nodeRef={nodeRef}
        mountOnEnter
        unmountOnExit
        in={show}
        timeout={{ enter: 400, exit: 1000 }}
        classNames={{
          enterActive: animate.animateEnterActive,
          exitActive: animate.animateExitActive,
        }}
      >
        <div
          ref={nodeRef}
          className={`${!isAdmin ? styles.addStudentUser : styles.addStudent}`}
        >
          <div className="sm:p-5 lg:p-5">
            <div className="flex justify-between w-full">
              <div className="">
                <MdClose
                  onClick={() => setShowDetail(false)}
                  className="cursor-pointer mt-2 ml-3 md:m-0 md:p-0 text-2xl md:text-3xl"
                />
              </div>
              <div className="flex justify-between mr-2 mt-2 md:mt-0">
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
            <div className="flex flex-col md:flex-row items-center md:items-start flex-wrap w-full mt-2 p-3 md:p-1">
              {data?.diagram && (
                <div className={styles.passportSt}>
                  <img
                    src={dev ? data?.diagram : data?.diagram && `${beHost}${data?.diagram}`}
                    alt="diagram"
                  />
                </div>
              )}
              <div className={styles.infoSection}>
                {labels.map((lbl, i) => (
                  <div key={i.toString()}>
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
