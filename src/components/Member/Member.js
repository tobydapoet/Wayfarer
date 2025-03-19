import { useState } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import styles from "./Member.module.scss";
import DeleteNotice from "../Notice/Notice";

const cx = classNames.bind(styles);

function Member({ data, manage, onClick }) {
  const [openNotice, setOpenNotice] = useState(false);

  return (
    <>
      <div className={cx("wrapper")} onClick={onClick}>
        <img src={data.avatar} />
        <div>{data.name}</div>
        {manage && (
          <FontAwesomeIcon
            icon={faXmark}
            className={cx("xmark")}
            onClick={(e) => {
              e.stopPropagation()
              setOpenNotice(true);
            }}
          />
        )}
      </div>
      <DeleteNotice
        open={openNotice}
        onClose={() => setOpenNotice(false)}
        content="do you want this member's content ?"
      />
    </>
  );
}

export default Member;
