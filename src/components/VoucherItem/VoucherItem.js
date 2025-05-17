import classNames from "classnames/bind";
import styles from "./VoucherItem.module.scss";
import { useState } from "react";

const cx = classNames.bind(styles);

function VoucherItem({ data, onClick, minimal, active }) {
  const handleClick = () => {
    if (typeof onClick === "function") {
      onClick(data);
    }
  };
  return (
    <div
      className={cx("wrapper", {
        isMinimal: minimal,
        isActive: active,
      })}
      onClick={handleClick}
    >
      <div className={cx("voucher-code")}>
        {data.name || data.voucherId.name}
      </div>
      <div className={cx("voucher-value")}>
        sale: {data.discountValue || data?.voucherId?.discountValue}$
      </div>
      <div className={cx("voucher-min")}>
        at least : {Number(data.minCost) || Number(data?.voucherId?.minCost)}$
      </div>
      {!minimal && (
        <div className={cx("voucher-details")}>
          {data.description || data.voucherId.description}
        </div>
      )}
    </div>
  );
}

export default VoucherItem;
