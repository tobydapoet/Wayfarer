import { useState } from "react";
import { useNavigate } from "react-router-dom";
import getCountryCode from "../../utils/countryUtils/countryUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import Flag from "react-world-flags";
import Modal from "../Modal";
import styles from "./StaffItem.module.scss";
import Button from "../Button";

const cx = classNames.bind(styles);

function StaffItem({ data }) {
  const navigate = useNavigate();

  const [deleteNotice, setDeleteNotice] = useState(false);

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

  const handleRowClick = () => {
    navigate(`${data.name}`);
  };

  return (
    <>
      <tr
        className={cx("wrapper")}
        onClick={handleRowClick}
        style={{ cursor: "pointer" }}
      >
        <td className={cx("info")}>
          <div className={cx("img")}>
            <img src={data.avatar} alt={data.name} />
          </div>
          <div className={cx("name")}>{data.name}</div>
        </td>
        <td className={cx("country")}>
          <Flag className={cx("flag")} code={getCountryCode(data.location)} />
        </td>
        <td className={cx("salary")}>
          ${Number(data.salary).toLocaleString("us-US")}
        </td>
        <td className={cx("time")}>{data.start}</td>
        <td className={cx("status-container")}>
          <div className={cx("status", statusColors[data.status])}>
            {status[data.status]}
          </div>
        </td>
        <td className={cx("delete")}>
          <FontAwesomeIcon
            icon={faXmark}
            className={cx("delete-icon")}
            onClick={(e) => {
              e.stopPropagation();
              setDeleteNotice(true);
            }}
          />
        </td>
      </tr>
      <Modal open={deleteNotice} onClose={() => setDeleteNotice(false)}>
        <div className={cx("notice-container")}>
          <div className={cx("notice-content")}>
            Do you want to delete this staff ?
          </div>
          <div className={cx("btn-container")}>
            <Button large>Yes</Button>
            <Button large onClick={() => setDeleteNotice(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default StaffItem;
