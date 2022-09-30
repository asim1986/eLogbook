import { allInstitutions } from "../../utils/institutions";
import GlobalContext from "../../context/GlobalContext";
import { CSSTransition } from "react-transition-group";
import animate from "../../styles/animate.module.css";
import styles from "../../styles/Signup.module.scss";
import { useContext, useState, useRef } from "react";
import { customStyles } from "../../utils/util";
import "react-phone-number-input/style.css";
import BackBlurDrop from "../BackBlurDrop";
import { level } from "../../utils/levels";
import { MdClose } from "react-icons/md";
import Select from "react-select";

const AddEligible = ({ show }: { show: boolean }) => {
  const nodeRef = useRef<any>(null);

  const [textInput, setTextInput] = useState({
    supervisor: "",
    institute: "",
    other: "",
    level: "",
    dept: "",
    matric: "",
  });
  const [showInput, setShowInput] = useState(false);
  const { setShowAddModal } = useContext(GlobalContext);

  const onChangeMatric = (
    evt: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTextInput((prev) => ({
      supervisor: prev.supervisor,
      institute: prev.institute,
      other: prev.other,
      level: prev.level,
      dept: prev.dept,
      matric: evt.target.value,
    }));
  };

  const onChangeSupervisor = (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTextInput((prev) => ({
      supervisor: evt.target.value,
      institute: prev.institute,
      other: prev.other,
      level: prev.level,
      dept: prev.dept,
      matric: prev.matric,
    }));
  };

  const onChangeOther = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      supervisor: prev.supervisor,
      institute: prev.institute,
      other: evt.target.value,
      level: prev.level,
      dept: prev.dept,
      matric: prev.matric,
    }));
  };

  const onChangeDept = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      supervisor: prev.supervisor,
      institute: prev.institute,
      other: prev.other,
      level: prev.level,
      dept: evt.target.value,
      matric: prev.matric,
    }));
  };

  type OptionType = { label: string; value: string }[];

  const options: OptionType = allInstitutions.map((inst) => {
    return { value: inst, label: inst };
  });

  const optionsLevel: OptionType = level;

  const selectInstitution = (option: OptionType | null | any) => {
    if (option) {
      setTextInput((prev) => ({
        supervisor: prev.supervisor,
        institute: option.value,
        other: prev.other,
        level: prev.level,
        dept: prev.dept,
        matric: prev.matric,
      }));
    }
    setShowInput(option.value === "Others" ? true : false);
  };

  const selectLevel = (option: OptionType | null | any) => {
    if (option) {
      setTextInput((prev) => ({
        supervisor: prev.supervisor,
        institute: prev.institute,
        other: prev.other,
        level: option.value,
        dept: prev.dept,
        matric: prev.matric,
      }));
    }
  };

  return (
    <>
      <BackBlurDrop show={show} />
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
        <div ref={nodeRef} className={styles.addStudent}>
          <div className="sm:p-5 lg:p-5">
            <MdClose
              onClick={() => setShowAddModal(false)}
              className="cursor-pointer mt-3 ml-3 md:m-0 md:p-0 text-2xl md:text-3xl"
            />
            <h1>Add Eligible Student</h1>
            <form className="mt-2">
              <div className="flex justify-between w-full mb-4">
                <div className="w-full">
                  <input
                    required
                    placeholder="Supervisor"
                    name="supervisor"
                    type="text"
                    className={styles.signupInput}
                    value={textInput.supervisor}
                    onChange={onChangeSupervisor}
                  />
                </div>
              </div>
              <div className="w-full">
                <div className="mb-4">
                  <Select
                    options={options}
                    className={styles.select}
                    placeholder="Select Institution"
                    onChange={selectInstitution}
                    styles={customStyles}
                  />
                </div>
              </div>
              {showInput && (
                <div className="mb-4">
                  <div className="w-full">
                    <input
                      required
                      placeholder="Institution Name"
                      name="other"
                      type="text"
                      className={styles.signupInput}
                      value={textInput.other}
                      onChange={onChangeOther}
                    />
                  </div>
                </div>
              )}
              <div className="flex flex-col mb-4 space-y-4 md:flex-row md:space-y-0 md:space-x-2">
                <div className="w-full">
                  <input
                    required
                    placeholder="Department"
                    name="dept"
                    type="text"
                    className={styles.signupInput}
                    value={textInput.dept}
                    onChange={onChangeDept}
                  />
                </div>
                <div className="w-full mr-1">
                  <Select
                    options={optionsLevel}
                    className={styles.select}
                    placeholder="Level"
                    onChange={selectLevel}
                    styles={customStyles}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="matric" className="text-gray-400">
                  Enter multiple matric number separated with comma
                </label>
                <textarea
                  required
                  name="matric"
                  id="matric"
                  rows={6}
                  placeholder="Matric Number(s)"
                  className={styles.signupInput}
                  value={textInput.matric}
                  onChange={onChangeMatric}
                ></textarea>
              </div>
              <div className="flex justify-center p-0 m-0 mb-4 md:mb-0">
                <button className={styles.signupBtnSt} type="submit">
                  <span className="flex justify-center items-center">Add</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </CSSTransition>
    </>
  );
};

export default AddEligible;
