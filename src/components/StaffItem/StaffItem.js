import { useState } from "react";
import { useNavigate } from "react-router-dom";
import getCountryCode from "../../utils/countryUtils/countryUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import Flag from "react-world-flags";
import styles from "./StaffItem.module.scss";
import Notice from "../Notice";

const cx = classNames.bind(styles);

function StaffItem({ data }) {
  const navigate = useNavigate();

  const [deleteNotice, setDeleteNotice] = useState(false);

  // const statusDisplay = {
  //   working: "working",
  //   inMeeting: "in a meeting",
  //   onLeave: "on leave",
  //   offDuty: "off duty",
  // };

  const statusDisplay = {
    working: "Working",
    "in meeting": "inMeeting",
    "on leave": "onLeave",
    "off duty": "offDuty",
  };

  const handleRowClick = () => {
    navigate(`${data.name}`);
  };

  console.log(data);

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
      <Notice
        open={deleteNotice}
        onClose={() => setDeleteNotice(false)}
        content=" Do you want to delete this staff ?"
      />
    </>
  );
}

export default StaffItem;
