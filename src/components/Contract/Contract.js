import classNames from "classnames/bind";
import styles from "./Contract.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Notice from "../Notice";
import Button from "../Button";

const cx = classNames.bind(styles);

function Contract({ data, onClick }) {
  const [cancelNotice,setCancelNotice] = useState(false)
  return (
    <div className={cx("wrapper")}>
      <button className={cx("back")} onClick={onClick}>
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
      <div className={cx("info")}>
        <h3> I. Thông tin đối tác:</h3>
        <div className={cx("name")}>Tên công ty: {data.name}</div>
        <div className={cx("tax")}>Mã số thuế: {data.tax}</div>
        <div className={cx("represent")}>Người đại diện: {data.represent}</div>
        <div className={cx("position")}>Chức vụ: {data.position}</div>
        <div className={cx("phone")}>Số điện thoại: {data.phone}</div>
        <div className={cx("email")}>Email: {data.email}</div>
      </div>
      <div className={cx("main-content")}>
        <h3> II. Nội dung hợp tác:</h3>
        <div className={cx("content")}>{data.content}</div>
      </div>
      <div className={cx("policy")}>
        <h3> III. Quy định về bảo mật và xử lý tranh chấp:</h3>
        <div className={cx("content")}>{data.policy}</div>
      </div>
      <div className={cx("time")}>
        <h3> IV. Thời gian hiệu lực:</h3>
        <div className={cx("start")}>Ngày bắt đầu: {data.startDate}</div>
        <div className={cx("end")}>Ngày kết thúc: {data.endDate}</div>
        <div className={cx("address")}>Nơi kí kết: {data.address}</div>
      </div>
      {data.status < 2  && <div className={cx('btn-container')}><Button rounded onClick={() => setCancelNotice(true)}>Cancel</Button></div>}
      <Notice open={cancelNotice} onClose={() => setCancelNotice(false)} content="Do you want to cancel this contract ?"/>
    </div>

  );
}

export default Contract;
