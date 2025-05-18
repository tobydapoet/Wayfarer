import classNames from "classnames/bind";
import styles from "./ReviewItem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Notice from "../Notice";
import { useState } from "react";
import StarRating from "../../utils/StartRating";

const cx = classNames.bind(styles);

function ReviewItem({ data, onDelete }) {
  const [openNotice, setOpenNotice] = useState(false);
  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("xmark")} onClick={() => setOpenNotice(true)}>
          <FontAwesomeIcon icon={faXmark} />
        </div>
        <div className={cx("container")}>
          <div className={cx("header")}>
            <div className={cx("client-info")}>
              <img src={data.clientId.avatar} />
              <div className={cx("txt-info")}>
                <div className={cx("name-client")}>{data.clientId.name}</div>
              </div>
            </div>
          </div>
          <div className={cx("rating")}>
            <StarRating rating={data.rating} />
          </div>
          <div className={cx("body")}>{data.comment}</div>
        </div>
      </div>
      <Notice
        open={openNotice}
        onClose={() => setOpenNotice(false)}
        content="Do you want to delete this review ??"
        onConfirm={onDelete}
      />
    </>
  );
}

export default ReviewItem;
