import classNames from "classnames/bind";
import styles from "./Input.module.scss";
import { useState } from "react";

const cx = classNames.bind(styles);

function Input({ placeholder, className, onChange, value, name, error }) {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("input-container")}>
        <input
          placeholder={placeholder}
          className={className}
          onChange={onChange}
          value={value}
          name={name}
        />
      </div>
      <span className={cx("error")}>{error}</span>
    </div>
  );
}

export default Input;
