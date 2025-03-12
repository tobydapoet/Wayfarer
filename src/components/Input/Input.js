import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faSquareCheck,
  faSquareXmark,
} from "@fortawesome/free-solid-svg-icons";
import React, { useMemo, useRef, useState } from "react";
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
  maxLength,
  type,
  readOnly = false,
  childs = [],
  children,
  disabled,
  onSave,
  location,
  frame,
}) {
  const [isReadOnly, setIsReadOnly] = useState(readOnly ? true : false);
  const [localValue, setLocalValue] = useState(value || '');
  const [countryCode, setCountryCode] = useState(value);
  const inputRef = useRef();
  inputRef.current = value;
  const focusRef = useRef();

  console.log(localValue, inputRef);
  let Comp = "input";
  if (textarea) Comp = "textarea";
  else if (childs.length > 0) Comp = "select";
  else if (children) Comp = "div";

  const enableEditing = () => {
    setIsReadOnly(false);
    setTimeout(() => {
      console.log("inputRef.current:", inputRef.current); 
      setTimeout(() => {
        if (focusRef.current && typeof focusRef.current.focus === "function") {
          focusRef.current.focus();
        }
      }, 100);
    }, 100);
  };

  const getLocationName = async (latitude, longitude) => {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Lỗi khi lấy tên địa điểm:", error);
      return "Lỗi khi lấy tên địa điểm";
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Vị trí mới lấy:", latitude, longitude);

          const locationName = await getLocationName(latitude, longitude);
          console.log("Tên địa điểm lấy được:", locationName.display_name);
          console.log("Tên nước:", locationName.address.country_code);

          setLocalValue(locationName.display_name);
          setCountryCode(locationName.address.country_code);
        },
        (error) => {
          console.error("Lỗi lấy vị trí:", error);
        }
      );
    } else {
      alert("Trình duyệt không hỗ trợ định vị.");
    }
  };

  const cancelEditing = () => {
    setLocalValue(inputRef.current);
    setTimeout(() => setIsReadOnly(true), 100);
  };

  const handleOnChange = (e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
  
    if (!readOnly && onChange) {
      onChange({ target: { name, value: newValue } });
    }
  };

  const finishEditing = () => {
    console.log("Giá trị trước khi lưu:", localValue);
    if (onChange) {
      onChange({
        target: {
          name,
          countryCode,
          value:
            typeof localValue === "object" ? localValue.location : localValue,
        },
      });
    }
    setIsReadOnly(true);
  };

  const handleOnSave = () => {
    if (onSave) onSave();
    if (onChange) onChange({ target: { name, value: localValue } });
    setIsReadOnly(true);
  };

  const content = (
    <div className={cx("wrapper")}>
      <div className={cx("input-container", { dark, light })}>
        {Comp === "select" ? (
          <select
            className={cx(className, { dark, light })}
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
            onChange={readOnly ?  (e) => setLocalValue(e.target.value) :handleOnChange}
            value={children ? null : localValue}
            name={name}
            type={type}
            ref={!children ? focusRef : null}
            maxLength = {maxLength}
            disabled={disabled}
          >
            {React.Children.map(children, (child) =>
              React.cloneElement(child, {
                disabled: disabled || isReadOnly,
                onSave: finishEditing,
                countryCode: countryCode,
                setCountryCode: setCountryCode,
                value: localValue,
                inputProps: {
                  ref: focusRef, 
                },
              })
            )}
          </Comp>
          
        )}
      </div>
      { maxLength && <div className={cx('limit')}>{localValue.length}/{maxLength}</div>}
      {error && <span className={cx("error")}>{error}</span>}
      {readOnly &&
        (isReadOnly ? (
          <FontAwesomeIcon
            className={cx("edit")}
            icon={faPenToSquare}
            onClick={() => {
              {
                location && getLocation();
              }
              enableEditing();
            }}
          />
        ) : (
          <div className={cx("edit-mode")}>
            <FontAwesomeIcon
              className={cx("check")}
              icon={faSquareCheck}
              onClick={onSave ? handleOnSave : finishEditing}
            />
            <FontAwesomeIcon
              className={cx("cancel")}
              icon={faSquareXmark}
              onClick={cancelEditing}
            />
          </div>
        ))}
    </div>
  );

  return frame ? (
    <div className={cx("frame-wrapper")}>
      <div className={cx("frame-content")}>{frame}</div>
      {content}
    </div>
  ) : (
    content
  );
}

export default Input;
