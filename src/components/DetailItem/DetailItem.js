import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";
import styles from "./DetailItem.module.scss";

import standardTime from "../../utils/standardTime";
import Button from "../Button";
import { useContext, useState } from "react";
import Modal from "../Modal";
import Input from "../Input";
import { FeedBackContext } from "../../contexts/FeedbackContext";

const cx = classNames.bind(styles);

function DetailItem({ data, onClick, onStatusChange, onChangeReason }) {
  const statusColors = {
    "Pending Confirmation": "pending",
    Paid: "paid",
    "In Process": "in-process",
    Completed: "completed",
    Cancelled: "cancelled",
    Refunded: "refunded",
    "Pending Refund": "wait-refund",
  };

  const [openNotice, setOpenNotice] = useState(false);
  const [rating, setRating] = useState(0);
  const {
    allFeedbacks,
    handleInputChange,
    errors,
    openFeedBack,
    handleExist,
    setOpenFeedback,
    handleCloseFeedback,
    handleCreateFeedback,
  } = useContext(FeedBackContext);

  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("header")}>
          <button className={cx("back")} onClick={onClick}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          <div className={cx("status", statusColors[data?.status])}>
            {data?.status || "-"}
          </div>
        </div>

        <div className={cx("schedule-info")}>
          <div className={cx("destination-container")}>
            <div className={cx("destination-name")}>
              {data?.scheduleId?.destinationId?.name || "-"}
            </div>
          </div>
          <div className={cx("start-date")}>
            <span>Start:</span>{" "}
            {standardTime(data?.scheduleId?.startDate) || "-"}
          </div>
          <div className={cx("end-date")}>
            <span>Finish:</span>{" "}
            {standardTime(data?.scheduleId?.endDate) || "-"}
          </div>
        </div>

        <div className={cx("body")}>
          <div className={cx("price-container")}>
            <div className={cx("txt")}>Price</div>
            <div className={cx("num")}>
              {data?.scheduleId?.destinationId?.price?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </div>
          </div>

          <div className={cx("number-container")}>
            <div className={cx("txt")}>
              {data?.scheduleId?.destinationId?.unit
                ? data.scheduleId.destinationId.unit.charAt(0).toUpperCase() +
                  data.scheduleId.destinationId.unit.slice(1)
                : "-"}
            </div>
            <div className={cx("num")}>{data.num}</div>
          </div>

          <div className={cx("overall-container")}>
            <div className={cx("txt")}>Overall</div>
            <div className={cx("overall")}>
              {Number(
                data?.scheduleId?.destinationId?.price * data.num
              ).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </div>
          </div>

          {data.usageVoucherId && (
            <div className={cx("usage-voucher-container")}>
              <div className={cx("txt")}>
                Voucher: {data?.usageVoucherId?.voucherId?.name || "-"}
              </div>
              <div className={cx("overall")}>
                -
                {data?.usageVoucherId?.voucherId?.discountValue?.toLocaleString(
                  "en-US",
                  {
                    style: "currency",
                    currency: "USD",
                  }
                )}
              </div>
            </div>
          )}

          <hr />

          <div className={cx("total-container")}>
            <div className={cx("txt")}>Total</div>
            <div className={cx("total")}>
              {isNaN(data.pay)
                ? "$0.00"
                : data.pay.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
            </div>
          </div>
        </div>
        {onStatusChange && (
          <div className={cx("btn-container")}>
            <Button rounded onClick={() => setOpenNotice(true)}>
              {data.status === "Pending Confirmation" ? "Cancel" : "Refund"}
            </Button>
          </div>
        )}
        {data.status === "Completed" && !handleExist && (
          <div className={cx("btn-container")}>
            <Button rounded onClick={() => setOpenFeedback(true)}>
              Feedback
            </Button>
          </div>
        )}
      </div>

      <Modal
        open={openNotice}
        onClose={() => setOpenNotice(false)}
        form
        style={{ width: "500px" }}
      >
        <Input
          dark
          frame="Reason"
          placeholder="Reason..."
          textarea
          onChange={onChangeReason}
        />
        <div className={cx("confirm-container")}>
          <Button rounded onClick={onStatusChange}>
            Confirm
          </Button>
        </div>
      </Modal>
      <Modal
        open={openFeedBack}
        onClose={() => handleCloseFeedback()}
        form
        style={{ width: "500px" }}
      >
        <div className={cx("feedback-modal")}>
          <div className={cx("stars-container")}>
            <div className={cx("stars")}>
              {[1, 2, 3, 4, 5].map((value) => (
                <span
                  key={value}
                  onClick={() => {
                    setRating(value);
                    handleInputChange({
                      target: {
                        name: "rating",
                        value: value,
                      },
                    });
                  }}
                >
                  <FontAwesomeIcon
                    icon={value <= rating ? faStar : emptyStar}
                    className={cx("star")}
                  />
                </span>
              ))}
            </div>
            {errors?.rating && (
              <p className={cx("error-text")}>{errors?.rating}</p>
            )}
          </div>

          <Input
            dark
            frame="Comment"
            placeholder="Your comment..."
            name="comment"
            textarea
            onChange={handleInputChange}
            error={errors?.comment}
          />

          <div className={cx("confirm-container")}>
            <Button
              rounded
              onClick={() => {
                handleCreateFeedback();
                setRating(0);
                setOpenFeedback(false);
              }}
            >
              Submit
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default DetailItem;
