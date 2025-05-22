import styles from "./BillEdit.module.scss";
import classNames from "classnames/bind";
import { useContext, useEffect, useRef, useState } from "react";
import { BillContext } from "../../../../contexts/BillContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import standardTime from "../../../../utils/standardTime";
import Modal from "../../../../components/Modal";
import HeadlessTippy from "@tippyjs/react/headless";
import Popper from "../../../../components/Popper";
import { ScheduleContext } from "../../../../contexts/ScheduleContext";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";

const cx = classNames.bind(styles);

function BillEdit() {
  const [openEditForm, setOpenEditForm] = useState(false);
  const inputRef = useRef(null);
  const [isVisible, setIsvisible] = useState(false);

  const {
    allBills,
    errors,
    billInfo,
    totalTempCalculate,
    handleSchedule,
    handleInputChange,
    setBillInfo,
    handleUpdateBill,
    handleUpdateStatusBill,
  } = useContext(BillContext);

  const { allSchedules, edittingSchedule, setEdittingSchedule } =
    useContext(ScheduleContext);

  useEffect(() => {
    if (billInfo?.scheduleId) {
      setEdittingSchedule(billInfo.scheduleId);
    }
    console.log(billInfo);
  }, [billInfo, setEdittingSchedule]);

  const getSafeNumber = (value) => Number(value) || 0;

  const price = getSafeNumber(billInfo?.scheduleId?.destinationId?.price);
  const num = getSafeNumber(billInfo?.num);
  const discount = getSafeNumber(
    billInfo?.usageVoucherId?.voucherId?.discountValue
  );

  useEffect(() => console.log(billInfo), [billInfo]);

  const selectedSchedule = allSchedules.find(
    (schedule) =>
      schedule._id ===
      (typeof billInfo.scheduleId === "string"
        ? billInfo.scheduleId
        : billInfo.scheduleId?._id)
  );

  const tempPrice = selectedSchedule?.destinationId?.price || 0;
  const destinationId = billInfo?.scheduleId?.destinationId?._id;

  const statusColors = {
    "Pending Confirmation": "pending",
    Paid: "paid",
    "In Process": "in-process",
    Completed: "completed",
    Cancelled: "cancelled",
    Refunded: "refunded",
    "Pending Refund": "wait-refund",
  };

  const today = new Date();

  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("header")}>
          <div className={cx("client-info")}>
            <img src={billInfo.clientId.avatar} alt="client avatar" />
            <div className={cx("txt-info")}>
              <div className={cx("name-client")}>{billInfo.clientId.name}</div>
              <div className={cx("email-client")}>
                {billInfo.clientId.email}
              </div>
            </div>
          </div>
          {(billInfo.status === "Pending Confirmation" ||
            billInfo.status === "Paid") && (
            <div
              className={cx("btn-icon-container")}
              onClick={() => setOpenEditForm(true)}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </div>
          )}
        </div>

        <div className={cx("schedule-info")}>
          <div className={cx("destination-container")}>
            <div className={cx("destination-name")}>
              {billInfo?.scheduleId?.destinationId?.name || "-"}
            </div>
            <div className={cx("status", statusColors[billInfo?.status])}>
              {billInfo?.status || "-"}
            </div>
          </div>
          <div className={cx("start-date")}>
            <span>Start:</span>{" "}
            {standardTime(billInfo?.scheduleId?.startDate) || "-"}
          </div>
          <div className={cx("end-date")}>
            <span>Finish:</span>{" "}
            {standardTime(billInfo?.scheduleId?.endDate) || "-"}
          </div>
        </div>

        <div className={cx("body")}>
          <div className={cx("price-container")}>
            <div className={cx("txt")}>Price</div>
            <div className={cx("num")}>
              {price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </div>
          </div>

          <div className={cx("number-container")}>
            <div className={cx("txt")}>
              {billInfo?.scheduleId?.destinationId?.unit
                ? billInfo.scheduleId.destinationId.unit
                    .charAt(0)
                    .toUpperCase() +
                  billInfo.scheduleId.destinationId.unit.slice(1)
                : "-"}
            </div>
            <div className={cx("num")}>{num}</div>
          </div>

          <div className={cx("overall-container")}>
            <div className={cx("txt")}>Overall</div>
            <div className={cx("overall")}>
              {(price * num).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </div>
          </div>

          {billInfo.usageVoucherId && (
            <div className={cx("usage-voucher-container")}>
              <div className={cx("txt")}>
                Voucher: {billInfo?.usageVoucherId?.voucherId?.name || "-"}
              </div>
              <div className={cx("overall")}>
                -
                {discount.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </div>
            </div>
          )}

          <hr />

          <div className={cx("total-container")}>
            <div className={cx("txt")}>Total</div>
            <div className={cx("total")}>
              {isNaN(billInfo.pay)
                ? "$0.00"
                : billInfo.pay.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
            </div>
          </div>
        </div>
        {billInfo.status === "Pending Confirmation" && (
          <div className={cx("btn-container")}>
            <Button
              rounded
              onClick={() => {
                handleUpdateStatusBill(billInfo._id, "Paid");
              }}
            >
              Confirm
            </Button>
          </div>
        )}
        {billInfo.status === "Pending Refund" && (
          <div className={cx("btn-container")}>
            <Button
              rounded
              onClick={() => {
                handleUpdateStatusBill(billInfo._id, "Refunded");
              }}
            >
              Confirm
            </Button>
          </div>
        )}
      </div>

      <Modal
        form
        open={openEditForm}
        onClose={() => setOpenEditForm(false)}
        style={{ width: "500px" }}
      >
        <div className={cx("row")}>
          <div className={cx("time")}>
            <HeadlessTippy
              interactive
              visible={isVisible}
              placement="bottom"
              render={(attrs) => (
                <div
                  className={cx("result-container")}
                  tabIndex="-1"
                  {...attrs}
                  style={{ width: inputRef.current?.offsetWidth || "auto" }}
                >
                  <Popper className={cx("result")}>
                    {allSchedules
                      .filter(
                        (schedule) =>
                          schedule.destinationId._id === destinationId &&
                          schedule?.status !== false &&
                          new Date(schedule.startDate) > today
                      )
                      .map((schedule) => (
                        <div
                          key={schedule._id}
                          className={cx("result-item")}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            handleSchedule(schedule, setBillInfo);
                            setIsvisible(false);
                          }}
                        >
                          <div className={cx("time")}>
                            <div className={cx("start-time")}>
                              {standardTime(schedule.startDate)}
                            </div>
                            <span> - </span>
                            <div className={cx("end-time")}>
                              {standardTime(schedule.endDate)}
                            </div>
                          </div>
                          <div className={cx("member")}>
                            {allBills
                              .filter(
                                (bill) =>
                                  bill.scheduleId._id === schedule._id &&
                                  bill.status !== "Cancelled" &&
                                  bill.status !== "Refunded"
                              )
                              .reduce((sum, bill) => sum + bill.num, 0)}
                            /{schedule.amount}
                          </div>
                        </div>
                      ))}
                  </Popper>
                </div>
              )}
            >
              <div className={cx("schedule-container")} ref={inputRef}>
                <div className={cx("frame")}>Schedule</div>
                <input
                  name="schedule"
                  className={cx("schedule")}
                  readOnly
                  value={
                    edittingSchedule?._id
                      ? `${standardTime(
                          edittingSchedule.startDate
                        )} - ${standardTime(edittingSchedule.endDate)}`
                      : ""
                  }
                  onClick={() => setIsvisible(true)}
                  onBlur={() => setIsvisible(false)}
                />
              </div>
            </HeadlessTippy>
            {errors.scheduleId && (
              <div className={cx("error-text")}>{errors.scheduleId}</div>
            )}
          </div>

          <div className={cx("number")}>
            <Input
              dark
              type="number"
              name="num"
              frame={
                billInfo?.scheduleId?.destinationId?.unit
                  ? billInfo.scheduleId.destinationId.unit
                      .charAt(0)
                      .toUpperCase() +
                    billInfo.scheduleId.destinationId.unit.slice(1)
                  : ""
              }
              value={billInfo.num}
              onChange={(e) => handleInputChange(e, setBillInfo)}
              error={errors.num}
            />
          </div>
          <div className={cx("total")}>
            <div className={cx("original-price")}>
              <span>Total price:</span>
              {(tempPrice * Number(billInfo.num)).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </div>
            <div className={cx("sale-value")}>
              <span>Sale value:</span>
              {Number(
                billInfo?.usageVoucherId?.voucherId?.discountValue || 0
              ).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              }) || "$0.00"}
            </div>
            <hr></hr>
            <div className={cx("total-value")}>
              <span>Total payment:</span>
              {totalTempCalculate?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              }) || "$0.00"}
            </div>
          </div>
          <div className={cx("btn-container")}>
            <Button
              rounded
              onClick={() => {
                handleUpdateBill();
                setOpenEditForm(false);
              }}
            >
              Save
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default BillEdit;
