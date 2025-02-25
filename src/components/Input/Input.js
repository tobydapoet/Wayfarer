import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faSquareCheck,
  faSquareXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import styles from "./Input.module.scss";

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
  textarea,
  type,
  readOnly = true,
}) {
  const [isReadOnly, setIsReadOnly] = useState(readOnly);
  const [localValue, setLocalValue] = useState(value);
  const [tempValue, setTempValue] = useState(value);

  let Comp = "input";
  if (textarea) {
    Comp = "textarea";
  }

  const inputRef = useRef();


  const enableEditting = () => {
    setIsReadOnly(false);
    inputRef.current.focus();
  };

  const cancelEditting = () => {
    setLocalValue(tempValue);
    setIsReadOnly(true);
  };

  const finishEditting = () => {
    if (onChange) {
      onChange({ target: { name, value: localValue } });
    }
    setIsReadOnly(true);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("input-container", { dark, light })}>
        <Comp
          placeholder={placeholder}
          className={cx(className, { dark, light, readOnly: isReadOnly })}
          onChange={(e) => setLocalValue(e.target.value)}
          value={localValue}
          name={name}
          type={type}
          ref={inputRef}
        />
      </div>
      {error && <span className={cx("error")}>{error}</span>}
      {isReadOnly ? (
        <FontAwesomeIcon
          className={cx("edit")}
          icon={faPenToSquare}
          onClick={enableEditting}
        />
      ) : (
        <div className={cx("edit-mode")}>
          <FontAwesomeIcon
            className={cx("check")}
            icon={faSquareCheck}
            onClick={finishEditting}
          />
          <FontAwesomeIcon
            className={cx("cancel")}
            icon={faSquareXmark}
            onClick={cancelEditting}
          />
        </div>
      )}
    </div>
  );
}

export default Input;
