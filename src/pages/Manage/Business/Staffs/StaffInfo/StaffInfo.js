import classNames from "classnames/bind";
import PhoneInput from "react-phone-input-2";
import getCountryCode from "../../../../../utils/countryUtils/countryUtils";
import "react-phone-input-2/lib/style.css";
import Input from "../../../../../components/Input";
import styles from "./StaffInfo.module.scss";
import { useRef, useState } from "react";
import Button from "../../../../../components/Button";
import { useParams } from "react-router-dom";
import images from "../../../../../assets/images";

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
  const param = useParams();
  const [userData, setUserData] = useState(
    param.info !== "add_content"
      ? { ...INFO }
      : {
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
        }
  );
  const [userTempData, setUserTempData] = useState({ ...userData });
  const [errors, setErrors] = useState({});

  const validateInput = (name, value) => {
    const newErrors = {};
    switch (name) {
      case "name":
        if (!value.trim()) {
          newErrors.name = "Name cannot empty!";
        }
        break;
      case "email": {
        if (!value.trim()) {
          newErrors.email = "Email cannot empty!";
        } else if (
          !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value
          )
        ) {
          newErrors.email = "Wrong format";
        }
        break;
      }
      case "password": {
        if (!value.trim()) {
          newErrors.password = "Password cannot empty!";
        } else if (value.length < 8) {
          newErrors.password = "Password must be more than 8 characters";
        }
        break;
      }
      case "phone": {
        if (!value.trim()) {
          newErrors.phone = "Phone cannot empty";
        }
        break;
      }
      case "location": {
        if (!value.trim()) {
          newErrors.location = "Location cannot empty!";
        }
        break;
      }
      case "avatar":
        {
          if (!value) {
            newErrors.avatar = "Please choose your avatar!";
          }
        }
        break;
      case "salary": {
        if (!value.trim()) {
          newErrors.salary = "Salary cannot be empty";
        }
        break;
      }
      case "birth": {
        const birthDate = new Date(value);
        const today = new Date();
        const tenYears = new Date();
        tenYears.setFullYear(today.getFullYear() - 10);
        if (!value.trim()) {
          newErrors.birth = "Birth cannot be empty";
        } else if (birthDate > tenYears) {
          newErrors.birth = "Invalid birthday";
        }
        break;
      }
    }
    return newErrors;
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    const newErrors = validateInput(name, value);
    setErrors((prevErrors) => {
      const updatedErrors = { ...newErrors, ...prevErrors };
      if (!newErrors[name]) {
        delete updatedErrors[name];
      }
      return newErrors;
    });
    setUserTempData({ ...userData, [name]: value });
  };

  const handleChangePhone = (value) => {
    setUserTempData((prev) => {
      const updatedValues = { ...prev, phone: value };
      const newErrors = validateInput("phone", value);

      setErrors((prevErrors) => {
        const updatedErrors = { ...newErrors, ...prevErrors };

        if (!newErrors.phone) {
          delete updatedErrors.phone;
        }

        return updatedErrors;
      });

      return updatedValues;
    });
  };

  const handleOnSave = () => {
    let newErrors = {};
    Object.entries(userTempData).forEach(([name, value]) => {
      const updatedErrors = validateInput(name, value);
      newErrors = { ...newErrors, ...updatedErrors };
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    setUserData({ ...userTempData });
  };

  const handleChangeImg = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    const file = e.target.files[0];
    const imgURL = URL.createObjectURL(file);
    setUserData((prev) => ({ ...prev, avatar: imgURL }));
    setErrors((prevErrors) => {
      const { avatar, ...rest } = prevErrors; 
      return rest;
    });
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header-info")}>
        <div className={cx("avatar")}>
          <img src={userData.avatar || images.noImg} alt="Avatar"></img>
          <div className={cx("input-container")}>
            <input type="file" name="avatar" onChange={handleChangeImg} />
          </div>
          {errors.avatar && <p className={cx("error-text")}>{errors.avatar}</p>}
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
            value={userTempData.name}
            name="name"
            onChange={handleChangeInput}
            error={errors.name}
          />
        </div>
        <div className={cx("email")}>
          <Input
            dark
            frame="Email"
            placeholder="Email"
            name="email"
            value={userTempData.email}
            email
            onChange={handleChangeInput}
            error={errors.email}
          />
        </div>
        <div className={cx("password")}>
          <Input
            dark
            frame="Password"
            placeholder="Password"
            name="password"
            value={userTempData.password}
            type="password"
            onChange={handleChangeInput}
            error={errors.password}
          />
        </div>
        <div className={cx("birth")}>
          <Input
            dark
            frame="Birth"
            type="date"
            placeholder="Birth"
            value={userTempData.birth}
            name="birth"
            onChange={handleChangeInput}
            error={errors.birth}
          />
        </div>

        <div className={cx("phone-container")}>
          <Input
            dark={true}
            frame="Phone"
            value={userTempData.phone}
            error={errors.phone}
          >
            <PhoneInput
              className={cx("phone")}
              enableSearch
              value={userTempData.phone}
              name="phone"
              onChange={handleChangePhone}
              country={(getCountryCode(userData.location) || "").toLowerCase()}
            />
          </Input>
        </div>
        <div className={cx("salary")}>
          <Input
            dark
            frame="Salary"
            type="number"
            placeholder="Salary"
            value={userTempData.salary}
            name="salary"
            onChange={handleChangeInput}
            error={errors.salary}
          />
        </div>

        <div className={cx("location-container")}>
          <Input
            dark
            frame="Location"
            type="location"
            placeholder="Location"
            value={userTempData?.location || ""}
            name="location"
            onChange={handleChangeInput}
            location
            error={errors.location}
          />
        </div>

        <div className={cx("btn-container")}>
          <Button rounded className={cx("save-btn")} onClick={handleOnSave}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

export default StaffInfo;
