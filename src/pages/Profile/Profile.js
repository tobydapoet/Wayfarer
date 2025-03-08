import classNames from "classnames/bind";
import { useRef, useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import getCountryCode from "../../utils/countryUtils/countryUtils";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import styles from "./Profile.module.scss";
import Input from "../../components/Input";

const cx = classNames.bind(styles);

const userInfo = {
  name: "Nguyen Viet Tung",
  email: "Cat@gmail.com",
  avatar:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFAz7TV79RYxtJu5RScxRax-OljYqpIKqPxw&s",
  position: "manager",
  gender: "male",
  birth: "2004-10-29",
  phone: "0348349754",
  location:
    "Непское сельское поселение, Katangsky Rayon, Irkutsk Oblast, Siberian Federal District, Russia",
};
function Profile() {
  const [userData, setUserData] = useState({ ...userInfo });
  const dataRef = useRef({ ...userData });

  const handleChangeInput = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const phoneRef = useRef(userInfo.phone);

  const handleChangePhone = (value) => {
    if (dataRef.current.phone !== value) {
      dataRef.current.phone = value;
    }
  };

  const handleOnSave = () => {
    setUserData({ ...dataRef.current });
  };

  const handleChangeImg = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      console.error("Không có file nào được chọn!");
      return;
    }

    const file = e.target.files[0]; 
    const imageUrl = URL.createObjectURL(file); 
    setUserData((prev) => ({ ...prev, avatar: imageUrl }));
  };

  console.log(userData);
  const fileInputRef = useRef(null);

  if (fileInputRef.current) {
    fileInputRef.current.value = "";
  }

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
          <div className={cx("additional")}>
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
                readOnly={true}
                childs={["male", "female", "unknown"]}
              />
            </div>
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
          <div className={cx("country-phone")}>
            <div className={cx("country-container")}>
              <Input
                light
                key={userData.location}
                placeholder="Location"
                value={userData?.location || ""}
                name="location"
                onChange={handleChangeInput}
                readOnly={true}
                location
              />
            </div>

            <div className={cx("phone-container")}>
              <Input dark readOnly={true} onSave={handleOnSave} frame="Phone">
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
          </div>
        </div>

        <div className={cx("img-content")}>
          <div className={cx("img")}>
            <img
              src={userData.avatar || "default-avatar.png"}
              alt="User avatar"
            />
            <div className={cx("change-container")}>
              <input
                light
                ref={fileInputRef}
                name="avatar"
                onChange={handleChangeImg}
                type="file"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
