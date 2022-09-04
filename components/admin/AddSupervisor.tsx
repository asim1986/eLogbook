import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { allInstitutions } from "../../utils/institutions";
import GlobalContext from "../../context/GlobalContext";
import { CSSTransition } from "react-transition-group";
import animate from "../../styles/animate.module.css";
import styles from "../../styles/Signup.module.scss";
import { useContext, useState } from "react";
import "react-phone-number-input/style.css";
import { MdClose } from "react-icons/md";
import Select from "react-select";

const AddSupervisor = ({ show }: { show: boolean }) => {
  const [textInput, setTextInput] = useState({
    name: { firstName: "", lastName: "" },
    email: "",
    phone: "",
    password: "",
    institute: "",
    gender: "",
    staff: "",
    dept: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { setShowAddModal } = useContext(GlobalContext);
  const [selectedFile, setSelectedFile] = useState({
    file: null,
    isUploaded: false,
    img: null,
  });

  const onChangeHandlerFirst = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      name: {
        firstName: evt.target.value,
        lastName: prev.name.lastName,
      },
      email: evt.target.value,
      phone: prev.phone,
      password: prev.password,
      institute: prev.institute,
      gender: prev.gender,
      staff: prev.staff,
      dept: prev.dept,
    }));
  };

  const onChangeHandlerLast = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      name: {
        firstName: prev.name.firstName,
        lastName: evt.target.value,
      },
      email: evt.target.value,
      phone: prev.phone,
      password: prev.password,
      institute: prev.institute,
      gender: prev.gender,
      staff: prev.staff,
      dept: prev.dept,
    }));
  };

  const onChangeHandlerEmail = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      name: {
        firstName: prev.name.firstName,
        lastName: prev.name.lastName,
      },
      email: evt.target.value,
      phone: prev.phone,
      password: prev.password,
      institute: prev.institute,
      gender: prev.gender,
      staff: prev.staff,
      dept: prev.dept,
    }));
  };

  const onChangeHandlerPhone = (value: string | undefined) => {
    setTextInput((prev) => ({
      name: {
        firstName: prev.name.firstName,
        lastName: prev.name.lastName,
      },
      email: prev.email,
      phone: value,
      password: prev.password,
      institute: prev.institute,
      gender: prev.gender,
      staff: prev.staff,
      dept: prev.dept,
    }));
  };

  const onChangeHandlerPassword = (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTextInput((prev) => ({
      name: {
        firstName: prev.name.firstName,
        lastName: prev.name.lastName,
      },
      email: prev.email,
      phone: prev.phone,
      password: evt.target.value,
      institute: prev.institute,
      gender: prev.gender,
      staff: prev.staff,
      dept: prev.dept,
    }));
  };

  const onChangeHandlerDept = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      name: {
        firstName: prev.name.firstName,
        lastName: prev.name.lastName,
      },
      email: prev.email,
      phone: prev.phone,
      password: prev.password,
      institute: prev.institute,
      gender: prev.gender,
      staff: prev.staff,
      dept: evt.target.value,
    }));
  };

  const onChangeHandlerStaff = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      name: {
        firstName: prev.name.firstName,
        lastName: prev.name.lastName,
      },
      email: prev.email,
      phone: prev.phone,
      password: prev.password,
      institute: prev.institute,
      gender: prev.gender,
      staff: evt.target.value,
      dept: prev.dept,
    }));
  };

  const onFileUpload = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const mainFile = evt.target.files;
    console.log(mainFile[0]);
    setSelectedFile({
      file: mainFile[0],
      isUploaded: true,
      img: URL.createObjectURL(mainFile[0]),
    });
  };

  type OptionType = { label: string; value: string }[];

  const options: OptionType = allInstitutions.map((inst) => {
    return { value: inst, label: inst };
  });

  const optionsGender: OptionType = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  const selectInstitution = (option: OptionType | null | any) => {
    setTextInput((prev) => ({
      name: {
        firstName: prev.name.firstName,
        lastName: prev.name.lastName,
      },
      email: prev.email,
      phone: prev.phone,
      password: prev.password,
      institute: option.value,
      gender: prev.gender,
      staff: prev.staff,
      dept: prev.dept,
    }));
  };

  const selectGender = (option: OptionType | null | any) => {
    setTextInput((prev) => ({
      name: {
        firstName: prev.name.firstName,
        lastName: prev.name.lastName,
      },
      email: prev.email,
      phone: prev.phone,
      password: prev.password,
      institute: prev.institute,
      gender: option.value,
      staff: prev.staff,
      dept: prev.dept,
    }));
  };

  const customStyles = {
    option: (defaultStyles: any, state: any) => ({
      ...defaultStyles,
      backgroundColor: "#1f2937",
      cursor: "pointer",
      ":hover": { backgroundColor: "#1d4ed8" },
      ":active": {
        ...defaultStyles[":active"],
        backgroundColor: state.isSelected ? "red" : "blue",
      },
    }),
    singleValue: (defaultStyles: any, state: any) => ({
      ...defaultStyles,
      lineHeight: ".5rem",
      padding: ".90rem 0",
      color: "#eaeaea",
      width: "100%",
    }),
  };

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
        <div
          onClick={() => setShowAddModal(false)}
          className={styles.backDrop}
        ></div>
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
            <MdClose
              onClick={() => setShowAddModal(false)}
              className="cursor-pointer mt-3 ml-3 md:m-0 md:p-0 text-2xl md:text-3xl"
            />
            <h1>Add a Supervisor Account</h1>
            <form className="mt-2">
              <div className="flex space-y-4 mb-4 justify-between flex-col md:flex-row md:space-y-0">
                <div className="w-full">
                  <input
                    required
                    placeholder="First Name"
                    name="firstName"
                    type="text"
                    className={styles.signupInput}
                    value={textInput.name.firstName}
                    onChange={onChangeHandlerFirst}
                  />
                </div>
                <div className="w-full md:ml-2">
                  <input
                    required
                    placeholder="Last Name"
                    name="lastName"
                    type="text"
                    className={styles.signupInput}
                    value={textInput.name.lastName}
                    onChange={onChangeHandlerLast}
                  />
                </div>
              </div>
              <div className="flex space-y-4 mb-4 justify-between flex-col md:flex-row md:space-y-0">
                <div className="w-full">
                  <input
                    required
                    type="text"
                    name="staffID"
                    id="staffID"
                    placeholder="Staff ID"
                    className={styles.signupInput}
                    value={textInput.staff}
                    onChange={onChangeHandlerStaff}
                  />
                </div>
                <div className="w-full md:ml-2">
                  <PhoneInput
                    international
                    countryCallingCodeEditable={false}
                    placeholder="Phone Number"
                    className={styles.phoneInput}
                    defaultCountry="NG"
                    value={textInput.phone}
                    onChange={onChangeHandlerPhone}
                    error={
                      textInput.phone
                        ? isValidPhoneNumber(textInput.phone)
                          ? undefined
                          : "Invalid phone number"
                        : "Phone number required"
                    }
                  />
                </div>
              </div>
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
                <div className="w-full">
                  <Select
                    options={optionsGender}
                    className={styles.select}
                    placeholder="Gender"
                    onChange={selectGender}
                    styles={customStyles}
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
              <div className="mb-4">
                <input
                  required
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className={styles.signupInput}
                  value={textInput.email}
                  onChange={onChangeHandlerEmail}
                />
              </div>
              <div className={styles.passwordInput}>
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Password"
                  className={styles.signupInput}
                  value={textInput.password}
                  onChange={onChangeHandlerPassword}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <AiFillEyeInvisible size="1.5rem" />
                  ) : (
                    <AiFillEye size="1.5rem" />
                  )}
                </button>
              </div>
              <div className="flex items-start justify-between mb-3">
                <div
                  className={[
                    styles.uploadAvatarBtn,
                    selectedFile.isUploaded ? styles.fileUpload : "",
                  ].join(" ")}
                >
                  <label>
                    <input
                      type="file"
                      name="avatar"
                      id="avatar"
                      accept="image/png, image/jpg, image/jpeg"
                      onChange={onFileUpload}
                    />
                    {selectedFile.isUploaded
                      ? "File Uploaded"
                      : "Upload Passport"}
                  </label>
                </div>
              </div>
              <div className={styles.btnWrapper}>
                <button className={styles.signupBtn} type="submit">
                  <span className="flex justify-center items-center">add</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </CSSTransition>
    </>
  );
};

export default AddSupervisor;
