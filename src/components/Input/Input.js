import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faSquareCheck,
  faSquareXmark,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useRef, useState } from "react";
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
  readOnly = false,
  childs = [],
  children,
  disabled,
  onSave
}) {
  const [isReadOnly, setIsReadOnly] = useState(readOnly ? true : false);
  const [localValue, setLocalValue] = useState(value);
  const [tempValue, setTempValue] = useState(value);
  const inputRef = useRef();
  

  let Comp = "input";
  if (textarea) Comp = "textarea";
  else if (childs.length > 0) Comp = "select";
  else if (children) Comp = "div";

  const enableEditing = () => {
    setIsReadOnly(false);
    inputRef.current?.focus();
  };

  const cancelEditing = () => {
    setLocalValue(tempValue);
    setIsReadOnly(true);
  };

  const finishEditing = () => {
    if (onChange) onChange({ target: { name, value: localValue } });
    setIsReadOnly(true);
    setTempValue(localValue);
  };

  const handleoOnSave = () => {
    if (onSave) onSave();
    if (onChange) onChange({ target: { name, value: localValue } });
    setIsReadOnly(true);
    setTempValue(localValue);
    console.log('render ')
  }

  return (
    <div className={cx("wrapper")}>
      <div className={cx("input-container", { dark, light })}>
        {Comp === "select" ? (
          <select
            className={cx(className, { dark, light})}
            onChange={(e) => setLocalValue(e.target.value)}
            value={localValue}
            name={name}
            ref={inputRef}
            disabled={isReadOnly}
          >
            {childs.map((child, index) => (
              <option key={index} value={child}>
                {child}
              </option>
            ))}
          </select>
        ) : (
          <Comp
            placeholder={placeholder}
            className={cx(className, { dark, light, readOnly: isReadOnly })}
            onChange={(e) => setLocalValue(e.target.value)}
            value={localValue}
            name={name}
            type={type}
            ref={inputRef}
            disabled={disabled} 
          >
           {React.Children.map(children, (child) =>
              React.cloneElement(child, {
                disabled: disabled || isReadOnly,
                onSave : finishEditing,
                onClose : cancelEditing
              })
            )}
          </Comp>
        )}
      </div>

      {error && <span className={cx("error")}>{error}</span>}

      {readOnly && (
        isReadOnly ? (
          <FontAwesomeIcon className={cx("edit")} icon={faPenToSquare} onClick={enableEditing} />
        ) : (
          <div className={cx("edit-mode")}>
            <FontAwesomeIcon className={cx("check")} icon={faSquareCheck} onClick={onSave? handleoOnSave : finishEditing} />
            <FontAwesomeIcon className={cx("cancel")} icon={faSquareXmark} onClick={cancelEditing} />
          </div>
        )
      )}
    </div>
  );
}

export default Input;
