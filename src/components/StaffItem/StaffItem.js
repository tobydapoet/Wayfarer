import { useState } from "react";
import { useNavigate } from "react-router-dom";
import getCountryCode from "../../utils/countryUtils/countryUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import Flag from "react-world-flags";
import styles from "./StaffItem.module.scss";
import Notice from "../Notice";
import images from "../../assets/images";

const cx = classNames.bind(styles);

function StaffItem({ data, onClick, onDelete }) {
  const [deleteNotice, setDeleteNotice] = useState(false);

  const statusDisplay = {
    working: "working",
    "in meeting": "inMeeting",
    "on leave": "onLeave",
    "off duty": "offDuty",
    quit: "quit",
  };

  return (
    <>
      <tr
        className={cx("wrapper")}
        onClick={onClick}
        style={{ cursor: "pointer" }}
      >
        <td className={cx("info")}>
          <div className={cx("img")}>
            <img src={data.avatar || images.noAvatar} alt={data.name} />
          </div>
          <div className={cx("name")}>{data.name}</div>
        </td>
        <td className={cx("country")}>
          <Flag className={cx("flag")} code={getCountryCode(data.site)} />
        </td>
        <td className={cx("salary")}>
          ${Number(data.salary).toLocaleString("us-US")}
        </td>
        <td className={cx("time")}>
          {new Date(data.start).toLocaleDateString()}
        </td>
        <td className={cx("status-container")}>
          <div className={cx("status", statusDisplay[data.status])}>
            {data.status}
          </div>
        </td>
        {/* {data.position === "staff" && (
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
        )} */}
      </tr>
      <Notice
        open={deleteNotice}
        onClose={() => setDeleteNotice(false)}
        content=" Do you want to delete this staff ?"
        onConfirm={onDelete}
      />
    </>
  );
}

export default StaffItem;
