import classNames from "classnames/bind";
import styles from "./Business.module.scss";
import { Outlet, useParams } from "react-router-dom";
import NavigateManage from "../../../components/NavigateManage/NavigateManage";

const cx = classNames.bind(styles);

function Business() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("navigate")}>
        <NavigateManage to={`dashboard`}>Dashboard</NavigateManage>
        <NavigateManage to={`staffs`}>Staffs</NavigateManage>
        <NavigateManage to={`clients`}>Clients</NavigateManage>
      </div>
      <div className={cx("content")}>
        <Outlet />
      </div>
    </div>
  );
}

export default Business;
