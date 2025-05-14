import classNames from "classnames/bind";
import styles from "./BillForm.module.scss";
import Input from "../Input";
import Button from "../Button";
import Notice from "../Notice/Notice";
import { useContext, useMemo, useState } from "react";
import { BillContext } from "../../contexts/BillContext";
import { PayTypeContext } from "../../contexts/PayTypeContext";
import { DestinationContext } from "../../contexts/DestinationContext";

const cx = classNames.bind(styles);

function BillForm() {
  const {
    payType,
    errors,
    noticeBox,
    billInfo,
    totalCalculate,
    voucherSelected,
    userVoucher,
    setNoticeBox,
    handleInputChange,
    handleOnSave,
    handlePayType,
    handleVoucherClick,
  } = useContext(BillContext);

  const { allPayTypes } = useContext(PayTypeContext);
  const { handleSelectedDestination } = useContext(DestinationContext);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("service", { "pointer-none": billInfo.service })}>
        <div>{}</div>
      </div>

      <div className={cx("number")}>
        <Input
          dark
          type="number"
          name="number"
          frame={"Number"}
          value={billInfo.number}
          onChange={handleInputChange}
          error={errors.number}
        />
      </div>

      {userVoucher && (
        <div className={cx("voucher-wrapper")}>
          {userVoucher.map((voucher, index) => (
            <div
              key={index}
              className={cx("voucher-container", {
                selected: voucher.value === voucherSelected,
              })}
              onClick={() => handleVoucherClick(voucher.value)}
            >
              <div className={cx("voucher-code")}>{voucher.name}</div>
              <div className={cx("voucher-details")}>
                Use this code to get{" "}
                {`${voucher.value.toLocaleString("vi-VN")} VND ` ||
                  "a discount "}
                off on your next purchase.
              </div>
            </div>
          ))}
        </div>
      )}
      <div className={cx("total")}>
        <div className={cx("total-value")}>
          Total: {totalCalculate.toLocaleString("vi-VN")}
        </div>
      </div>
      <div className={cx("pay-type")}>
        <div className={cx("pay-title")}>Payment method</div>
        <div className={cx("type-choice")}>
          {allPayTypes.map((type) => (
            <button
              key={type._id}
              onClick={() => {
                handlePayType(type.name);
              }}
            >
              {type.name}
            </button>
          ))}
        </div>
        {payType && (
          <img
            src={allPayTypes.find((type) => type.name === payType)?.image}
            alt="Payment type"
          />
        )}
      </div>

      <div className={cx("btn-wrapper")}>
        <Button large onClick={handleOnSave}>
          Confirm
        </Button>
      </div>
      <Notice
        warn
        open={noticeBox}
        onClose={() => setNoticeBox(false)}
        content={
          errors.payment ? errors.payment : "Something wrong with your bill !"
        }
      />
    </div>
  );
}

export default BillForm;
