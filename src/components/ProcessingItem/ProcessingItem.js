import classNames from "classnames/bind";
import styles from "./ProcessingItem.module.scss";

const cx = classNames.bind(styles);

function ProcessingItem({ data, onClick, isSelected }) {
  const statusColors = {
    "Pending Confirmation": "pending",
    Paid: "paid",
    "In Process": "in-process",
    Completed: "completed",
    Cancelled: "cancelled",
    "Pending Refund": "wait-refund",
    Refunded: "refunded",
  };

  return (
    <div className={cx("wrapper", { selected: isSelected })} onClick={onClick}>
      <div className={cx("container")}>
        <img src={data.scheduleId.destinationId.image} />
        <div className={cx("content")}>
          <div className={cx("name")}>
            <strong>{data.scheduleId.destinationId.name}</strong>
          </div>
          <div className={cx("text-content")}>
            <div>status:</div>
            <div className={cx("status", statusColors[data?.status])}>
              {data.status}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProcessingItem;
