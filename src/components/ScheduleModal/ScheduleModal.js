import classNames from "classnames/bind";
import styles from "./ScheduleModal.module.scss";
import Modal from "../Modal";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ScheduleContext } from "../../contexts/ScheduleContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faPlus,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import standardTime from "../../utils/standardTime";
import { BillContext } from "../../contexts/BillContext";

const cx = classNames.bind(styles);

function ScheduleModal({ open, onClose }) {
  const { id } = useParams();
  const {
    allSchedules,
    selectedSchedule,
    edittingSchedule,
    errors,
    handleResetErrors,
    handleRowClick,
    handleInputChange,
    handleEditInputChange,
    handleCreateSchedule,
    handleUpdateSchedule,
    handleDeleteSchedule,
  } = useContext(ScheduleContext);

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const [editScheduleId, setEditScheduleId] = useState(null);
  const [editField, setEditField] = useState("");
  const { allBills } = useContext(BillContext);

  return (
    <Modal
      form
      open={open}
      onClose={() => {
        handleResetErrors();
        onClose();
      }}
      style={{ width: "550px" }}
    >
      <div className={cx("wrapper")}>
        <div className={cx("new-schedule")}>
          <div className={cx("new-text")}>
            <div className={cx("start-time")}>
              <div className={cx("frame")}>Start:</div>
              <input
                type="datetime-local"
                value={selectedSchedule.startDate || ""}
                onChange={handleInputChange}
                className={cx("input")}
                name="startDate"
              />
            </div>
            {errors?.create?.startDate && (
              <div className={cx("error-text")}>
                {errors?.create?.startDate && (
                  <div>{errors.create.startDate}</div>
                )}
              </div>
            )}

            <div className={cx("end-time")}>
              <div className={cx("frame")}>End:</div>

              <input
                type="datetime-local"
                value={selectedSchedule.endDate || ""}
                onChange={handleInputChange}
                className={cx("input")}
                name="endDate"
              />
            </div>
            {errors?.create?.endDate && (
              <div className={cx("error-text")}>
                {errors?.create?.endDate && <div>{errors.create.endDate}</div>}
              </div>
            )}

            <div className={cx("amount")}>
              <div className={cx("frame")}>Amount:</div>
              <input
                type="number"
                value={selectedSchedule.amount || ""}
                onChange={handleInputChange}
                className={cx("amount-input")}
                placeholder="Amount..."
                name="amount"
              />
            </div>
            {errors?.create?.amount && (
              <div className={cx("error-text")}>
                {errors?.create?.amount && <div>{errors.create.amount}</div>}
              </div>
            )}
          </div>
          <div
            className={cx("create-btn")}
            onClick={() => handleCreateSchedule()}
          >
            <FontAwesomeIcon icon={faPlus} />
          </div>
        </div>

        <div className={cx("schedule-list")}>
          {allSchedules
            .filter((schedule) => schedule.destinationId._id === id)
            .map((schedule) => (
              <div
                key={schedule._id}
                className={cx("schedule-item")}
                onClick={() => handleRowClick(schedule)}
              >
                <FontAwesomeIcon
                  icon={schedule.status ? faCheck : faXmark}
                  className={cx("status-icon", { inactive: !schedule.status })}
                />
                <div className={cx("date-group")}>
                  <>
                    {editScheduleId === schedule._id &&
                    edittingSchedule.status === true &&
                    editField === "startDate" ? (
                      <input
                        name="startDate"
                        type="datetime-local"
                        value={
                          edittingSchedule?.startDate
                            ? edittingSchedule.startDate.slice(0, 16)
                            : ""
                        }
                        onChange={handleEditInputChange}
                        onBlur={() => {
                          setEditScheduleId(null);
                          setEditField("");
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleUpdateSchedule();
                            setEditScheduleId(null);
                            setEditField("");
                          }
                          if (e.key === "Escape") {
                            setEditScheduleId(null);
                            setEditField("");
                          }
                        }}
                      />
                    ) : (
                      <div
                        className={cx("start-div")}
                        onClick={() => {
                          setEditScheduleId(schedule._id);
                          setEditField("startDate");
                        }}
                      >
                        Start: {standardTime(schedule.startDate)}
                      </div>
                    )}
                    {errors?.edit?.[schedule._id]?.startDate && (
                      <div className={cx("error-text")}>
                        {errors.edit[schedule._id].startDate}
                      </div>
                    )}
                  </>

                  <>
                    {editScheduleId === schedule._id &&
                    edittingSchedule.status === true &&
                    editField === "endDate" ? (
                      <input
                        name="endDate"
                        type="datetime-local"
                        value={
                          edittingSchedule?.endDate
                            ? edittingSchedule.endDate.slice(0, 16)
                            : ""
                        }
                        onChange={handleEditInputChange}
                        onBlur={() => {
                          setEditScheduleId(null);
                          setEditField("");
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleUpdateSchedule();
                            setEditScheduleId(null);
                            setEditField("");
                          }
                          if (e.key === "Escape") {
                            setEditScheduleId(null);
                            setEditField("");
                          }
                        }}
                      />
                    ) : (
                      <div
                        className={cx("end-div")}
                        onClick={() => {
                          setEditScheduleId(schedule._id);
                          setEditField("endDate");
                        }}
                      >
                        Finish: {standardTime(schedule.endDate)}
                      </div>
                    )}
                    {errors?.edit?.[schedule._id]?.endDate && (
                      <div className={cx("error-text")}>
                        {errors.edit[schedule._id].endDate}
                      </div>
                    )}
                  </>

                  <>
                    {editScheduleId === schedule._id &&
                    edittingSchedule.status === true &&
                    editField === "amount" ? (
                      <input
                        name="amount"
                        type="number"
                        value={edittingSchedule.amount}
                        onChange={handleEditInputChange}
                        onBlur={() => {
                          setEditScheduleId(null);
                          setEditField("");
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleUpdateSchedule();
                            setEditScheduleId(null);
                            setEditField("");
                          }
                          if (e.key === "Escape") {
                            setEditScheduleId(null);
                            setEditField("");
                          }
                        }}
                      />
                    ) : (
                      <div
                        className={cx("end-div")}
                        onClick={() => {
                          setEditScheduleId(schedule._id);
                          setEditField("amount");
                        }}
                      >
                        Amount:{" "}
                        {allBills
                          .filter(
                            (bill) => bill.scheduleId._id === schedule._id
                          )
                          .reduce((sum, bill) => sum + bill.num, 0)}
                        /{schedule.amount}
                      </div>
                    )}
                    {errors?.edit?.[schedule._id]?.amount && (
                      <div className={cx("error-text")}>
                        {errors.edit[schedule._id].amount}
                      </div>
                    )}
                  </>
                </div>
                <FontAwesomeIcon
                  icon={faTrash}
                  className={cx("trash-icon")}
                  onClick={() => handleDeleteSchedule(schedule._id)}
                />
              </div>
            ))}
        </div>
      </div>
    </Modal>
  );
}

export default ScheduleModal;
