import classNames from "classnames/bind";
import styles from "./PayTypeItem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Notice from "../Notice/Notice";

const cx = classNames.bind(styles);

function PayTypeItem({ data, onClick, onDelete }) {
  const [openNotice, setOpenNotice] = useState(false);
  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("xmark")} onClick={() => setOpenNotice(true)}>
          <FontAwesomeIcon icon={faXmark} />
        </div>
        <div className={cx("content")} onClick={onClick}>
          <img src={data.image} />
          <div>{data.name}</div>
        </div>
      </div>
      <Notice
        open={openNotice}
        onClose={() => setOpenNotice(false)}
        content="Do you want to delete this contact ??"
        onConfirm={onDelete}
      />
    </>
  );
}

export default PayTypeItem;
