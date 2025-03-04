import classNames from "classnames/bind";
import styles from "./Dashboard.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPercent,
  faDollarSign,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function Dashboard() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("basic-infor")}>
        <div className={cx("balance")}>
          <div className={cx("parameter")}>
            <div className={cx("topic")}>
              <FontAwesomeIcon className={cx("icon")} icon={faDollarSign} />{" "}
              <strong>Balance</strong>
            </div>
          </div>
          <div className={cx("number")}>$ 56,000</div>
          <div className={cx("growth")}>
            <span className={cx("growth-percent")}>+ 16% </span>vs last month
          </div>
        </div>
        <div className={cx("sales")}>
          <div className={cx("parameter")}>
            <div className={cx("topic")}>
              <FontAwesomeIcon className={cx("icon")} icon={faPercent} />{" "}
              <strong>Sales</strong>
            </div>
          </div>
          <div className={cx("number")}>$23,000</div>
          <div className={cx("growth")}>
            <span className={cx("growth-percent")}>+ 16% </span>vs last month
          </div>
        </div>
        <div className={cx("users")}>
          <div className={cx("parameter")}>
            <div className={cx("topic")}>
              <FontAwesomeIcon className={cx("icon")} icon={faUser} />{" "}
              <strong>Users</strong>
            </div>
          </div>
          <div className={cx("number")}>1,000</div>
          <div className={cx("growth")}>
            <span className={cx("growth-percent")}>+ 16% </span>vs last month
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
