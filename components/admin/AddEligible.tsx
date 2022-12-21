import { errorToastStyle, successToastStyle } from "../../utils/styles.utils";
import { useAppDispatch, useAppSelector } from "../../hooks/store.hook";
import { GET_ELIGIBLES_DEPT } from "../../graphql/query/eligible";
import { useContext, useState, useRef, useEffect } from "react";
import { IAddEligible } from "../../interfaces/comp.interface";
import { CREATE_ELIG } from "../../graphql/mutations/eligible";
import { GET_SUP_DEPT } from "../../graphql/query/supervisor";
import { allInstitutions } from "../../utils/institutions";
import { useLazyQuery, useMutation } from "@apollo/client";
import GlobalContext from "../../context/GlobalContext";
import { setRest } from "../../store/slice/auth.slice";
import { CSSTransition } from "react-transition-group";
import animate from "../../styles/animate.module.css";
import styles from "../../styles/Signup.module.scss";
import { client } from "../../graphql/apolloClient";
import toast, { Toaster } from "react-hot-toast";
import { customStyles } from "../../utils/util";
import { depts } from "../../utils/department";
import "react-phone-number-input/style.css";
import BackBlurDrop from "../BackBlurDrop";
import { level } from "../../utils/levels";
import { MdClose } from "react-icons/md";
import Select from "react-select";
import router from "next/router";


const AddEligible = ({ show, isAdmin }: IAddEligible) => {
  const nodeRef = useRef<any>(null);
  const [matricNoErr, setMatricNoErr] = useState(false);

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
  const userData = useAppSelector((state) => state.auth.userCoordData);
  const { id, department, institute } = userData;
  const validMatricNo = new RegExp(
    /^([A-Z0-9]+){8}((,\s)([A-Z0-9]+){7})*([A-Z0-9]+)$/
  );

  const onChangeMatric = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newTexInput = evt.target.value;
    if (!validMatricNo.test(newTexInput)) {
      setMatricNoErr(true);
    } else {
      setMatricNoErr(false);
    }

    setTextInput((prev) => ({
      supervisor: prev.supervisor,
      institute: prev.institute,
      other: prev.other,
      level: prev.level,
      dept: prev.dept,
      matric: evt.target.value,
    }));
  };

  const dispatch = useAppDispatch();

  const onChangeSupervisor = (evt: React.ChangeEvent<HTMLInputElement>) => {
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

  type OptionType = { label: string; value: string }[];

  const options: OptionType = allInstitutions.map((inst) => {
    return { value: inst, label: inst };
  });

  const optionsDept: OptionType = depts;

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

  const selectDept = (option: OptionType | null | any) => {
    if (option) {
      setTextInput((prev) => ({
        supervisor: prev.supervisor,
        institute: prev.institute,
        other: prev.other,
        level: prev.level,
        dept: option.value,
        matric: prev.matric,
      }));
    }
  };

  const selectSupervisor = (option: OptionType | null | any) => {
    if (option) {
      setTextInput((prev) => ({
        supervisor: option.value,
        institute: prev.institute,
        other: prev.other,
        level: prev.level,
        dept: prev.dept,
        matric: prev.matric,
      }));
    }
  };

  const [getSupDept, { data }] = useLazyQuery(GET_SUP_DEPT, {
    variables: {
      input: {
        department,
        institute,
      },
    },
    onError: ({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) => {
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          );
          toast.error(`${message}`, errorToastStyle);
        });
      if (networkError) {
        toast.error(`${networkError}`, errorToastStyle);
        console.log(`[Network error]: ${networkError}`);
      }
    },
  });

  const logout = async () => {
    // Reset Apollo Cache
    client.resetStore();
    dispatch(setRest());
    router.push("/login");
  };

  const [createElig, { loading, reset }] = useMutation(CREATE_ELIG, {
    onCompleted: (data) => {
      toast.success(data.eligible?.message, successToastStyle);
      //Reset Inputs
      setTextInput((prev) => ({
        supervisor: "",
        institute: "",
        other: "",
        level: "",
        dept: "",
        matric: "",
      }));
      reset();
    },
    update(cache, { data: { eligible } }) {
      // Get all the Existing Cached Data
      const existingEligData: any = cache.readQuery({
        query: GET_ELIGIBLES_DEPT,
        variables: {
          input: {
            id,
            department,
            institute,
          },
        },
      });
      // Create a New Data
      const eligData = existingEligData!.eligiblesByDept;
      const newEligData = [...eligData, eligible!.eligible];
      // Update Cache Data
      cache.writeQuery({
        query: GET_ELIGIBLES_DEPT,
        data: { eligiblesByDept: newEligData },
        variables: {
          input: {
            id,
            department,
            institute,
          },
        },
      });
    },
    onError: ({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) => {
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          );
          toast.error(`${message}`, errorToastStyle);
          const tokenErr = message.split(":")[0];
          if (tokenErr === "TokenExpiredError") {
            logout();
          }
        });
      if (networkError) {
        toast.error(`${networkError}`, errorToastStyle);
        console.log(`[Network error]: ${networkError}`);
      }
    },
  });

  useEffect(() => {
    getSupDept();
  }, []);

  const supListOrg = data?.supervisorsByDepts?.map((i: any) => {
    return { value: i.email, label: `${i.title} ${i.firstName} ${i.lastName}` };
  });

  const optionSup = supListOrg;

  const onSubmitHandler = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (matricNoErr) {
      toast.error("Invalid Matric Number(s)", errorToastStyle);
      return;
    }

    createElig({
      variables: {
        registerInput: {
          level: textInput.level,
          matricNo: textInput.matric,
          email: textInput.supervisor,
        },
      },
    });
  };

  return (
    <>
      <BackBlurDrop show={show} isAdmin={isAdmin} style={true} />
      <Toaster position="top-center" reverseOrder={false} />
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
          className={isAdmin ? styles.addStudent : styles.addStudentUser}
        >
          <div className="sm:p-5 lg:p-5">
            <MdClose
              onClick={() => setShowAddModal(false)}
              className="cursor-pointer mt-3 ml-3 md:m-0 md:p-0 text-2xl md:text-3xl"
            />
            <h1>Add Eligible Student</h1>
            <form className="mt-2 p-3" onSubmit={onSubmitHandler}>
              {isAdmin && (
                <div className="flex justify-between w-full mb-4">
                  <div className="w-full">
                    <Select
                      isClearable
                      options={optionsDept}
                      className={styles.select}
                      placeholder="Department"
                      onChange={selectDept}
                      styles={customStyles}
                    />
                  </div>
                </div>
              )}
              {isAdmin && (
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
              )}
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
                  <Select
                    isClearable
                    options={optionSup}
                    className={styles.select}
                    placeholder="Supervisor"                    
                    onChange={selectSupervisor}
                    styles={customStyles}
                  />
                </div>
                <div className="md:w-1/2 md:mr-1">
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
                  rows={6}
                  placeholder="Matric Number(s)"
                  className={
                    matricNoErr ? styles.textAreaErr : styles.signupInput
                  }
                  value={textInput.matric}
                  onChange={onChangeMatric}
                ></textarea>
                {matricNoErr && (
                  <p className="text-red-700 py-2 rounded-lg text-sm absolute">
                    Invalid Matric Number(s)
                  </p>
                )}
              </div>
              <div className="flex justify-center p-0 m-0 mb-4 md:mb-0">
                <button
                  className={styles.signupBtnSt}
                  type="submit"
                  disabled={loading ? true : false}
                >
                  <span className="flex justify-center items-center">
                    {loading ? "Adding..." : "Add"}
                  </span>
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
