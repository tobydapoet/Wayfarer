import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import styles from "./AboutContentItem.module.scss";
import Notice from "../Notice/Notice";

const cx = classNames.bind(styles);

function AboutContentItem({ data,onClick }) {
  const [isFlex, setIsFlex] = useState(false);
  const [deleteNotice, setDeleteNotice] = useState(false)

  const handleImgSize = (e) => {
    const width = e.target.naturalWidth;
    const height = e.target.naturalHeight;
    setIsFlex(width < height);
  };

  return (
    <>
      <div className={cx("wrapper")} onClick={onClick}>
        <div className={cx("xmark")}>
          <FontAwesomeIcon icon={faXmark} onClick={() => setDeleteNotice(true)} />
        </div>
        <div className={cx("content-container", { flex: isFlex })}>
          <div className={cx("txt-content", { flex: isFlex })}>
            <div className={cx("title")}>{data.title}</div>
            <div className={cx("describe")}>{data.describe}</div>
          </div>
          {data.image && <img src={data.image} onLoad={handleImgSize} />}
        </div>
      </div>
      <Notice open={deleteNotice} onClose={() => setDeleteNotice(false)} content="Do you want to delete this cotnent ?"/>
    </>
  );
}

export default AboutContentItem;
