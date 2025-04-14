import classNames from "classnames/bind";
import styles from "./BillForm.module.scss";
import Input from "../Input";
import Button from "../Button";
import Notice from "../Notice/Notice";
import { useContext, useMemo, useState } from "react";
import { BillContext } from "../../contexts/BillContext";

const cx = classNames.bind(styles);

function BillForm() {
  const {
    payType,
    errors,
    noticeBox,
    billInfo,
    tempBillInfo,
    totalCalculate,
    voucherSelected,
    userVoucher,
    setNoticeBox,
    handleInputChange,
    handleOnSave,
    handlePayType,
    handleVoucherClick,
  } = useContext(BillContext);

  const QRCODE = [
    {
      name: "Paypal",
      code: "https://cdn.pixabay.com/photo/2018/05/08/21/29/paypal-3384015_1280.png",
    },
    {
      name: "Visa",
      code: "https://mondialbrand.com/wp-content/uploads/2024/02/visa-logo-preview.png",
    },
    {
      name: "Mastercard",
      code: "https://athgroup.vn/upload/blocks/thumb_1920x0/ATH-kh%C3%A1m-ph%C3%A1-b%E1%BB%99-nh%E1%BA%ADn-di%E1%BB%87n-mastercard-1.png",
    },
    {
      name: "MBBank",
      code: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDbEnmjjKXOTObZ4YOqqpbcVtJjNwREceuzA&s",
    },
  ];

  return (
    <div className={cx("wrapper")}>
      <div className={cx("client")}>
        <Input
          dark
          name="client"
          frame="Client"
          value={tempBillInfo.client}
          onChange={handleInputChange}
          error={errors.client}
        />
      </div>
      <div className={cx("service", { "pointer-none": tempBillInfo.service })}>
        <Input
          dark
          name="service"
          frame="Name"
          value={tempBillInfo.service}
          onChange={handleInputChange}
          error={errors.service}
        />
      </div>
      <div className={cx("row")}>
        <div className={cx("check-in")}>
          <Input
            dark
            type="date"
            name="dateStart"
            frame="Check in"
            value={tempBillInfo.dateStart}
            onChange={handleInputChange}
            error={errors.dateStart}
          />
        </div>

        <div className={cx("check-out")}>
          <Input
            dark
            type="date"
            name="dateEnd"
            frame="Check out"
            value={tempBillInfo.dateEnd}
            onChange={handleInputChange}
            error={errors.dateEnd}
          />
        </div>

        <div className={cx("number")}>
          <Input
            dark
            type="number"
            name="number"
            frame={"Number"}
            value={tempBillInfo.number}
            onChange={handleInputChange}
            error={errors.number}
          />
        </div>
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
          {QRCODE.map((type, index) => (
            <button
              key={index}
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
            src={QRCODE.find((item) => item.name === payType)?.code}
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
