import classNames from "classnames/bind";
import styles from "./PayTypeItem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function PayTypeItem({ data, onClick }) {
  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("content")} onClick={onClick}>
          <img src={data.image} />
          <div>{data.name}</div>
        </div>
      </div>
    </>
  );
}

export default PayTypeItem;
