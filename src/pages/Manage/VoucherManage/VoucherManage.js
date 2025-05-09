import classNames from "classnames/bind";
import styles from "./VoucherManage.module.scss";
import NavigateManage from "../../../components/NavigateManage/NavigateManage";
import { Outlet } from "react-router-dom";

const cx = classNames.bind(styles);

function VoucherManage() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("navigate")}>
        <NavigateManage to={`usage_vouchers`}>Usage vouchers</NavigateManage>
        <NavigateManage to={`vouchers`}>Vouchers</NavigateManage>
      </div>
      <div className={cx("content")}>
        <Outlet />
      </div>
    </div>
  );
}

export default VoucherManage;
