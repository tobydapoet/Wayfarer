import classNames from "classnames/bind";
import getCountryCode from "../../utils/countryUtils/countryUtils";
import Input from "../Input";
import style from "./UserProfile.module.scss";
import PhoneInput from "react-phone-input-2";
import Button from "../Button";
import images from "../../assets/images";
import { ClientContext } from "../../contexts/ClientContext";
import { StaffContext } from "../../contexts/StaffContext";
import { useContext, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

const cx = classNames.bind(style);

function UserProfile() {
  const {
    clientData,
    clientTempData,
    clientErrors,
    handleAddClient,
    handleDeleteClient,
    handleChangeClientInput,
    handleChangeClientPhone,
    handleChangeClientImg,
    handleOnSaveClient,
    handleSelectedClient,
  } = useContext(ClientContext);

  const {
    staffData,
    staffTempData,
    staffErrors,
    handleChangeStaffInput,
    handleChangeStaffPhone,
    handleChangeStaffAvatar,
    handleOnSaveStaff,
  } = useContext(StaffContext);

  console.log(staffData);

  const isStaff = !!staffData?.position;

  const tempData = isStaff ? staffTempData : clientTempData;
  const formData = isStaff ? staffData : clientData;
  const errors = isStaff ? staffErrors : clientErrors;
  const handleChangeInput = isStaff
    ? handleChangeStaffInput
    : handleChangeClientInput;
  const handleChangePhone = isStaff
    ? handleChangeStaffPhone
    : handleChangeClientPhone;
  const handleChangeImg = isStaff
    ? handleChangeStaffAvatar
    : handleChangeClientImg;
  const handleOnSave = isStaff ? handleOnSaveStaff : handleOnSaveClient;

  const location = useLocation();
  const param = useParams();

  console.log(param);
  useEffect(() => {
    if (param.email) {
      handleSelectedClient(param.email);
    }
  }, [param.email]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("main-detail")}>
        <div className={cx("name")}>
          <Input
            dark
            frame="Fullname"
            placeholder="Name..."
            value={tempData?.name || ""}
            name="name"
            onChange={handleChangeInput}
            error={errors?.name}
          />
        </div>
        <div className={cx("name")}>
          <Input
            dark
            frame="Email"
            className={cx("email", {
              isReadOnly: Object.keys(param).length > 0,
            })}
            placeholder="Email..."
            value={tempData?.email || ""}
            name="email"
            onChange={handleChangeInput}
            error={errors?.email}
          />
        </div>
        <div className={cx("password")}>
          <Input
            dark
            type="password"
            frame="Password"
            placeholder="Password..."
            value={tempData?.password || ""}
            name="password"
            onChange={handleChangeInput}
            error={errors?.password}
          />
        </div>
        <div className={cx("phone-container")}>
          <Input
            dark
            frame="Phone"
            name="phone"
            value={tempData?.phone || ""}
            error={errors?.phone}
          >
            <PhoneInput
              className={cx("phone")}
              enableSearch
              value={tempData?.phone || ""}
              name="phone"
              onChange={handleChangePhone}
              country={(getCountryCode(formData?.site) || "").toLowerCase()}
            />
          </Input>
        </div>
      </div>

      <div className={cx("avatar")}>
        <img src={tempData?.avatar || images.noImg} alt="avatar" />
        <div className={cx("input-container")}>
          <input type="file" name="avatar" onChange={handleChangeImg} />
        </div>
        {errors?.avatar && <p className={cx("error-text")}>{errors.avatar}</p>}
      </div>

      <div className={cx("location-container")}>
        <Input
          dark
          frame="Location"
          placeholder="Location"
          value={tempData?.site || ""}
          name="site"
          onChange={handleChangeInput}
          location
          error={errors?.site}
        />
      </div>

      <div className={cx("btn-container")}>
        {Object.keys(param).length > 0 ? (
          <>
            <Button
              rounded
              className={cx("save-btn")}
              onClick={() => handleOnSave(formData._id, tempData)}
            >
              Save
            </Button>
            {location.pathname.includes("/manage/business/clients/") &&
              !staffData.position && (
                <Button
                  rounded
                  className={cx("delete-btn")}
                  onClick={() => handleDeleteClient(formData._id)}
                >
                  Delete
                </Button>
              )}
          </>
        ) : (
          <Button rounded className={cx("save-btn")} onClick={handleAddClient}>
            Add
          </Button>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
