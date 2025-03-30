import classNames from "classnames/bind";
import getCountryCode from "../../utils/countryUtils/countryUtils";
import Input from "../Input";
import style from "./UserProfile.module.scss";
import { useRef, useState } from "react";
import PhoneInput from "react-phone-input-2";

const cx = classNames.bind(style);

function UserProfile({ data }) {
  const [clientData, setClientData] = useState({ ...data });
  const dataRef = useRef({ phone: "", ...data });
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
      case "location": {
        if (!value.trim()) {
          newErrors.message = "Lcoation cannot empty!";
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
      const updatedErrors = { ...newErrors,...prevErrors};
      if (!newErrors[name]) {
        delete updatedErrors[name];
      }
      return updatedErrors;
    });
    setClientData({ ...clientData, [e.target.name]: e.target.value });
  };

  const handleChangePhone = (value) => {
    if (dataRef.current.phone !== value) {
      dataRef.current.phone = value;
    }
  };

  const handleChangeImg = (e) => {
    if (!e.target.files || e.target.value === 0) {
      return;
    }
    const file = e.target.files[0];
    const imgURL = URL.createObjectURL(file);
    setClientData((prev) => ({ ...prev, avatar: imgURL }));
  };

  const handleOnSave = () => {
    setClientData({ ...dataRef.current });
  };

  console.log(clientData.phone);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("main-detail")}>
        <div className={cx("name")}>
          <Input
            dark
            frame="Fullname"
            placeholder="Name..."
            value={clientData.name}
            name="name"
            onChange={handleChangeInput}
            readOnly
            error={errors.name}
          />
        </div>
        <div className={cx("name")}>
          <Input
            dark
            frame="Email"
            placeholder="Email..."
            value={clientData.email}
            name="email"
            onChange={handleChangeInput}
            readOnly
            error={errors.email}
          />
        </div>
        <div className={cx("password")}>
          <Input
            dark
            type="password"
            frame="Password"
            placeholder="Password..."
            value={clientData.password}
            name="passwaord"
            onChange={handleChangeInput}
            readOnly
            error={errors.password}
          />
        </div>
        <div className={cx("phone-container")}>
          <Input
            dark
            readOnly={true}
            onSave={handleOnSave}
            frame="Phone"
            value={clientData.phone}
            error={errors.phone}
          >
            <PhoneInput
              className={cx("phone")}
              enableSearch
              value={clientData.phone}
              name="phone"
              onChange={handleChangePhone}
              country={getCountryCode(clientData.location).toLowerCase()}
            />
          </Input>
        </div>
      </div>
      <div className={cx("avatar")}>
        <img src={clientData.avatar} />
        <div className={cx("input-container")}>
          <input type="file" name="avatar" onChange={handleChangeImg} />
        </div>
      </div>

      <div className={cx("location-container")}>
        <Input
          dark
          key={clientData.location}
          frame="Location"
          type="location"
          placeholder="Location"
          value={clientData?.location || ""}
          name="location"
          onChange={handleChangeInput}
          readOnly={true}
          location
          error={errors.location}
        />
      </div>
    </div>
  );
}

export default UserProfile;
