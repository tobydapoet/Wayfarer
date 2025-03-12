import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import styles from "./StaffStatus.module.scss";
import HeadlessTippy from "@tippyjs/react/headless";
import Popper from "../Popper";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function StaffStatus({ data }) {
  const status = {
    0: "working",
    1: "in a meeting",
    2: "on leave",
    3: "off duty",
  };

  const statusColors = {
    0: "working",
    1: "inMeeting",
    2: "onLeave",
    3: "offDuty",
  };
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
            <Popper className={cx("popper")}>{status[data.status]}</Popper>
          </div>
        )}
      >
        <div className={cx("status")}>
          <FontAwesomeIcon
            icon={faCircle}
            className={cx("icon", statusColors[data.status])}
          />
        </div>
      </HeadlessTippy>
    </Link>
  );
}

export default StaffStatus;
