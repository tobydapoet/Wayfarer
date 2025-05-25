import classNames from "classnames/bind";
import styles from "./Manage.module.scss";
import Sidebar from "../../components/Sidebar";
import { Outlet } from "react-router-dom";
import { AccountProvider } from "../../contexts/AccountContext";
import ScrollHeader from "../../components/ScrollHeader";

const cx = classNames.bind(styles);
function Manage() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("sidebar-container")}>
        <AccountProvider>
          <Sidebar management dark />
        </AccountProvider>
      </div>
      <div className={cx("content")}>
        <Outlet />
      </div>
    </div>
  );
}

export default Manage;
