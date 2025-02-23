import classNames from "classnames/bind";
import styles from "./Input.module.scss";
import { useState } from "react";

const cx = classNames.bind(styles);

function Input({
  placeholder,
  className,
  onChange,
  value,
  name,
  error,
  dark,
  light,
  textarea
}) {

  let Comp = 'input'
  if(textarea) {
    Comp = 'textarea'
  }

  return (
    <div className={cx("wrapper")}>
      <div className={cx("input-container", { dark, light })}>
        <Comp
          placeholder={placeholder}
          className={cx(className, { dark, light })}
          onChange={onChange}
          value={value}
          name={name}
        />
      </div>
      {error && <span className={cx("error")}>{error}</span>}
    </div>
  );
}

export default Input;
