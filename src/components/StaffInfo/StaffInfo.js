import classNames from "classnames/bind";
import PhoneInput from "react-phone-input-2";
import getCountryCode from "../../utils/countryUtils/countryUtils";
import "react-phone-input-2/lib/style.css";
import Input from "../Input";
import styles from "./StaffInfo.module.scss";
import { useContext, useEffect, useState } from "react";
import Button from "../Button";
import images from "../../assets/images";
import { StaffContext } from "../../contexts/StaffContext";
import { useParams } from "react-router-dom";
import Popper from "../Popper";
import HeadlessTippy from "@tippyjs/react/headless";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { getCurrentUser } from "../../utils/currentUser";

const cx = classNames.bind(styles);

function StaffInfo() {
  const statusDisplay = {
    working: "working",
    "in meeting": "inMeeting",
    "on leave": "onLeave",
    "off duty": "offDuty",
    quit: "quit",
  };
  const statusList = ["working", "in meeting", "on leave", "off duty", "quit"];
  const [isPopperVisible, setIsPopperVisible] = useState(false);
  const user = getCurrentUser();

  const {
    staffData,
    staffTempData,
    staffErrors,
    handleSelectedStaff,
    handleAddStaff,
    handleChangeStaffInput,
    handleDeleteStaff,
    handleChangeStaffPhone,
    handleChangeStaffAvatar,
    handleOnSaveStaff,
    handleChangeStatus,
  } = useContext(StaffContext);
  const param = useParams();
  useEffect(() => {
    if (param.email) {
      handleSelectedStaff(param.email);
    }
  }, [param.email]);

  const filteredStatusList = statusList.filter((item) => {
    const isCurrentUser = user._id === staffData._id;

    if (staffData.status === "quit") {
      return item === "off duty";
    }

    if (staffData.status === "off duty") {
      if (item === "quit") {
        return !isCurrentUser;
      }
      return item === "quit";
    }

    if (item === "off duty") return false;
    if (item === "quit") return !isCurrentUser;
    return true;
  });

  return (
    <div className={cx("wrapper")}>
      <HeadlessTippy
        placement="bottom"
        interactive
        trigger="click"
        visible={isPopperVisible}
        onClickOutside={() => setIsPopperVisible(false)}
        render={(attrs) => (
          <div className={cx("popper-container")} tabIndex="-1" {...attrs}>
            <Popper className={cx("popper")}>
              {filteredStatusList.map((item) => (
                <div
                  key={item}
                  className={cx("status-option", {
                    selected: item === staffData.status,
                  })}
                  onClick={() => {
                    handleChangeStatus(item);
                    setIsPopperVisible(false);
                  }}
                >
                  <FontAwesomeIcon
                    icon={faCircle}
                    className={cx("icon", statusDisplay[item])}
                  />
                  <div>{item}</div>
                </div>
              ))}
            </Popper>
          </div>
        )}
      >
        <div
          className={cx("status-container")}
          onClick={() => {
            setIsPopperVisible(!isPopperVisible);
          }}
        >
          <FontAwesomeIcon
            icon={faCircle}
            className={cx("icon", statusDisplay[staffData.status])}
          />
          <div className={cx("status-txt")}>{staffData.status}</div>
        </div>
      </HeadlessTippy>
      <div className={cx("header-info")}>
        <div className={cx("avatar")}>
          <img src={staffTempData.avatar || images.noImg} alt="Avatar"></img>
          <div className={cx("input-container")}>
            <input
              type="file"
              name="avatar"
              onChange={handleChangeStaffAvatar}
            />
          </div>
          {staffErrors.avatar && (
            <p className={cx("error-text")}>{staffErrors.avatar}</p>
          )}
        </div>
        <div className={cx("word-content")}>
          <div className={cx("name-header")}>{staffData.name}</div>
          <div className={cx("email-header")}>{staffData.email}</div>
        </div>
      </div>
      <div className={cx("main-detail")}>
        <div className={cx("name")}>
          <Input
            dark
            frame="Fullname"
            placeholder="Name..."
            value={staffTempData.name || ""}
            name="name"
            onChange={handleChangeStaffInput}
            error={staffErrors.name}
          />
        </div>
        <div
          className={cx("email", { isReadOnly: Object.keys(param).length > 0 })}
        >
          <Input
            dark
            frame="Email"
            placeholder="Email"
            name="email"
            value={staffTempData.email}
            email
            onChange={handleChangeStaffInput}
            error={staffErrors.email}
          />
        </div>
        <div className={cx("position")}>
          <div className={cx("position-txt")}>Position</div>
          {staffData.position !== "super admin" ? (
            <select
              className={cx("position-select")}
              value={staffTempData.position}
              name="position"
              onChange={handleChangeStaffInput}
            >
              <option value="staff">staff</option>
              <option value="admin">manager</option>
            </select>
          ) : (
            <>
              <div className={cx("CEO")}>CEO</div>
            </>
          )}
        </div>
        <div className={cx("password")}>
          <Input
            dark
            frame="Password"
            placeholder="Password"
            name="password"
            value={staffTempData.password}
            type="password"
            onChange={handleChangeStaffInput}
            error={staffErrors.password}
          />
        </div>
        <div className={cx("birth")}>
          <Input
            dark
            frame="Birth"
            type="date"
            placeholder="Birth"
            value={staffTempData.birth?.slice(0, 10)}
            name="birth"
            onChange={handleChangeStaffInput}
            error={staffErrors.birth}
          />
        </div>

        <div className={cx("phone-container")}>
          <Input
            dark={true}
            frame="Phone"
            value={staffTempData.phone}
            error={staffErrors.phone}
          >
            <PhoneInput
              className={cx("phone")}
              enableSearch
              value={staffTempData.phone}
              name="phone"
              onChange={handleChangeStaffPhone}
              country={(getCountryCode(staffTempData.site) || "").toLowerCase()}
            />
          </Input>
        </div>
        <div className={cx("salary")}>
          <Input
            dark
            frame="Salary"
            type="number"
            placeholder="Salary"
            value={staffTempData.salary}
            name="salary"
            onChange={handleChangeStaffInput}
            error={staffErrors.salary}
          />
        </div>

        <div className={cx("location-container")}>
          <Input
            dark
            frame="Location"
            placeholder="Location"
            value={staffTempData?.site || ""}
            name="site"
            onChange={handleChangeStaffInput}
            location
            error={staffErrors.site}
          />
        </div>

        <div className={cx("btn-container")}>
          {Object.keys(param).length > 0 ? (
            <>
              <Button
                rounded
                className={cx("save-btn")}
                onClick={() => handleOnSaveStaff(staffData._id, staffTempData)}
              >
                Save
              </Button>
              {/* <Button
                rounded
                className={cx("save-btn")}
                onClick={() => handleDeleteStaff(staffData._id)}
              >
                Remove
              </Button> */}
            </>
          ) : (
            <Button rounded className={cx("save-btn")} onClick={handleAddStaff}>
              Add
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default StaffInfo;
