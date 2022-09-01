import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import GlobalContext from "../../context/GlobalContext";
import { CSSTransition } from "react-transition-group";
import animate from "../../styles/animate.module.css";
import styles from "../../styles/Signup.module.scss";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { useContext, useState } from "react";
import "react-phone-number-input/style.css";
import { MdClose } from "react-icons/md";

const AddOrganisation = ({ show }: { show: boolean }) => {
  const [textInput, setTextInput] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    type: "",
    pple: "",
    phone: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const { showAddModal, setShowAddModal } = useContext(GlobalContext);
  const [selectedFile, setSelectedFile] = useState({
    file: null,
    isUploaded: false,
    img: null,
  });

  const onChangeHandlerName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      name: evt.target.value,
      email: prev.email,
      password: prev.password,
      address: prev.address,
      type: prev.type,
      pple: prev.pple,
      phone: prev.phone,
    }));
  };

  const onChangeHandlerEmail = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      name: prev.name,
      email: evt.target.value,
      password: prev.password,
      address: prev.address,
      type: prev.type,
      pple: prev.pple,
      phone: prev.phone,
    }));
  };

  const onChangeHandlerPassword = (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTextInput((prev) => ({
      name: prev.name,
      email: prev.email,
      password: evt.target.value,
      address: prev.address,
      type: prev.type,
      pple: prev.pple,
      phone: prev.phone,
    }));
  };

  const onChangeHandlerAddress = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      name: prev.name,
      email: prev.email,
      password: prev.password,
      address: evt.target.value,
      type: prev.type,
      pple: prev.pple,
      phone: prev.phone,
    }));
  };

  const onChangeHandlerType = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      name: prev.name,
      email: prev.email,
      password: prev.password,
      address: prev.address,
      type: evt.target.value,
      pple: prev.pple,
      phone: prev.phone,
    }));
  };

  const onChangeHandlerPple = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      name: prev.name,
      email: prev.email,
      password: prev.password,
      address: prev.address,
      type: prev.type,
      pple: evt.target.value,
      phone: prev.phone,
    }));
  };

  const onChangeHandlerPhone = (value: string | undefined) => {
    setTextInput((prev) => ({
      name: prev.name,
      email: prev.email,
      password: prev.password,
      address: prev.address,
      type: prev.type,
      pple: prev.pple,
      phone: value,
    }));
    // console.log("VALUES**", value)
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
            <MdClose
              onClick={() => setShowAddModal(false)}
              size={"1.5rem"}
              className="cursor-pointer p-0 m-0"
            />
            <h1>Add an Organisation Account</h1>
            <form className="mt-4">
              <div className="flex flex-col mb-4 space-y-6 md:flex-row md:space-y-0 md:space-x-6">
                <div className="w-full">
                  <input
                    required
                    placeholder="Establishment/Industry Name"
                    name="name"
                    type="text"
                    className={styles.signupInput}
                    value={textInput.name}
                    onChange={onChangeHandlerName}
                  />
                </div>
                <div className="w-full">
                  <input
                    required
                    placeholder="Business Type Undertaken"
                    name="lastName"
                    type="business type"
                    className={styles.signupInput}
                    value={textInput.type}
                    onChange={onChangeHandlerType}
                  />
                </div>
              </div>
              <div className="mb-4">
                <input
                  required
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Organisation Address"
                  className={styles.signupInput}
                  value={textInput.address}
                  onChange={onChangeHandlerAddress}
                />
              </div>
              <div className="flex flex-col mb-4 space-y-6 md:flex-row md:space-y-0 md:space-x-6">
                <div className="w-full">
                  <input
                    required
                    placeholder="No of People Employed"
                    name="name"
                    type="number"
                    className={styles.signupInput}
                    value={textInput.pple}
                    onChange={onChangeHandlerPple}
                  />
                </div>
                <div className="w-full">
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
                    {selectedFile.isUploaded ? "File Uploaded" : "Upload Logo"}
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

export default AddOrganisation;
