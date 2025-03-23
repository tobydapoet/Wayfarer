import classNames from "classnames/bind";
import PhoneInput from "react-phone-input-2";
import getCountryCode from "../../../../../utils/countryUtils/countryUtils";
import "react-phone-input-2/lib/style.css";
import Input from "../../../../../components/Input";
import styles from "./StaffAdd.module.scss";
import { useRef, useState } from "react";
import images from "../../../../../assets/images";
import Button from "../../../../../components/Button";

const cx = classNames.bind(styles);

function StaffAdd() {
  const [userData, setUserData] = useState({
    avatar: "",
    name: "",
    status: 0,
    location: "",
    salary: "",
    name: "",
    email: "",
    birth: "",
    phone: "",
    password: "",
  });
  const [tempUserData, setTempUserData] = useState({ ...userData });

  const handleChangeInput = (e) => {
    setTempUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleChangePhone = (value) => {
    tempUserData.phone = value;
  };

  const handleOnSave = () => {
    setUserData({ ...tempUserData });
  };

  const handleChangeImg = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    const file = e.target.files[0];
    const imgURL = URL.createObjectURL(file);
    setTempUserData((prev) => ({ ...prev, avatar: imgURL }));
  };


  console.log("Thông tin sau cập nhât: ", userData);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header-info")}>
        <div className={cx("avatar")}>
          <img
            src={
              tempUserData.avatar === "" ? images.noImg : tempUserData.avatar
            }
            alt="Avatar"
          ></img>
          <div className={cx("input-container")}>
            <input type="file" name="avatar" onChange={handleChangeImg} />
          </div>
        </div>
        <div className={cx("word-content")}>
          <div className={cx("name-header")}>{userData.name}</div>
          <div className={cx("email-header")}>{userData.email}</div>
        </div>
      </div>
      <div className={cx("main-detail")}>
        <div className={cx("name")}>
          <Input
            dark
            frame="Fullname"
            placeholder="Name..."
            name="name"
            onChange={handleChangeInput}
            value={tempUserData.name}
          />
        </div>
        <div className={cx("email")}>
          <Input
            dark
            frame="Email"
            placeholder="Email"
            name="email"
            email
            onChange={handleChangeInput}
            value={tempUserData.email}
          />
        </div>
        <div className={cx("password")}>
          <Input
            dark
            frame="Password"
            placeholder="Password"
            name="password"
            email
            type="password"
            onChange={handleChangeInput}
            value={tempUserData.password}
          />
        </div>
        <div className={cx("birth")}>
          <Input
            dark
            frame="Birth"
            type="date"
            placeholder="Birth"
            name="birth"
            onChange={handleChangeInput}
            value={tempUserData.birth}
          />
        </div>

        <div className={cx("phone-container")}>
          <Input dark frame="Phone" value={tempUserData.phone}>
            <PhoneInput
              className={cx("phone")}
              enableSearch
              name="phone"
              onChange={handleChangePhone}
              value={tempUserData.phone}
            />
          </Input>
        </div>
        <div className={cx("salary")}>
          <Input
            dark
            frame="Salary"
            type="salary"
            placeholder="Salary"
            value={tempUserData.salary}
            name="salary"
            onChange={handleChangeInput}
          />
        </div>

        <div className={cx("location-container")}>
          <Input
            dark
            frame="Location"
            type="location"
            placeholder="Location"
            value={tempUserData.location}
            name="location"
            onChange={handleChangeInput}
            location
          />
        </div>
      </div>
      <div className={cx("btn-container")}>
        <Button large onClick={handleOnSave}>
          Save
        </Button>
      </div>
    </div>
  );
}

export default StaffAdd;
