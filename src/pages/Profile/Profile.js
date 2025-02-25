import classNames from "classnames/bind";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import styles from "./Profile.module.scss";
import Input from "../../components/Input";
import useForm from "../../hooks/useForm";
import { useState } from "react";

const cx = classNames.bind(styles);

const userInfo = {
  name: "Nguyen Viet Tung",
  email: "Cat@gmail.com",
  avatar:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFAz7TV79RYxtJu5RScxRax-OljYqpIKqPxw&s",
  position: "manager",
  gender: "male",
  birth: "2004-10-29",
  phone : "0348349754",
  country : "vn"
};
function Profile() {
  const [userData, setUserData] = useState({ ...userInfo });

  const handleChangeInput = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleChangePhone = (value) => {
    setUserData((prev) => ({ ...prev, phone: value }));
  };

  console.log(userData);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("title")}>Profile</div>

      <div className={cx("content")}>
        <div className={cx("input-content")}>
          <div className={cx("name")}>
            <Input
              light
              placeholder="Name..."
              value={userData.name}
              name="name"
              onChange={handleChangeInput}
              readOnly
            />
          </div>
          <div className={cx("email")}>
            <Input
              light
              placeholder="Email..."
              value={userData.email}
              name="email"
              onChange={handleChangeInput}
              readOnly
            />
          </div>
          <div className={cx("gender")}>
            <Input
              light
              placeholder="Gender..."
              value={userData.gender}
              name="gender"
              onChange={handleChangeInput}
              readOnly
            />
          </div>
          <div className={cx("birth")}>
            <Input
              light
              placeholder="Birth..."
              value={userData.birth}
              name="birth"
              onChange={handleChangeInput}
              type="date"
              readOnly
            />
          </div>
        </div>
        <PhoneInput
          value={userData.phone}
          name= "phone"
          onChange={handleChangePhone}
          country = {userData.country}
        />
        <div className={cx("img-content")}>
          <div className={cx("img")}>
            <img src={userInfo.avatar}></img>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
