import { useState } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import styles from "./Member.module.scss";

const cx = classNames.bind(styles);

function Member({ data }) {
  return (
    <>
      <div className={cx("wrapper")}>
        <img src={data.avatar} />
        <div>{data.name}</div>
      </div>
    </>
  );
}

export default Member;
