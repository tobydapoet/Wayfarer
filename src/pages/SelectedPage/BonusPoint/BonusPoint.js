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

const cx = classNames.bind(styles);
const user =
  JSON.parse(localStorage.getItem("user")) ||
  JSON.parse(sessionStorage.getItem("user"));

const getDaysinMounth = (year, month) => {
  const days = new Date(year, month + 1, 0).getDate();
  return Array.from({ length: days }, (_, i) => i + 1);
};

function BonusPoint() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const dayToday = today.getDate();
  const dayRef = useRef();
  dayRef.current = dayToday;
  const navigate = useNavigate();
  const days = getDaysinMounth(year, month);

  const [attendance, setAttendance] = useState({});
  const [openNote, setOpenNote] = useState(false);
  const [openReward, setOpenReward] = useState(false);
  const [loggedMilestones, setLoggedMilestones] = useState([]);
  const [rewardMessage, setRewardMessage] = useState("");
  const [limitation, setLimitaion] = useState([]);
  const { allUsageVouchers } = useContext(UsageVoucherContext);
  const [viewVoucherForm, setViewVoucherForm] = useState(false);
  const [viewVoucher, setViewVoucher] = useState({});

  useEffect(() => {
    const newAttendance = {};
    days.forEach((day) => {
      if (day < dayToday && !attendance[dayToday]) {
        newAttendance[day] = "missed";
      }
    });
    setAttendance((prev) => ({ ...prev, ...newAttendance }));
  }, [dayToday]);

  const rewardText = {
    5: 50,
    10: 100,
    20: 220,
    30: 350,
  };

  useEffect(() => {
    const attendedDays = Object.keys(attendance)
      .filter((day) => attendance[day] === "attended")
      .map(Number)
      .sort((a, b) => a - b);

    let count = 1;
    let newMilestones = [...loggedMilestones];

    for (let i = 1; i < attendedDays.length; i++) {
      if (attendedDays[i] === attendedDays[i - 1] + 1) {
        count++;

        if (
          count % 5 === 0 &&
          count <= 30 &&
          count !== 15 &&
          count !== 25 &&
          !newMilestones.includes(count)
        ) {
          console.log(`✅ Đã điểm danh ${count} ngày liên tiếp!`);
          newMilestones.push(count);
          const nextMonth = month === 12 ? 1 : month + 1;
          const nextYear = month === 12 ? year + 1 : year;

          limitation.push({
            day: attendedDays[i],
            month: nextMonth,
            year: nextYear,
          });
          console.log(limitation);

          setRewardMessage(rewardText[count]);
          setOpenReward(true);
        }
      } else {
        count = 1;
        console.log(`✅ Đã điểm danh lại từ đầu`);
      }
    }
    const saveMounth = localStorage.getItem("saveMonth");
    if (!saveMounth || Number(saveMounth) !== month) {
      localStorage.setItem("saveMonth", month);
      setLoggedMilestones([]);
    } else {
      setLoggedMilestones(newMilestones);
    }

    setLoggedMilestones(newMilestones);
  }, [attendance]);

  const handleAttendance = (day) => {
    if (day === dayToday) {
      setAttendance({ ...attendance, [day]: "attended" });
    }
  };
  // const handleAttendance = (day) => {
  //   setAttendance((prev) => ({
  //     ...prev,
  //     [day]: "attended",
  //   }));
  // };
  console.log(viewVoucher);

  const handleOpenNote = () => {
    setOpenNote(true);
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
          onClick={() => handleAttendance(dayRef.current)}
          disabled={attendance[dayRef.current] === "attended"}
        >
          Check
        </Button>
        <button onClick={handleOpenNote} className={cx("note")}>
          <FontAwesomeIcon icon={faQuestion} />
        </button>
      </div>
      <div className={cx("voucher-wrapper")}>
        {allUsageVouchers
          .filter((usage) => usage.clientId._id === user._id)
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
      <Modal
        className={cx("note-container")}
        open={openNote}
        onClose={() => setOpenNote(false)}
      >
        <div className={cx("content")}>
          <div>5 days roll call : voucher 2% </div>
          <div>10 days roll call : voucher 5% </div>
          <div>20 days roll call : voucher 10% </div>
          <div>30 days roll call : voucher 20% </div>
        </div>
        <Button large onClick={() => setOpenNote(false)}>
          Cancel
        </Button>
      </Modal>
      <Modal
        className={cx("reward-container")}
        open={openReward}
        onClose={() => setOpenReward(false)}
      >
        <div className={cx("content")}>
          <div>🎉Congratulations! You received voucher {rewardMessage}!</div>
        </div>
        <Button large onClick={() => setOpenReward(false)}>
          OK
        </Button>
      </Modal>
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
            {" "}
            Minimum: {viewVoucher?.voucherId?.minCost}$
          </div>
          <div className={cx("voucher-receive")}>
            Expire:
            {new Date(viewVoucher?.receivedAt).toLocaleString(undefined, {
              dateStyle: "short",
              timeStyle: "short",
            })}
          </div>
          <div className={cx("voucher-expire")}>
            Receive:
            {new Date(viewVoucher?.expiredAt).toLocaleString(undefined, {
              dateStyle: "short",
              timeStyle: "short",
            })}
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
