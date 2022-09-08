import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { allInstitutions } from "../../utils/institutions";
import GlobalContext from "../../context/GlobalContext";
import { CSSTransition } from "react-transition-group";
import animate from "../../styles/animate.module.css";
import styles from "../../styles/Signup.module.scss";
import { useContext, useRef, useState } from "react";
import BackBlurDrop from "../BackBlurDrop";
import "react-phone-number-input/style.css";
import { MdClose } from "react-icons/md";
import Select from "react-select";

const AddStudent = ({ show }: { show: boolean }) => {
  const [textInput, setTextInput] = useState({
    name: { firstName: "", middleName: "", lastName: "" },
    email: "",
    phone: "",
    password: "",
    institute: "",
    level: "",
    gender: "",
    address: "",
    other: "",
    dept: "",
    matric: "",
  });
  const nodeRef = useRef<any>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showInput, setShowInput] = useState(false);
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
        middleName: prev.name.middleName,
        lastName: prev.name.lastName,
      },
      email: evt.target.value,
      phone: prev.phone,
      password: prev.password,
      institute: prev.institute,
      level: prev.level,
      gender: prev.gender,
      address: prev.address,
      other: prev.other,
      dept: prev.dept,
      matric: prev.matric,
    }));
  };

  const onChangeHandlerLast = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      name: {
        firstName: prev.name.firstName,
        middleName: prev.name.middleName,
        lastName: evt.target.value,
      },
      email: evt.target.value,
      phone: prev.phone,
      password: prev.password,
      institute: prev.institute,
      level: prev.level,
      gender: prev.gender,
      address: prev.address,
      other: prev.other,
      dept: prev.dept,
      matric: prev.matric,
    }));
  };

  const onChangeHandlerEmail = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      name: {
        firstName: prev.name.firstName,
        middleName: prev.name.middleName,
        lastName: prev.name.lastName,
      },
      email: evt.target.value,
      phone: prev.phone,
      password: prev.password,
      institute: prev.institute,
      level: prev.level,
      gender: prev.gender,
      address: prev.address,
      other: prev.other,
      dept: prev.dept,
      matric: prev.matric,
    }));
  };

  const onChangeHandlerPhone = (value: string | undefined) => {
    setTextInput((prev) => ({
      name: {
        firstName: prev.name.firstName,
        middleName: prev.name.middleName,
        lastName: prev.name.lastName,
      },
      email: prev.email,
      phone: value,
      password: prev.password,
      institute: prev.institute,
      level: prev.level,
      gender: prev.gender,
      address: prev.address,
      other: prev.other,
      dept: prev.dept,
      matric: prev.matric,
    }));
  };

  const onChangeHandlerPassword = (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTextInput((prev) => ({
      name: {
        firstName: prev.name.firstName,
        middleName: prev.name.middleName,
        lastName: prev.name.lastName,
      },
      email: prev.email,
      phone: prev.phone,
      password: evt.target.value,
      institute: prev.institute,
      level: prev.level,
      gender: prev.gender,
      address: prev.address,
      other: prev.other,
      dept: prev.dept,
      matric: prev.matric,
    }));
  };

  const onChangeHandlerAddress = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      name: {
        firstName: prev.name.firstName,
        middleName: prev.name.middleName,
        lastName: prev.name.lastName,
      },
      email: prev.email,
      phone: prev.phone,
      password: prev.password,
      institute: prev.institute,
      level: prev.level,
      gender: prev.gender,
      address: evt.target.value,
      other: prev.other,
      dept: prev.dept,
      matric: prev.matric,
    }));
  };

  const onChangeHandlerOther = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      name: {
        firstName: prev.name.firstName,
        middleName: prev.name.middleName,
        lastName: prev.name.lastName,
      },
      email: prev.email,
      phone: prev.phone,
      password: prev.password,
      institute: prev.institute,
      level: prev.level,
      gender: prev.gender,
      address: prev.address,
      other: evt.target.value,
      dept: prev.dept,
      matric: prev.matric,
    }));
  };

  const onChangeHandlerDept = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      name: {
        firstName: prev.name.firstName,
        middleName: prev.name.middleName,
        lastName: prev.name.lastName,
      },
      email: prev.email,
      phone: prev.phone,
      password: prev.password,
      institute: prev.institute,
      level: prev.level,
      gender: prev.gender,
      address: prev.address,
      other: prev.other,
      dept: evt.target.value,
      matric: prev.matric,
    }));
  };

  const onChangeHandlerMatric = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      name: {
        firstName: prev.name.firstName,
        middleName: prev.name.middleName,
        lastName: prev.name.lastName,
      },
      email: prev.email,
      phone: prev.phone,
      password: prev.password,
      institute: prev.institute,
      level: prev.level,
      gender: prev.gender,
      address: prev.address,
      other: prev.other,
      dept: prev.dept,
      matric: evt.target.value,
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

  const optionsLevel: OptionType = [
    { value: "ND1", label: "ND1" },
    { value: "NC2", label: "NC2" },
    { value: "300", label: "300" },
    { value: "400", label: "400" },
  ];

  const optionsGender: OptionType = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  const optionsPlace: OptionType = [{ value: "Upcoming", label: "Upcoming" }];

  const selectInstitution = (option: OptionType | null | any) => {
    if (option) {
      setTextInput((prev) => ({
        name: {
          firstName: prev.name.firstName,
          middleName: prev.name.middleName,
          lastName: prev.name.lastName,
        },
        email: prev.email,
        phone: prev.phone,
        password: prev.password,
        institute: option.value,
        level: prev.level,
        gender: prev.gender,
        address: prev.address,
        other: prev.other,
        dept: prev.dept,
        matric: prev.matric,
      }));
    }
    setShowInput(option.value === "Others" ? true : false);
  };

  const selectLevel = (option: OptionType | null | any) => {
    if (option) {
      setTextInput((prev) => ({
        name: {
          firstName: prev.name.firstName,
          middleName: prev.name.middleName,
          lastName: prev.name.lastName,
        },
        email: prev.email,
        phone: prev.phone,
        password: prev.password,
        institute: prev.institute,
        level: option.value,
        gender: prev.gender,
        address: prev.address,
        other: prev.other,
        dept: prev.dept,
        matric: prev.matric,
      }));
    }
    setShowInput(option.value === "Others" ? true : false);
  };

  const selectGender = (option: OptionType | null | any) => {
    if (option) {
      setTextInput((prev) => ({
        name: {
          firstName: prev.name.firstName,
          middleName: prev.name.middleName,
          lastName: prev.name.lastName,
        },
        email: prev.email,
        phone: prev.phone,
        password: prev.password,
        institute: prev.institute,
        level: prev.level,
        gender: option.value,
        address: prev.address,
        other: prev.other,
        dept: prev.dept,
        matric: prev.matric,
      }));
    }
    setShowInput(option.value === "Others" ? true : false);
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
              className="cursor-pointer mt-2 ml-3 md:m-0 md:p-0 text-2xl md:text-3xl"
            />
            <h1>Create a Student Account</h1>
            <form className="mt-4">
              <div className="flex flex-col-reverse md:flex-row justify-between">
                <div className="w-full">
                  <div className="flex flex-col md:flex-row mb-4">
                    <div className="w-full mb-4 md:mb-0 md:mr-1">
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
                    <div className="w-full md:ml-1">
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
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full mb-4">
                      <input
                        required
                        type="text"
                        name="matno"
                        id="matno"
                        placeholder="Matriculation Number"
                        className={styles.signupInput}
                        value={textInput.matric}
                        onChange={onChangeHandlerMatric}
                      />
                    </div>
                    <div className="w-full mb-4 md:mb-0 md:ml-2">
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
                </div>
                <div>
                  <div className={styles.passport}>
                    <img
                      src={
                        selectedFile.img
                          ? selectedFile.img
                          : "../images/thumbnail.png"
                      }
                      alt="passport"
                    />
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <div className="w-full">
                  <input
                    required
                    placeholder="House Address"
                    name="address"
                    type="text"
                    className={styles.signupInput}
                    value={textInput.address}
                    onChange={onChangeHandlerAddress}
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
                <div className="w-full flex flex-row justify-between">
                  <div className="w-full mr-1">
                    <Select
                      options={optionsLevel}
                      className={styles.select}
                      placeholder="Level"
                      onChange={selectLevel}
                      styles={customStyles}
                    />
                  </div>
                  <div className="w-full ml-1">
                    <Select
                      options={optionsGender}
                      className={styles.select}
                      placeholder="Gender"
                      onChange={selectGender}
                      styles={customStyles}
                    />
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <Select
                  options={optionsPlace}
                  className={styles.select}
                  placeholder="Select Place of SIWES"
                  onChange={selectInstitution}
                  styles={customStyles}
                />
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
              <div className="flex justify-center p-0 m-0 mb-5 md:mb-0">
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

export default AddStudent;
