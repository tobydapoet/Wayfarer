import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import styles from "./StaffStatus.module.scss";
import HeadlessTippy from "@tippyjs/react/headless";
import Popper from "../Popper";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const statusDisplay = {
  working: "working",
  "in meeting": "inMeeting",
  "on leave": "onLeave",
  "off duty": "offDuty",
};

function StaffStatus({ data }) {
  return (
    <Link to={"/"} className={cx("wrapper")}>
      <div className={cx("user")}>
        <img src={data.avatar} />
        <div className={cx("name")}>{data.name}</div>
      </div>
      <HeadlessTippy
        placement="bottom"
        render={(attrs) => (
          <div className={cx("popper-container")} tabIndex="-1" {...attrs}>
            <Popper className={cx("popper")}>{data.status}</Popper>
          </div>
        )}
      >
        <div className={cx("status")}>
          <FontAwesomeIcon
            icon={faCircle}
            className={cx("icon", statusDisplay[data.status?.toLowerCase?.()])}
          />
        </div>
      </HeadlessTippy>
    </Link>
  );
}

export default StaffStatus;
