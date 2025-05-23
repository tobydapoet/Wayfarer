import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import Flag from "react-world-flags";
import getCountryCode from "../../utils/countryUtils/countryUtils";
import styles from "./ClientItem.module.scss";
import Notice from "../Notice";
import images from "../../assets/images";

const cx = classNames.bind(styles);

function ClientItem({ data, onClick, onDelete }) {
  const [deleteNotice, setDeleteNotice] = useState(false);

  return (
    <>
      <tr
        className={cx("wrapper")}
        onClick={onClick}
        style={{ cursor: "pointer" }}
      >
        <td className={cx("info")}>
          <div className={cx("img")}>
            <img src={data.avatar || images.noImg} alt={data.name} />
          </div>
          <div className={cx("name")}>{data.name}</div>
        </td>
        <td className={cx("country")}>
          <Flag className={cx("flag")} code={getCountryCode(data.site)} />
        </td>
        <td className={cx("email")}>{data.email}</td>
        <td className={cx("phone")}>{data.phone}</td>
        {/* <td className={cx("delete")}>
          <FontAwesomeIcon
            icon={faXmark}
            className={cx("delete-icon")}
            onClick={(e) => {
              e.stopPropagation();
              setDeleteNotice(true);
            }}
          />
        </td> */}
      </tr>
      <Notice
        open={deleteNotice}
        onClose={() => setDeleteNotice(false)}
        content="Do you want to delete this client ?"
        onConfirm={onDelete}
      />
    </>
  );
}

export default ClientItem;
