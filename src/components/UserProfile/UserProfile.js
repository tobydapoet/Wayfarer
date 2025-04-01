import classNames from "classnames/bind";
import getCountryCode from "../../utils/countryUtils/countryUtils";
import Input from "../Input";
import style from "./UserProfile.module.scss";
import { useRef, useState } from "react";
import PhoneInput from "react-phone-input-2";
import Button from "../Button";
import images from "../../assets/images";

const cx = classNames.bind(style);

function UserProfile({ data }) {
  const [clientData, setClientData] = useState(() => {
    if (data) {
      return { ...data };
    } else {
      // Trả về đối tượng với các khóa từ `data` và giá trị mặc định rỗng hoặc giá trị khác
      return {
        email: "",
        name: "",
        password: "",
        phone: "",
        location: "",
        avatar: "",
        position: 2,
      };
    }
  });
  const [clientTempData, setClientTempData] = useState({ ...clientData });
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
    }
    return newErrors;
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    const newErrors = validateInput(name, value);

    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors, ...newErrors };

      if (!newErrors[name]) {
        delete updatedErrors[name];
      }

      return updatedErrors;
    });

    setClientTempData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangePhone = (value) => {
    setClientTempData((prev) => {
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

  const handleChangeImg = (e) => {
    if (!e.target.files || e.target.value === 0) {
      return;
    }
    const file = e.target.files[0];
    const imgURL = URL.createObjectURL(file);
    setClientTempData((prev) => ({ ...prev, avatar: imgURL }));
  };

  const handleOnSave = () => {
    let newErrors = {};
    Object.entries(clientTempData).forEach(([name, value]) => {
      const updatedErrors = validateInput(name, value);
      newErrors = { ...newErrors, ...updatedErrors };
    });
    console.log(newErrors);

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setClientData({ ...clientTempData });
  };

  console.log(errors);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("main-detail")}>
        <div className={cx("name")}>
          <Input
            dark
            frame="Fullname"
            placeholder="Name..."
            value={clientTempData.name}
            name="name"
            onChange={handleChangeInput}
            error={errors.name}
          />
        </div>
        <div className={cx("name")}>
          <Input
            dark
            frame="Email"
            placeholder="Email..."
            value={clientTempData.email}
            name="email"
            onChange={handleChangeInput}
            error={errors.email}
          />
        </div>
        <div className={cx("password")}>
          <Input
            dark
            type="password"
            frame="Password"
            placeholder="Password..."
            value={clientTempData.password}
            name="password"
            onChange={handleChangeInput}
            error={errors.password}
          />
        </div>
        <div className={cx("phone-container")}>
          <Input
            dark={true}
            frame="Phone"
            value={clientData.phone}
            error={errors.phone}
          >
            <PhoneInput
              className={cx("phone")}
              enableSearch
              value={clientTempData.phone}
              name="phone"
              onChange={handleChangePhone}
              country={(
                getCountryCode(clientData.location) || ""
              ).toLowerCase()}
            />
          </Input>
        </div>
      </div>
      <div className={cx("avatar")}>
        <img src={clientTempData.avatar || images.noImg} />
        <div className={cx("input-container")}>
          <input type="file" name="avatar" onChange={handleChangeImg} />
        </div>
        {errors.avatar && <p className={cx("error-text")}>{errors.avatar}</p>}
      </div>

      <div className={cx("location-container")}>
        <Input
          dark
          frame="Location"
          placeholder="Location"
          value={clientTempData.location}
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
  );
}

export default UserProfile;
