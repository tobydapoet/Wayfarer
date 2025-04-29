import { useState } from "react";
import classNames from "classnames/bind";
import styles from "./BlogManageItem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Notice from "../Notice";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function ContentManageItem({ data, onClick }) {
  const [openNotice, setOpenNotice] = useState(false);
  const blogTime = new Date(data.createdAt);

  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("xmark")}>
          <FontAwesomeIcon icon={faXmark} onClick={() => setOpenNotice(true)} />
        </div>
        <div className={cx("container")} onClick={onClick}>
          <div className={cx("img-container")}>
            <img src={data.image} />
          </div>
          <div className={cx("txt-content")}>
            <div className={cx("title")}>{data.title}</div>
            <div className={cx("owner")}>{data.clientId.name}</div>
            <div className={cx("created-time")}>
              {blogTime.toLocaleDateString()}
            </div>
            <div
              className={cx("status", {
                approved: data.status === true,
                notApproved: data.status !== true,
              })}
            >
              {data.status === true ? "Approved" : "Not approved yet"}
            </div>
          </div>
        </div>
      </div>
      <Notice
        open={openNotice}
        onClose={() => setOpenNotice(false)}
        content="Do you want to delete this blog ?"
      />
    </>
  );
}

export default ContentManageItem;
