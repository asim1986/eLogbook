import GlobalContext from "../../context/GlobalContext";
import styles from "../../styles/Dashboard.module.scss";
import { BiSearchAlt2 } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";
import { useContext } from "react";

interface MainHeaderType {
  style: any;
  title: string;
}

const MainHeader = ({ style, title }: MainHeaderType) => {
  const { setShowAddModal } = useContext(GlobalContext);

  return (
    <div className={style}>
      <div className="w-10/12 md:w-6/12 lg:w-4/12">
        <input type="text" placeholder="Search here..." />
        <span>
          <BiSearchAlt2 size={"1.6rem"} />
        </span>
      </div>
      <div className="lg:mr-5 md:mr-2">
        <button
          onClick={() => setShowAddModal(true)}
          className={styles.addStudentBtn}
        >
          <span className="md:text-lg">{title}</span> <FaPlus className="text-xl md:mr-2 md:text-lg" />
        </button>
      </div>
    </div>
  );
};

export default MainHeader;
