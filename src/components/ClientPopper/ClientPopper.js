import classNames from "classnames/bind";
import styles from "./ClientPopper.module.scss";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);
function ClientPopper({ data }) {
  const navigate = useNavigate();
  return (
    <div
      className={cx("wrapper")}
      onClick={() => navigate(`/manage/business/clients/${data.email}`)}
    >
      <img src={data.avatar} />
      <div className={cx("user-txt")}>
        <div className={cx("name")}>{data.name}</div>
        <div className={cx("email")}>{data.email}</div>
      </div>
    </div>
  );
}

export default ClientPopper;
