import classNames from "classnames/bind";
import styles from "./AccountItem.module.scss";
import { Link } from "react-router-dom";
import images from "../../assets/images";

const cx = classNames.bind(styles);

function AccountItem({ data }) {
  return (
    <Link to={`/${data.email}`} className={cx("wrapper")}>
      <img src={data.avatar || images.noImg} className={cx("avatar")} />
      <div className={cx("email")}>{data.email}</div>
    </Link>
  );
}

export default AccountItem;
