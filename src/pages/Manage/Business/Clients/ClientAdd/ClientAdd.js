import classNames from "classnames/bind";
import Input from "../../../../../components/Input";
import style from "./ClientAdd.module.scss";
import { useState } from "react";
import Button from "../../../../../components/Button";
import PhoneInput from "react-phone-input-2";
import images from "../../../../../assets/images";

const cx = classNames.bind(style);

function ClientAdd() {
  const [clientData, setClientData] = useState({
    avatar: "",
    name: "",
    email: "",
    phone: "",
    location: "",
  });
  const [tempClientData, setTempClientData] = useState({ ...clientData });

  const handleChangeInput = (e) => {
    setTempClientData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleChangePhone = (value) => {
    tempClientData.phone = value;
  };

  const handleChangeImg = (e) => {
    if (!e.target.files || e.target.value === 0) {
      return;
    }
    const file = e.target.files[0];
    const imgURL = URL.createObjectURL(file);
    setTempClientData((prev) => ({ ...prev, avatar: imgURL }));
  };

  const handleOnSave = () => {
    setClientData({...tempClientData});
    console.log(clientData);

  };


  return (
    <div className={cx("wrapper")}>
      <div className={cx("main-detail")}>
        <div className={cx("name")}>
          <Input
            dark
            frame="Fullname"
            placeholder="Name..."
            value={tempClientData.name}
            name="name"
            onChange={handleChangeInput}
          />
        </div>
        <div className={cx("name")}>
          <Input
            dark
            frame="Email"
            placeholder="Email..."
            value={tempClientData.email}
            name="email"
            onChange={handleChangeInput}
          />
        </div>
        <div className={cx("password")}>
          <Input
            dark
            type="password"
            frame="Password"
            placeholder="Password..."
            value={tempClientData.password}
            name="passwaord"
            onChange={handleChangeInput}
          />
        </div>
        <div className={cx("phone-container")}>
          <Input dark frame="Phone" value={tempClientData.phone}>
            <PhoneInput
              className={cx("phone")}
              enableSearch
              value={tempClientData.phone}
              name="phone"
              onChange={handleChangePhone}
            />
          </Input>
        </div>
      </div>
      <div className={cx("avatar")}>
        <img
          src={
            tempClientData.avatar !== "" ? tempClientData.avatar : images.noImg
          }
        />
        <div className={cx("input-container")}>
          <input type="file" name="avatar" onChange={handleChangeImg} />
        </div>
      </div>

      <div className={cx("location-container")}>
        <Input
          dark
          frame="Location"
          type="location"
          placeholder="Location"
          value={tempClientData?.location || ""}
          name="location"
          onChange={handleChangeInput}
        />
      </div>
      <div className={cx("btn-container")}>
        <Button large onClick={handleOnSave}>
          Save
        </Button>
      </div>
    </div>
  );
}

export default ClientAdd;
