import classNames from "classnames/bind";
import styles from "./Processing.module.scss";
import ProcessingItem from "../../../components/ProcessingItem/ProcessingItem";
import { useContext, useEffect, useState } from "react";
import DetailItem from "../../../components/DetailItem/DetailItem";
import { BillContext } from "../../../contexts/BillContext";
import { FeedBackContext } from "../../../contexts/FeedbackContext";

const cx = classNames.bind(styles);

const user =
  JSON.parse(localStorage.getItem("user")) ||
  JSON.parse(sessionStorage.getItem("user"));

function Processing() {
  const { allBills, handleUpdateStatusBill, setBillInfo, billInfo } =
    useContext(BillContext);

  useEffect(() => {}, []);

  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("summary", { collapsed: billInfo?._id })}>
          {allBills
            .filter((bills) => bills.clientId._id === user._id)
            .map((TourItem, index) => (
              <ProcessingItem
                key={index}
                data={TourItem}
                onClick={() => setBillInfo(TourItem)}
              />
            ))}
        </div>
        <div className={cx("details", { expanded: billInfo?._id })}>
          {billInfo?._id && (
            <DetailItem
              data={billInfo}
              onClick={(e) => {
                e.stopPropagation();
                setBillInfo(null);
              }}
              onChangeReason={(e) =>
                setBillInfo((prev) => ({
                  ...prev,
                  cancelReason: e.target.value,
                }))
              }
              onStatusChange={
                ["Pending Confirmation", "Paid"].includes(billInfo.status)
                  ? () => {
                      if (billInfo.status === "Pending Confirmation") {
                        handleUpdateStatusBill(
                          billInfo._id,
                          "Cancelled",
                          billInfo.cancelReason
                        );
                      } else if (billInfo.status === "Paid") {
                        handleUpdateStatusBill(
                          billInfo._id,
                          "Pending Refund",
                          billInfo.cancelReason
                        );
                      }
                    }
                  : undefined
              }
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Processing;
