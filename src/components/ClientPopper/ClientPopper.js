import classNames from "classnames/bind";
import styles from "./ClientPopper.module.scss";
import { useNavigate } from "react-router-dom";
import images from "../../assets/images";

const cx = classNames.bind(styles);
function ClientPopper({ data, onClick, isDisplay }) {
  return (
    <div className={cx("wrapper", { isDisplay })} onClick={onClick}>
      <img src={data.avatar || images.noImg} />
      <div className={cx("user-txt")}>
        <div className={cx("name")}>{data.name}</div>
        <div className={cx("email")}>{data.email}</div>
      </div>
    </div>
  );
}

export default ClientPopper;
