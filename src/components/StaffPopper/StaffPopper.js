import classNames from "classnames/bind";
import styles from "./StaffPopper.module.scss";
import Popper from "../Popper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

const statusDisplay = {
  working: "working",
  "in meeting": "inMeeting",
  "on leave": "onLeave",
  "off duty": "offDuty",
};

function StaffPopper({ data }) {
  const navigate = useNavigate();
  return (
    <div
      className={cx("wrapper")}
      onClick={() => navigate(`/manage/business/staffs/${data.email}`)}
    >
      <div className={cx("user")}>
        <img src={data.avatar} />
        <div className={cx("name")}>{data.name}</div>
      </div>
      <div className={cx("status")}>
        <FontAwesomeIcon
          icon={faCircle}
          className={cx("icon", statusDisplay[data.status])}
        />
      </div>
    </div>
  );
}

export default StaffPopper;
