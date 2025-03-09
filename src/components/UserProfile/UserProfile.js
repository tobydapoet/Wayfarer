import classNames from "classnames/bind";
import getCountryCode from "../../utils/countryUtils/countryUtils";
import Input from "../Input";
import style from "./UserProfile.module.scss";
import { useRef, useState } from "react";
import PhoneInput from "react-phone-input-2";

const cx = classNames.bind(style);


function UserProfile({data}) {
  const [clientData, setClientData] = useState({ ...data });
  const dataRef = useRef({ phone: "", ...data });

  const handleChangeInput = (e) => {
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
          />
        </div>
        <div className={cx("phone-container")}>
          <Input
            dark
            readOnly={true}
            onSave={handleOnSave}
            frame="Phone"
            value={clientData.phone}
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
        />
      </div>
    </div>
  );
}

export default UserProfile;
