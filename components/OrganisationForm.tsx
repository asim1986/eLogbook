import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { IFormInput } from "../interfaces/formInput";
import styles from "../styles/Signup.module.scss";
import { customStyles } from "../utils/util";
import "react-phone-number-input/style.css";
import { sectors } from "../utils/sectors";
import React, { useState } from "react";
import Select from "react-select";
import Link from "next/link";

const OrganisationForm = ({ admin, btnTitle }: IFormInput) => {
  const [textInput, setTextInput] = useState({
    name: "",
    sector: "",
    address: "",
    employees: "",
    phone: "",
    email: "",
    password: "",
  });

  const [selectedFile, setSelectedFile] = useState({
    file: null,
    isUploaded: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  type OptionType = { label: string; value: string }[];

  const optionSector = sectors;

  const onChangeName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      name: evt.target.value,
      sector: prev.sector,
      address: prev.address,
      employees: prev.employees,
      phone: prev.phone,
      email: prev.email,
      password: prev.password,
    }));
  };

  const selectSector = (option: OptionType | null | any) => {
    if (option) {
      setTextInput((prev) => ({
        name: prev.name,
        sector: option.value,
        address: prev.address,
        employees: prev.employees,
        phone: prev.phone,
        email: prev.email,
        password: prev.password,
      }));
    }
  };

  const onChangeAddress = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      name: prev.name,
      sector: prev.sector,
      address: evt.target.value,
      employees: prev.employees,
      phone: prev.phone,
      email: prev.email,
      password: prev.password,
    }));
  };

  const onChangeEmployee = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      name: prev.name,
      sector: prev.sector,
      address: prev.address,
      employees: evt.target.value,
      phone: prev.phone,
      email: prev.email,
      password: prev.password,
    }));
  };

  const onChangePhone = (value: string | undefined) => {
    setTextInput((prev) => ({
      name: prev.name,
      sector: prev.sector,
      address: prev.address,
      employees: prev.employees,
      phone: value,
      email: prev.email,
      password: prev.password,
    }));
  };

  const onChangeEmail = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      name: prev.name,
      sector: prev.sector,
      address: prev.address,
      employees: prev.employees,
      phone: prev.phone,
      email: evt.target.value,
      password: prev.password,
    }));
  };

  const onChangePassword = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      name: prev.name,
      sector: prev.sector,
      address: prev.address,
      employees: prev.employees,
      phone: prev.phone,
      email: prev.email,
      password: evt.target.value,
    }));
  };

  const onFileUpload = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile({ file: evt.target.files[0], isUploaded: true });
  };

  return (
    <form className="mt-4">
      <div className="flex flex-col mb-4 space-y-4 md:flex-row md:space-y-0 md:space-x-2">
        <div className="w-full">
          <input
            required
            placeholder="Establishment/Industry Name"
            name="name"
            type="text"
            className={styles.signupInput}
            value={textInput.name}
            onChange={onChangeName}
          />
        </div>
        <div className="w-full">
          <Select
            isClearable
            options={optionSector}
            className={styles.select}
            placeholder="Business Sector"
            onChange={selectSector}
            styles={customStyles}
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
          onChange={onChangeAddress}
        />
      </div>
      <div className="flex flex-col mb-4 space-y-4 md:flex-row md:space-y-0 md:space-x-2">
        <div className="w-full">
          <input
            required
            placeholder="Number of Employees"
            name="employees"
            type="number"
            className={styles.signupInput}
            value={textInput.employees}
            onChange={onChangeEmployee}
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
            onChange={onChangePhone}
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
          onChange={onChangeEmail}
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
          onChange={onChangePassword}
        />
        <button type="button" onClick={() => setShowPassword((prev) => !prev)}>
          {showPassword ? (
            <AiFillEyeInvisible size="1.5rem" />
          ) : (
            <AiFillEye size="1.5rem" />
          )}
        </button>
      </div>
      <div className="flex items-start justify-between mb-3">
        {!admin && (
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                required
                id="terms"
                aria-describedby="terms"
                name="terms"
                type="checkbox"
                className={styles.checkBox}
              />
            </div>
            <div className="ml-3 text-sm">
              <label
                htmlFor="terms"
                className="font-medium text-gray-900 dark:text-white"
              >
                I accept the
                <a className={styles.terms} href="/terms-and-conditions/">
                  Terms and Conditions
                </a>
              </label>
            </div>
          </div>
        )}
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
          <span className="flex justify-center items-center">{btnTitle}</span>
        </button>
      </div>
      {!admin && (
        <div className={styles.notReg}>
          Already have an account?
          <Link href="/login">
            <a className={styles.actionBtn}>Login here.</a>
          </Link>
        </div>
      )}
    </form>
  );
};

export default OrganisationForm;
