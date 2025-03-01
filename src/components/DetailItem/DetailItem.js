import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import styles from "./DetailItem.module.scss";
import Button from "../Button";
import Modal from "../Modal";
import { useState } from "react";

const cx = classNames.bind(styles);

function DetailItem({ data, onClick }) {
  const [isOpenCancel, setOpenCancel] = useState(false);
  const [isOpenPay, setOpenPay] = useState(false);

  const handleOpenCancel = () => {
    setOpenCancel(true);
  };
  const handleOpenPay = () => {
    setOpenPay(true);
  };

  const info = { ...data };

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
  return (
    <div className={cx("wrapper")}>
      <button className={cx("back")} onClick={onClick}>
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
      <div className={cx("content")}>
        <h2>{info.name}</h2>
        <div>Address: {info.address}</div>
        <div>Start : {info.start}</div>
        <div>Finish : {info.finish}</div>
        <div>Member : {info.guest}</div>
        <div>Cost : {info.cost}</div>
        <div>
          Status:
          <span className={cx("status", statusColors[info.status])}>
            {getStatus(info.type, info.status)}
          </span>
        </div>
      </div>
      {info.status < 4 && (
        <div className={cx("choice")}>
          <Button large onClick={handleOpenCancel}>
            Cancel
          </Button>
          {info.status == 2 && (
            <Button large onClick={handleOpenPay}>
              Pay
            </Button>
          )}
        </div>
      )}
      <Modal open={isOpenCancel} onClose={() => setOpenCancel(false)}>
        <div className={cx("cancel-container")}>
          <div className={cx("cancel-content")}>
            Do you want to cancel this schedule ?
          </div>
          <div className={cx("btn-container")}>
            <Button large onClick={() => setOpenCancel(false)}>
              No
            </Button>
            <Button large>Yes</Button>
          </div>
        </div>
      </Modal>

      <Modal open={isOpenPay} onClose={() => setOpenPay(false)}>
        <div className={cx("pay-container")}>
          <div className={cx("pay-content")}>Do you want to pay ?</div>
          <div className={cx("btn-container")}>
            <Button large onClick={() => setOpenPay(false)}>
              No
            </Button>
            <Button large>Yes</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default DetailItem;
