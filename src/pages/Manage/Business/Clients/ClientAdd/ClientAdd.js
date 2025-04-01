import classNames from "classnames/bind";
import style from "./ClientAdd.module.scss";
import UserProfile from "../../../../../components/UserProfile";

const cx = classNames.bind(style);

function ClientAdd() {
  return (
    <div className={cx("wrapper")}>
      <UserProfile />
    </div>
  );
}
export default ClientAdd;
