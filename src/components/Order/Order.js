import classNames from "classnames/bind";
import styles from "./Order.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Notice from "../Notice";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function Order({ data, extent, onClick }) {
  const [deleteNotice, setDeleteNotice] = useState(false);
  const tour = { ...data };
  const status = {
    0: "Pending Confirmation",
    1: "Confirmed",
    2: "Payment Pending",
    3: "Paid",
    4: "Checked In ",
    5: "Completed",
    6: "Cancelled",
    7: "No Show",
    8: "Refunded",
  };

  const statusColors = {
    0: "pending",
    1: "confirmed",
    2: "payment-pending",
    3: "paid",
    4: "checked-in",
    5: "completed",
    6: "cancelled",
    7: "no-show",
    8: "refunded",
  };

  function getStatus(type, code) {
    if (code === 4) {
      if (type === "trips") return "On Trip";
      if (type === "hotels") return "Checked In";
      if (type === "transports") return "Rented";
    }
    return status[code] || "Unknown Status";
  }
  const navigate = useNavigate();
  const handleRowClick = () => {
    navigate(`/manage/billsmanage/${data.id}`);
  };
  return (
    <>
      <tr className={cx("wrapper")} onClick={handleRowClick}>
        <td className={cx("user")}>
          <div className={cx("img")}>
            <img src={data.avatar} alt={data.name} />
          </div>
          <div className={cx("name")}>{data.client}</div>
        </td>
        <td className={cx("cost")}>
          ${Number(data.total).toLocaleString("us-US")}
        </td>
        <td className={cx("title")}>{data.service}</td>
        <td className={cx("time-start")}>{data.dateStart}</td>
        {extent && (
          <>
            <td className={cx("status", statusColors[data.status])}>
              {getStatus(tour.type, tour.status)}
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
          </>
        )}
      </tr>
      <Notice
        open={deleteNotice}
        onClose={() => setDeleteNotice(false)}
        content="Do you want to delete this client ?"
      />
    </>
  );
}

export default Order;
