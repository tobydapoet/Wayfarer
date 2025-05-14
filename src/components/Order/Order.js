import classNames from "classnames/bind";
import styles from "./Order.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Notice from "../Notice";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function Order({ data, extent, onDelete }) {
  const [deleteNotice, setDeleteNotice] = useState(false);

  const statusColors = {
    "Pending Confirmation": "pending",
    Paid: "paid",
    "In process": "in-process",
    Completed: "completed",
    Canceled: "canceled",
    Refunded: "refunded",
  };

  console.log(data);
  const navigate = useNavigate();
  const handleRowClick = () => {
    navigate(`/manage/billsmanage/${data._id}`);
  };
  return (
    <>
      <tr className={cx("wrapper")} onClick={handleRowClick}>
        <td className={cx("user")}>
          <div className={cx("img")}>
            <img src={data?.clientId?.avatar} alt={data?.clientId?.name} />
          </div>
          <div className={cx("name")}>{data?.clientId?.name}</div>
        </td>
        <td className={cx("cost")}>
          ${Number(data.pay).toLocaleString("us-US")}
        </td>
        <td className={cx("title")}>{data?.scheduleId?.destinationId?.name}</td>
        {extent && <td className={cx("number")}>{data.num}</td>}

        <td className={cx("status")}>
          <div className={cx("status-inner", statusColors[data.status])}>
            {data.status}
          </div>
        </td>
        {extent && (
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
        )}
      </tr>
      <Notice
        open={deleteNotice}
        onClose={() => setDeleteNotice(false)}
        content="Do you want to delete this  ?"
        onConfirm={onDelete}
      />
    </>
  );
}

export default Order;
