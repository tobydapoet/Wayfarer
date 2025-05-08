import classNames from "classnames/bind";
import styles from "./VoucherItem.module.scss";

const cx = classNames.bind(styles);

function VoucherItem({ data, onClick }) {
  return (
    <div className={cx("wrapper")} onClick={onClick}>
      <div className={cx("voucher-code")}>{data.name}</div>
      <div className={cx("voucher-value")}>sale: {data.discountValue}$</div>
      <div className={cx("voucher-min")}>at least : {data.minCost}$</div>
      <div className={cx("voucher-details")}>{data.description}</div>
    </div>
  );
}

export default VoucherItem;
