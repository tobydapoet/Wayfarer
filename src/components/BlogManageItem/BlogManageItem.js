import { useState } from "react";
import classNames from "classnames/bind";
import styles from "./BlogManageItem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Notice from "../Notice";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function ContentManageItem({ data }) {
  const [openNotice, setOpenNotice] = useState(false);
  const navigate = useNavigate();

  const handleRowClick = () => {
    navigate(`${data.title}`);
  };

  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("xmark")}>
          <FontAwesomeIcon icon={faXmark} onClick={() => setOpenNotice(true)} />
        </div>
        <div className={cx("container")} onClick={handleRowClick}>
          <div className={cx("img-container")}>
            <img src={data.image} />
          </div>
          <div className={cx("txt-content")}>
            <div className={cx("title")}>{data.title}</div>
            <div className={cx("owner")}>{data.createdBy}</div>
            <div className={cx("created-time")}>{data.createdAt}</div>
            <div
              className={cx("status", {
                approved: data.status === true,
                notApproved: data.status !== true,
              })}
            >
              {data.status == true ? "Approved" : "Not approved yet"}
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
