import classNames from "classnames/bind";
import getCountryCode from "../../utils/countryUtils/countryUtils";
import HeadlessTippy from "@tippyjs/react/headless";
import Input from "../Input";
import style from "./UserProfile.module.scss";
import PhoneInput from "react-phone-input-2";
import Button from "../Button";
import images from "../../assets/images";
import { ClientContext } from "../../contexts/ClientContext";
import { StaffContext } from "../../contexts/StaffContext";
import { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import Popper from "../Popper";
import { getCurrentUser } from "../../utils/currentUser";

const cx = classNames.bind(style);

const user = getCurrentUser();

const statusDisplay = {
  working: "working",
  "in meeting": "inMeeting",
  "on leave": "onLeave",
  "off duty": "offDuty",
};

function UserProfile() {
  const statusList = ["working", "in meeting", "on leave", "off duty"];
  const {
    clientData,
    clientErrors,
    handleAddClient,
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
    handleChangeStatus,
    handleChangeStaffInput,
    handleChangeStaffPhone,
    handleChangeStaffAvatar,
    handleOnSaveStaff,
    handleSelectedStaff,
  } = useContext(StaffContext);

  const location = useLocation();
  const param = useParams();
  const [isPopperVisible, setIsPopperVisible] = useState(false);
  const isManagingClient = location.pathname.includes("/clients/");
  const isStaff = !isManagingClient && !!user?.position;

  const tempData = isStaff ? staffTempData : clientData;
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
  const handleSelected = isStaff ? handleSelectedStaff : handleSelectedClient;

  useEffect(() => {
    if (param.email) {
      handleSelected(param.email);
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

        {location.pathname.includes("/manage/business/clients/") && (
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
        )}

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

      <div className={cx("left-side")}>
        <div className={cx("avatar")}>
          <img src={tempData?.avatar || images.noAvatar} alt="avatar" />
          <div className={cx("input-container")}>
            <input type="file" name="avatar" onChange={handleChangeImg} />
          </div>
          {errors?.avatar && (
            <p className={cx("error-text")}>{errors.avatar}</p>
          )}
        </div>
        {staffData.position && (
          // <div className={cx("status-container")}>
          //   <FontAwesomeIcon
          //     icon={faCircle}
          //     className={cx(
          //       "icon",
          //       statusDisplay[staffData.status?.toLowerCase?.()]
          //     )}
          //   />
          //   <div className={cx("status-txt")}>{staffData.status}</div>
          // </div>
          <HeadlessTippy
            placement="bottom"
            interactive
            visible={isPopperVisible}
            onClickOutside={() => setIsPopperVisible(false)}
            render={(attrs) => (
              <div className={cx("popper-container")} tabIndex="-1" {...attrs}>
                <Popper className={cx("popper")}>
                  {statusList
                    .filter((item) => item !== "off duty")
                    .map((item) => (
                      <div
                        key={item}
                        className={cx("status-option", {
                          selected: item === formData.status,
                        })}
                        onClick={() => {
                          handleChangeStatus(item);
                          setIsPopperVisible(false);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faCircle}
                          className={cx("icon", statusDisplay[item])}
                        />
                        <div>{item}</div>
                      </div>
                    ))}
                </Popper>
              </div>
            )}
          >
            <div
              className={cx("status-container")}
              onClick={() => setIsPopperVisible(!isPopperVisible)}
            >
              <FontAwesomeIcon
                icon={faCircle}
                className={cx("icon", statusDisplay[formData.status])}
              />
              <div className={cx("status-txt")}>{formData.status}</div>
            </div>
          </HeadlessTippy>
        )}
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
            {/* {location.pathname.includes("/manage/business/clients/") &&
              !staffData.position && (
                <Button
                  rounded
                  className={cx("delete-btn")}
                  onClick={() => handleDeleteClient(formData._id)}
                >
                  Delete
                </Button>
              )} */}
          </>
        ) : (
          <Button
            rounded
            className={cx("save-btn")}
            onClick={() => {
              handleAddClient();
              console.log(tempData);
            }}
          >
            Add
          </Button>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
