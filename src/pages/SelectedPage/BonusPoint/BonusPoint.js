import classNames from "classnames/bind";
import styles from "./BonusPoint.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faQuestion,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../../../components/Button";
import { useContext, useEffect, useRef, useState } from "react";
import Modal from "../../../components/Modal";
import { UsageVoucherContext } from "../../../contexts/UsageVoucherContext";
import VoucherItem from "../../../components/VoucherItem";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Notice from "../../../components/Notice";
import { getCurrentUser } from "../../../utils/currentUser";

const cx = classNames.bind(styles);
const user = getCurrentUser();

const getDaysInMonth = (year, month) => {
  const days = new Date(year, month + 1, 0).getDate();
  return Array.from({ length: days }, (_, i) => i + 1);
};

function BonusPoint() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const dayToday = today.getDate();
  const dayRef = useRef(dayToday);
  const navigate = useNavigate();
  const days = getDaysInMonth(year, month);

  const [attendance, setAttendance] = useState({});
  const [openReward, setOpenReward] = useState(false);
  const [receivedVoucherName, setReceivedVoucherName] = useState("");
  const [viewVoucherForm, setViewVoucherForm] = useState(false);
  const [viewVoucher, setViewVoucher] = useState({});
  const { allUsageVouchers, setAllUsageVouchers } =
    useContext(UsageVoucherContext);

  const fetchAttendance = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/check-in/attendance/${user._id}`
      );

      const attendedDates = res.data.data
        .map((entry) => new Date(entry.date))
        .filter(
          (date) => date.getMonth() === month && date.getFullYear() === year
        )
        .map((date) => date.getDate());

      const newAttendance = {};
      days.forEach((day) => {
        if (attendedDates.includes(day)) {
          newAttendance[day] = "attended";
        } else if (day < dayToday) {
          newAttendance[day] = "missed";
        }
      });

      setAttendance(newAttendance);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, [dayToday]);

  const handleAttendance = async (day) => {
    if (day === dayToday && attendance[day] !== "attended") {
      try {
        const res = await axios.post(
          "http://localhost:3000/check-in/check_in",
          {
            clientId: user._id,
          }
        );

        console.log("Check-in response:", res.data);

        await fetchAttendance();

        if (res.data.data && res.data.data.voucherId) {
          setReceivedVoucherName(res.data.data.voucherId.discountValue);
          setAllUsageVouchers((prev) => [...prev, res.data.data]);
          setOpenReward(true);
        } else {
          setReceivedVoucherName("");
        }
      } catch (error) {
        console.error("Check-in failed:", error);
      }
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("calendar")}>
        {days.map((day) => (
          <div className={cx("day")} key={day}>
            <div className={cx("day-name")}>{day}</div>
            {attendance[day] === "attended" && (
              <FontAwesomeIcon
                className={cx("check")}
                style={{ color: "green" }}
                icon={faCheck}
              />
            )}
            {attendance[day] === "missed" && (
              <FontAwesomeIcon
                className={cx("xmark")}
                style={{ color: "red" }}
                icon={faXmark}
              />
            )}
          </div>
        ))}
      </div>
      <div className={cx("check-container")}>
        <Button
          rounded
          onClick={() => {
            handleAttendance(dayRef.current);
          }}
          disabled={attendance[dayRef.current] === "attended"}
        >
          Check
        </Button>
      </div>
      <div className={cx("voucher-wrapper")}>
        {allUsageVouchers
          .filter((usage) => usage.clientId._id === user._id && !usage.usedAt)
          .map((voucher) => (
            <VoucherItem
              data={voucher}
              key={voucher._id}
              minimal
              onClick={() => {
                setViewVoucher(voucher);
                setViewVoucherForm(true);
              }}
            />
          ))}
      </div>

      <Notice
        className={cx("reward-container")}
        open={openReward}
        onClose={() => setOpenReward(false)}
        form
        content={`Congratulations! You received voucher ${receivedVoucherName}$!`}
      ></Notice>
      <Modal
        form
        open={viewVoucherForm}
        onClose={() => setViewVoucherForm(false)}
      >
        <div className={cx("view-voucher-container")}>
          <div className={cx("voucher-name")}>
            {viewVoucher?.voucherId?.name}
          </div>
          <div className={cx("voucher-discount")}>
            Discount: {viewVoucher?.voucherId?.discountValue}$
          </div>
          <div className={cx("voucher-minimum")}>
            Minimum: {viewVoucher?.voucherId?.minCost}$
          </div>
          <div className={cx("voucher-receive")}>
            Receive: {new Date(viewVoucher?.receivedAt).toLocaleString()}
          </div>
          <div className={cx("voucher-expire")}>
            Expire: {new Date(viewVoucher?.expiredAt).toLocaleString()}
          </div>
          <div className={cx("voucher-description")}>
            {viewVoucher?.voucherId?.description}
          </div>
          <Button rounded onClick={() => navigate(`/destinations`)}>
            Use now!
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default BonusPoint;
