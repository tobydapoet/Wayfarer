import classNames from "classnames/bind";
import styles from "./ProcessingItem.module.scss";

const cx = classNames.bind(styles);

function ProcessingItem({ data, onClick, isSelected }) {
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

  function getStatus(type, code) {
    if (code === 4) {
      if (type === "trips") return "On Trip";
      if (type === "hotels") return "Checked In";
      if (type === "transports") return "Rented";
    }
    return status[code] || "Unknown Status";
  }
  console.log(tour);
  return (
    <div className={cx("wrapper", { selected: isSelected })} onClick={onClick}>
      <div className={cx("container")}>
        <img src={tour.img} />
        <div className={cx("content")}>
          <div className={cx("name")}>
            <strong>{tour.name}</strong>
          </div>
          <div className={cx("text-content")}>
            <div className={cx("address")}>{tour.address}</div>
            <div className={cx("status")}>status: {getStatus(tour.type, tour.status)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProcessingItem;
