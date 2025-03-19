import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Flag from "react-world-flags";
import getCountryCode from "../../utils/countryUtils/countryUtils";
import styles from "./ClientItem.module.scss";
import Notice from "../Notice";

const cx = classNames.bind(styles);

function ClientItem({ data }) {
  const navigate = useNavigate();

  const [deleteNotice, setDeleteNotice] = useState(false);

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
        <td className={cx("email")}>{data.email}</td>
        <td className={cx("phone")}>{data.phone}</td>
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
        content = "Do you want to delete this client ?"
      />
    </>
  );
}

export default ClientItem;
