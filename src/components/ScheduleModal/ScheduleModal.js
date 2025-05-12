import classNames from "classnames/bind";
import styles from "./ScheduleModal.module.scss";
import Modal from "../Modal";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ScheduleContext } from "../../contexts/ScheduleContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import standardTime from "../../utils/standardTime";

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
          <div className={cx("start-time")}>
            <input
              type="datetime-local"
              value={selectedSchedule.startDate || ""}
              onChange={handleInputChange}
              className={cx("input")}
              name="startDate"
            />
            {errors?.create?.startDate && (
              <div className={cx("error-text")}>
                {errors?.create?.startDate && (
                  <div>{errors.create.startDate}</div>
                )}
              </div>
            )}
          </div>

          <div className={cx("end-time")}>
            <input
              type="datetime-local"
              value={selectedSchedule.endDate || ""}
              onChange={handleInputChange}
              className={cx("input")}
              name="endDate"
            />
            {errors?.create?.endDate && (
              <div className={cx("error-text")}>
                {errors?.create?.endDate && <div>{errors.create.endDate}</div>}
              </div>
            )}
          </div>
          <button
            className={cx("create-btn")}
            onClick={() => handleCreateSchedule()}
          >
            Create
          </button>
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
                        Bắt đầu: {standardTime(schedule.startDate)}
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
                        Kết thúc: {standardTime(schedule.endDate)}
                      </div>
                    )}
                    {errors?.edit?.[schedule._id]?.endDate && (
                      <div className={cx("error-text")}>
                        {errors.edit[schedule._id].endDate}
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
