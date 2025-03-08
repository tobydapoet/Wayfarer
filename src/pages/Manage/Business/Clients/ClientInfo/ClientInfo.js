import classNames from "classnames/bind";
import Button from "../../../../../components/Button";
import getCountryCode from "../../../../../utils/countryUtils/countryUtils";
import Input from "../../../../../components/Input";
import style from "./ClientInfo.module.scss";
import { useRef, useState } from "react";
import PhoneInput from "react-phone-input-2";

const cx = classNames.bind(style);

const CLIENT = {
  avatar:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFAz7TV79RYxtJu5RScxRax-OljYqpIKqPxw&s",
  name: "Davis Astee ",
  email: "davis@gmail.com",
  phone: "0348349754",
  password: "1234567",
  location:
    "Chemin du Lac-Pike, Low, La Vallée-de-la-Gatineau, Outaouais, Quebec, Canada",
};

function ClientInfo() {
  const [clientData, setClientData] = useState({ ...CLIENT });
  const dataRef = useRef({ phone: "", ...CLIENT });

  const handleChangeInput = (e) => {
    setClientData({ ...clientData, [e.target.name]: e.target.value });
  };

  const handleChangePhone = (value) => {
    if (dataRef.current.phone !== value) {
      dataRef.current.phone = value;
    }
    setClientData((prev) => ({
      ...prev,
      phone: dataRef.current.phone,
    }));
  };

  const handleOnSave = () => {
    setClientData({ ...dataRef.current });
  };

  console.log(clientData.phone)

  return (
    <div className={cx("wrapper")}>
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
        <Input dark readOnly={true} onSave={handleOnSave} frame="Phone">
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
  );
}

export default ClientInfo;
