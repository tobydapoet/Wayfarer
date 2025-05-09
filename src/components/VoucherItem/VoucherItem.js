import classNames from "classnames/bind";
import styles from "./VoucherItem.module.scss";

const cx = classNames.bind(styles);

function VoucherItem({ data, onClick, minimal }) {
  return (
    <div className={cx("wrapper", { isMinimal: minimal })} onClick={onClick}>
      <div className={cx("voucher-code")}>
        {data.name || data.voucherId.name}
      </div>
      <div className={cx("voucher-value")}>
        sale: {data.discountValue || data.voucherId.discountValue}$
      </div>
      <div className={cx("voucher-min")}>
        at least : {data.minCost || data.voucherId.minCost}$
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
