import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
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
  maxLength,
  type,
  children,
  disabled,
  location,
  frame,
}) {
  const [localValue, setLocalValue] = useState(value || "");
  const [countryCode, setCountryCode] = useState(value);
  const inputRef = useRef();
  inputRef.current = value;

  useEffect(() => {
    setLocalValue(value || "");
  }, [value]);

  let Comp = "input";
  if (textarea) Comp = "textarea";
  else if (children) Comp = "div";

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
          const locationName = await getLocationName(latitude, longitude);
          const displayName = locationName.display_name;

          setLocalValue(displayName);
          setCountryCode(locationName.address.country_code);

          if (onChange) {
            onChange({
              target: {
                name: name,
                value: displayName,
              },
            });
          }
        },
        (error) => {
          console.error("Lỗi lấy vị trí:", error);
        }
      );
    } else {
      alert("Trình duyệt không hỗ trợ định vị.");
    }
  };
  const handleOnChange = (e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);

    if (onChange) {
      onChange({ target: { name, value: newValue } });
    }
  };

  const content = (
    <div className={cx("wrapper")}>
      <div className={cx("input-container", { dark, light })}>
        <Comp
          placeholder={placeholder}
          className={cx(className, { dark, light, isLocation: location })}
          onChange={handleOnChange}
          value={children ? null : localValue}
          name={name}
          type={type}
          maxLength={maxLength}
          disabled={disabled}
        >
          {React.Children.map(children, (child) =>
            React.cloneElement(child, {
              countryCode: countryCode,
              setCountryCode: setCountryCode,
              value: localValue,
            })
          )}
        </Comp>
      </div>
      {maxLength && (
        <div className={cx("limit")}>
          {localValue.length}/{maxLength}
        </div>
      )}
      <span className={cx("error")}>{error || "\u00A0"}</span>
      {location && (
        <FontAwesomeIcon
          className={cx("locate")}
          icon={faLocationDot}
          onClick={(e) => {
            {
              e.preventDefault();
              getLocation();
            }
          }}
        />
      )}
    </div>
  );

  return frame ? (
    <div className={cx("frame-wrapper")}>
      <div className={cx("frame-content", { dark, light })}>{frame}</div>
      {content}
    </div>
  ) : (
    content
  );
}

export default Input;
