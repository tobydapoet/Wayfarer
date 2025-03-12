import classNames from "classnames/bind";
import PhoneInput from "react-phone-input-2";
import getCountryCode from "../../../../../utils/countryUtils/countryUtils";
import "react-phone-input-2/lib/style.css";
import Input from "../../../../../components/Input";
import styles from "./StaffInfo.module.scss";
import { useRef, useState } from "react";

const cx = classNames.bind(styles);

const INFO = {
  avatar:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFAz7TV79RYxtJu5RScxRax-OljYqpIKqPxw&s",
  name: "Davis Astee",
  status: 1,
  location:
    "Bắc Sơn, Thị trấn Chúc Sơn, Chương Mỹ District, Hà Nội, 13400, VietNam",
  salary: "1500",
  name: "Nguyen Viet Tung",
  email: "Cat@gmail.com",
  birth: "2004-10-29",
  phone: "0348349754",
  password: "12345678",
};

function StaffInfo() {
  const [userData, setUserData] = useState({ ...INFO });
  const dataRef = useRef({ phone: "", country: "", ...INFO });

  const handleChangeInput = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleChangePhone = (value) => {
    dataRef.current.phone = value;
  };

  const handleOnSave = () => {
    setUserData({ ...dataRef.current });
  };

  const handleChangeImg = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    const file = e.target.files[0];
    const imgURL = URL.createObjectURL(file);
    setUserData((prev) => ({ ...prev, avatar: imgURL }));
  };

  console.log('Thông tin sau cập nhât: ' ,userData)

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header-info")}>
        <div className={cx("avatar")}>
          <img src={userData.avatar || "default-avatar.png"} alt="Avatar"></img>
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
            value={userData.name}
            name="name"
            onChange={handleChangeInput}
            readOnly
          />
        </div>
        <div className={cx("email")}>
          <Input
            dark
            frame="Email"
            placeholder="Email"
            name="email"
            readOnly
            value={INFO.email}
            email
            onChange={handleChangeInput}
          />
        </div>
        <div className={cx("password")}>
          <Input
            dark
            frame="Password"
            placeholder="Password"
            name="password"
            readOnly
            value={INFO.password}
            email
            type="password"
            onChange={handleChangeInput}
          />
        </div>
        <div className={cx("birth")}>
          <Input
            dark
            frame="Birth"
            type="date"
            placeholder="Birth"
            value={userData.birth}
            name="birth"
            onChange={handleChangeInput}
            readOnly={true}
          />
        </div>

        <div className={cx("phone-container")}>
          <Input dark readOnly={true} onSave={handleOnSave} frame="Phone" value={userData.phone}>
            <PhoneInput
              className={cx("phone")}
              enableSearch
              value={dataRef.current.phone}
              name="phone"
              onChange={handleChangePhone}
              country={getCountryCode(userData.location).toLowerCase()}
            />
          </Input>
        </div>
        <div className={cx("salary")}>
          <Input
            dark
            frame="Salary"
            type="salary"
            placeholder="Salary"
            value={userData.salary}
            name="salary"
            onChange={handleChangeInput}
            readOnly={true}
          />
        </div>

        <div className={cx("location-container")}>
          <Input
            dark
            key={userData.location}
            frame="Location"
            type="location"
            placeholder="Location"
            value={userData?.location || ""}
            name="location"
            onChange={handleChangeInput}
            readOnly={true}
            location
          />
        </div>
      </div>
    </div>
  );
}

export default StaffInfo;
