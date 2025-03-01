import classNames from "classnames/bind";
import styles from "./BonusPoint.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faQuestion,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../../../components/Button";
import { useEffect, useRef, useState } from "react";
import Modal from "../../../components/Modal";

const cx = classNames.bind(styles);

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
  const days = getDaysinMounth(year, month);

  const [attendance, setAttendance] = useState({});
  const [openNote, setOpenNote] = useState(false);
  const [openReward, setOpenReward] = useState(false);
  const [loggedMilestones, setLoggedMilestones] = useState([]);
  const [rewardMessage, setRewardMessage] = useState("");
  const [limitation, setLimitaion] = useState([]);

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
    5: "2%",
    10: "5%",
    20: "10%",
    30: "20%",
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
          console.log(limitation)


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

  const handleOpenNote = () => {
    setOpenNote(true);
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("calendar")}>
        {days.map((day) => (
          <div
            className={cx("day")}
            key={day}
          >
            <div className={cx("day-name")}>{day}</div>
            {attendance[day] === "attended" && (
              <FontAwesomeIcon
                className={cx("check")}
                style={{ color: "green", fontSize: "40px" }}
                icon={faCheck}
              />
            )}
            {attendance[day] === "missed" && (
              <FontAwesomeIcon
                className={cx("xmark")}
                style={{ color: "red", fontSize: "40px" }}
                icon={faXmark}
              />
            )}
          </div>
        ))}
      </div>
      <div className={cx("check-container")}>
        <Button large onClick={() => handleAttendance(dayRef.current)} disabled={attendance[dayRef.current] === "attended"}>
          Check
        </Button>
        <button onClick={handleOpenNote} className={cx("note")}>
          <FontAwesomeIcon icon={faQuestion} />
        </button>
      </div>
      <div className={cx("voucher-wrapper")}>
        {loggedMilestones.map((voucher, index) => (
          <div key={index} className={cx("voucher-container")}>
            <div class={cx("voucher-code")}>SAVE{voucher}DAYS</div>
            <div class={cx("voucher-details")}>
              Use this code to get {rewardText[voucher] || "a discount"} off on your next purchase.
            </div>
            <div className={cx("voucher-footer")}>
              Valid until:{" "}
              {limitation.length > 0
                ? `${limitation[index].month}-${limitation[index].day}-${limitation[index].year}`
                : "N/A"}
            </div>
          </div>
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
    </div>
  );
}

export default BonusPoint;
