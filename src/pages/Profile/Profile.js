import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import ReactFlagsSelect from "react-flags-select";
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
  country: "VN" || "US",
};
function Profile() {
  const [userData, setUserData] = useState({ ...userInfo });

  const handleChangeInput = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleChangePhone = (value) => {
    setUserData((prev) => ({ ...prev, phone: value }));
  };
  const handleChangeCountry = (value) => {
    setUserData((prev) => ({ ...prev, country: value }));
  };
  const handleChangeImg = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      console.error("Không có file nào được chọn!");
      return;
    }
  
    const file = e.target.files[0]; // Lấy file đầu tiên
    const imageUrl = URL.createObjectURL(file); // Tạo URL tạm thời
    setUserData((prev) => ({ ...prev, avatar: imageUrl })); // Cập nhật state
  };

  const fileInputRef = useRef(null);

  useEffect(() => {
    setUserData({ ...userInfo });
  }, [userInfo]);

  const isDisabled = true;

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
              <Input light readOnly={true}>
                <ReactFlagsSelect
                  selected={userData.country}
                  onSelect={handleChangeCountry}
                  name="country"
                  searchable
                  className={cx("country", { disabled: isDisabled })}
                  disabled={isDisabled}
                />
              </Input>
            </div>

            <div className={cx("phone-container")}>
              <Input light>
                <PhoneInput
                  className={cx("phone")}
                  value={userData.phone}
                  name="phone"
                  onChange={handleChangePhone}
                  country={userData.country?.toLowerCase() || ""}
                  disabled={true}
                />
              </Input>
            </div>
          </div>
        </div>

        <div className={cx("img-content")}>
          <div className={cx("img")}>
          <img src={userData.avatar || "default-avatar.png"} alt="User avatar" />
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
