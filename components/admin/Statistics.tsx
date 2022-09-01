import {
  FaBuilding,
  FaChalkboardTeacher,
  FaUserGraduate,
} from "react-icons/fa";
import { MdSupervisedUserCircle } from "react-icons/md";
import styles from "../../styles/Dashboard.module.scss";
import CardLineChart from "./Charts";

const Statistics = () => {
  return (
    <div className={styles.stats}>
      <div className={styles.info}>
        <div>
          <span>
            <FaUserGraduate size={"2.5rem"} />
          </span>
          <div>
            <p>Students</p>
            <h1>994</h1>
          </div>
        </div>
        <div>
          <span>
            <FaBuilding size={"2.5rem"} />
          </span>
          <div>
            <p>Organisations</p>
            <h1>521</h1>
          </div>
        </div>
        <div>
          <span>
            <FaChalkboardTeacher size={"2.5rem"} />
          </span>
          <div>
            <p>Supervisors</p>
            <h1>211</h1>
          </div>
        </div>
        <div>
          <span>
            <MdSupervisedUserCircle size={"2.5rem"} />
          </span>
          <div>
            <p>Coordinators</p>
            <h1>78</h1>
          </div>
        </div>
      </div>

      <div className={styles.performance}>
        <CardLineChart />
      </div>
    </div>
  );
};

export default Statistics;
