import classNames from "classnames/bind";
import styles from "./Business.module.scss";
import { Outlet, useLocation, useParams } from "react-router-dom";
import NavigateManage from "../../../components/NavigateManage/NavigateManage";
import { StaffProvider } from "../../../contexts/StaffContext";
import { ClientProvider } from "../../../contexts/ClientContext";
import { Fragment } from "react";

const cx = classNames.bind(styles);

function Business() {
  const location = useLocation();
  let Wrapper = Fragment;
  if (location.pathname === "/manage/business/staffs") {
    Wrapper = StaffProvider;
  } else if (location.pathname === "/manage/business/clients") {
    Wrapper = ClientProvider;
  }
  return (
    <div className={cx("wrapper")}>
      <div className={cx("navigate")}>
        <NavigateManage to={`dashboard`}>Dashboard</NavigateManage>
        <NavigateManage to={`staffs`}>Staffs</NavigateManage>
        <NavigateManage to={`clients`}>Clients</NavigateManage>
      </div>
      <div className={cx("content")}>
        <Wrapper>
          <Outlet />
        </Wrapper>
      </div>
    </div>
  );
}

export default Business;
