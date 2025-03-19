import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HomeContentItem.module.scss";
import Notice from "../Notice";

const cx = classNames.bind(styles);

function HomeContentItem({ data }) {
  const [deleteNotice, setDeleteNotice] = useState(false);
  const navigate = useNavigate();

  const handleRowClick = () => {
    navigate(`${data.title}`);
  };

  return (
    <div className={cx("wrapper")}>
      <div
        className={cx("container")}
        onClick={handleRowClick}
        style={{ cursor: "pointer" }}
      >
        <div
          className={cx("delete")}
          onClick={(e) => {
            e.stopPropagation();
            setDeleteNotice(true);
          }}
        >
          <FontAwesomeIcon icon={faXmark} />
        </div>
        <div className={cx("title")}>{data.title}</div>
        <div className={cx("describe")}>{data.describe}</div>
        {data.images && (
          <div className={cx("images-container")}>
            {data.images.map((image, index) => (
              <img className={cx("image")} src={image} key={index} />
            ))}
          </div>
        )}
      </div>
      <Notice
        open={deleteNotice}
        onClose={() => setDeleteNotice(false)}
        content=" Do you want to delete this content ?"
      />
    </div>
  );
}

export default HomeContentItem;
