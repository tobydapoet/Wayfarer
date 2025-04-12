import classNames from "classnames/bind";
import PhoneInput from "react-phone-input-2";
import getCountryCode from "../../utils/countryUtils/countryUtils";
import "react-phone-input-2/lib/style.css";
import Input from "../Input";
import styles from "./StaffInfo.module.scss";
import { useContext } from "react";
import Button from "../Button";
import images from "../../assets/images";
import { StaffContext } from "../../contexts/StaffContext";

const cx = classNames.bind(styles);

function StaffInfo() {
  const {
    staffData,
    staffTempData,
    staffErrors,
    handleChangeStaffInput,
    handleChangeStaffPhone,
    handleChangeStaffAvatar,
    handleOnSaveStaff,
  } = useContext(StaffContext);
  console.log(staffTempData.site);
  console.log(staffData);

  return (
    <div className={cx("wrapper")}>
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
            value={staffTempData.name}
            name="name"
            onChange={handleChangeStaffInput}
            error={staffErrors.name}
          />
        </div>
        <div className={cx("email")}>
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
            value={staffTempData.birth}
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
          <Button
            rounded
            className={cx("save-btn")}
            onClick={handleOnSaveStaff}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

export default StaffInfo;
