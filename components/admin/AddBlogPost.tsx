import GlobalContext from "../../context/GlobalContext";
import { CSSTransition } from "react-transition-group";
import animate from "../../styles/animate.module.css";
import styles from "../../styles/Signup.module.scss";
import { useContext, useState } from "react";
import "react-phone-number-input/style.css";
import { MdClose } from "react-icons/md";

const AddBlogPost = ({ show }: { show: boolean }) => {
  const [textInput, setTextInput] = useState({
    title: "",
    content: "",
  });
  const { setShowAddModal } = useContext(GlobalContext);
  const [selectedFile, setSelectedFile] = useState({
    file: null,
    isUploaded: false,
    img: null,
  });
  const onChangeHandlerContent = (
    evt: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTextInput((prev) => ({
      title: prev.title,
      content: evt.target.value,
    }));
  };

  const onChangeHandlerTitle = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput((prev) => ({
      title: evt.target.value,
      content: prev.content,
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
            <h1>Add New Blog</h1>
            <form className="mt-2">
              <div className="flex items-center flex-col text-center justify-center mb-3">
                <div className={styles.thumbnail}>
                  <img
                    src={
                      selectedFile.img
                        ? selectedFile.img
                        : "../images/image2.png"
                    }
                    alt="thumbnail"
                  />
                </div>
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
                      : "Upload Blog Thumbnail"}
                  </label>
                </div>
              </div>
              <div className="flex justify-between w-full mb-4">
                <div className="w-full">
                  <input
                    required
                    placeholder="Title"
                    name="title"
                    type="text"
                    className={styles.signupInput}
                    value={textInput.title}
                    onChange={onChangeHandlerTitle}
                  />
                </div>
              </div>
              <div className="mb-4">
                <textarea
                  required
                  name="content"
                  id="content"
                  rows={8}
                  placeholder="Post content here..."
                  className={styles.signupInput}
                  value={textInput.content}
                  onChange={onChangeHandlerContent}
                ></textarea>
              </div>
              <div className="flex justify-center p-0 m-0">
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

export default AddBlogPost;
