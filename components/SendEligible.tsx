import { allInstitutions } from "../utils/institutions";
import styles from "../styles/Signup.module.scss";
import { useState } from "react";
import "react-phone-number-input/style.css";
import Select from "react-select";
import { customStyles } from "../utils/util";

const SendEligible = () => {
  const [textInput, setTextInput] = useState({
    supervisor: "",
    institute: "",
    other: "",
    level: "",
    dept: "",
    matric: "",
  });
  const [showInput, setShowInput] = useState(false);

  const onChangeHandlerMatric = (
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

  const onChangeHandlerSupervisor = (
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

  const onChangeHandlerOther = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      supervisor: prev.supervisor,
      institute: prev.institute,
      other: evt.target.value,
      level: prev.level,
      dept: prev.dept,
      matric: prev.matric,
    }));
  };

  const onChangeHandlerDept = (evt: React.ChangeEvent<HTMLInputElement>) => {
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

  const optionsLevel: OptionType = [
    { value: "ND1", label: "ND1" },
    { value: "NC2", label: "NC2" },
    { value: "300", label: "300" },
    { value: "400", label: "400" },
  ];

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
    setShowInput(option?.value === "Others" ? true : false);
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
    <section className={styles.hero}>
      <div className={styles.signupContainer}>
        <div className="p-2 sm:p-5 lg:p-5 w-full">
          <h1 className="font-bold text-center text-lg md:text-2xl">Send Eligible Student</h1>
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
                  onChange={onChangeHandlerSupervisor}
                />
              </div>
            </div>
            <div className="w-full">
              <div className="mb-4">
                <Select
                isClearable
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
                    onChange={onChangeHandlerOther}
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
                  onChange={onChangeHandlerDept}
                />
              </div>
              <div className="w-full mr-1">
                <Select
                  isClearable
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
                rows={7}
                placeholder="Matric Number(s)"
                className={styles.signupInput}
                value={textInput.matric}
                onChange={onChangeHandlerMatric}
              ></textarea>
            </div>
            <div className="flex justify-center p-0 m-0 mb-4 md:mb-0">
              <button className={styles.signupBtn} type="submit">
                <span className="flex justify-center items-center">Send</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SendEligible;
