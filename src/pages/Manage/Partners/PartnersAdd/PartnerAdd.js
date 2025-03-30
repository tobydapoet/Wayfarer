import classNames from "classnames/bind";
import styles from "./PartnerAdd.module.scss";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import { useState } from "react";
import images from "../../../../assets/images";
import PhoneInput from "react-phone-input-2";

const cx = classNames.bind(styles);

function PartnersAdd() {
  const [partnerValue, setPartnerValue] = useState({
    name: "",
    status: "",
    startDate: "",
    endDate: "",
    logo: "",
    tax: "",
    position: "",
    represent: "",
    phone: "",
    email: "",
    policy: "",
    address: "",
    content: "",
  });
  const [tempPartnerValue, setTempPartnerValue] = useState({ ...partnerValue });
  const [errors, setErrors] = useState({});

  const validateInput = (name, value) => {
    const newErrors = {};
    switch (name) {
      case "name": {
        if (!value.trim()) {
          newErrors.name = "Brand is empty!";
        }
        break;
      }
      case "tax": {
        if (!value.trim()) {
          newErrors.tax = "Tax code is empty!";
        } else if (!/^\d{10}(\-\d{3})?$/.test(value)) {
          newErrors.tax = "Wrong format!";
        }
        break;
      }
      case "startDate": {
        const currentDate = new Date();
        const selectedStartDate = new Date(value);
        if (!value) {
          newErrors.startDate = "Start date cannot be empty!";
        } else if (selectedStartDate < currentDate) {
          newErrors.startDate = "Invalid start date!";
        }
        break;
      }
      case "endDate":
        const selectedEndDate = new Date(value);
        const dateStart = new Date(tempPartnerValue.startDate);

        if (!value) {
          newErrors.endDate = "End date cannot be empty!";
        } else if (selectedEndDate <= dateStart) {
          newErrors.endDate = "End date must be greater than the start date!";
        }
        break;
      case "email":
        if (!value.trim()) {
          newErrors.email = "Email cannot be empty!";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          newErrors.email = "Wrong format";
        }
        break;

      case "phone":
        if (!value.trim()) {
          newErrors.phone = "Phone cannot be empty!";
        }
        break;
      case "address":
        if (!value.trim()) {
          newErrors.address = "Address cannot be empty!";
        }
        break;
      case "content":
        if (!value.trim()) {
          newErrors.content = "Content cannot be empty!";
        }
        break;
      case "policy":
        if (!value.trim()) {
          newErrors.policy = "Policy cannot be empty!";
        }
        break;
      case "represent":
        if (!value.trim()) {
          newErrors.represent = "Represent cannot be empty!";
        }
        break;
      case "position":
        if (!value.trim()) {
          newErrors.position = "Position cannot be empty!";
        }
        break;
      case "logo": {
        if (!value) {
          newErrors.logo = "Logo cannot be empty!";
        }
      }
    }
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newErrors = validateInput(name, value);
    setErrors((prevErrors) => {
      const updatedErrors = { ...newErrors, ...prevErrors };
      if (!newErrors[name]) {
        delete updatedErrors[name];
      }
      return updatedErrors;
    });

    setTempPartnerValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleOnSave = () => {
    let newErrors = {};

    Object.entries(tempPartnerValue).forEach(([name, value]) => {
      const fieldErrors = validateInput(name, value);
      newErrors = { ...newErrors, ...fieldErrors }; // Merge tất cả lỗi
    });

    setErrors(newErrors);

    // Kiểm tra nếu có lỗi thì không tiếp tục
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setPartnerValue(tempPartnerValue);
  };

  console.log(errors);
  const handleChangePhone = (value) => {
    setTempPartnerValue((prev) => {
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
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    const file = e.target.files[0];
    const newErrors = validateInput("logo", file);
    setErrors((prevErrors) => {
      const updatedErrors = { ...newErrors, prevErrors };
      if (!newErrors.logo) {
        delete updatedErrors.logo;
      }
      return updatedErrors;
    });
    if (newErrors.logo) {
      return;
    }
    const newFile = URL.createObjectURL(file);
    setTempPartnerValue((prev) => ({ ...prev, logo: newFile }));
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("brand-wrapper")}>
        <div className={cx("brand-container")}>
          <Input
            dark
            placeholder="Brand name..."
            name="name"
            frame="Brand"
            onChange={handleInputChange}
            error={errors.name}
          />
        </div>
        <div className={cx("tax-container")}>
          <Input
            dark
            placeholder="Tax code..."
            name="tax"
            frame="Tax code"
            type="number"
            onChange={handleInputChange}
            error={errors.tax}
          />
        </div>
        <div className={cx("img-container")}>
          <img src={tempPartnerValue?.logo || images.noImg} />
          <div className={cx("file-container")}>
            <input type="file" name="logo" onChange={handleChangeImg} />
          </div>
          {errors.logo && <p className={cx("error-text")}>{errors.logo}</p>}
        </div>
      </div>

      <div className={cx("time")}>
        <div className={cx("start-container")}>
          <Input
            dark
            placeholder="Start date..."
            name="startDate"
            frame="Start date"
            type="date"
            className={cx("start")}
            onChange={handleInputChange}
            error={errors.startDate}
          />
        </div>
        <div className={cx("end-container")}>
          <Input
            dark
            placeholder="End date..."
            name="endDate"
            frame="End date"
            type="date"
            className={cx("end")}
            onChange={handleInputChange}
            error={errors.endDate}
          />
        </div>
      </div>
      <div className={cx("representative-container")}>
        <div className={cx("represent-container")}>
          <Input
            dark
            placeholder="Representative..."
            name="represent"
            frame="Representative"
            onChange={handleInputChange}
            error={errors.represent}
          />
        </div>
        <div className={cx("position-container")}>
          <Input
            dark
            placeholder="Position..."
            name="position"
            frame="Position"
            onChange={handleInputChange}
            error={errors.position}
          />
        </div>
      </div>
      <div className={cx("contact")}>
        <div className={cx("email-container")}>
          <Input
            dark
            placeholder="Email..."
            name="email"
            frame="Email"
            onChange={handleInputChange}
            error={errors.email}
          />
        </div>
        <div className={cx("phone-container")}>
          <Input dark frame="Phone" error={errors.phone}>
            <PhoneInput
              className={cx("phone")}
              enableSearch
              name="phone"
              onChange={handleChangePhone}
              error={errors.phone}
            />
          </Input>
        </div>
      </div>
      <div className={cx("address-container")}>
        <Input
          dark
          placeholder="Address..."
          name="address"
          frame="Address"
          onChange={handleInputChange}
          error={errors.address}
        />
      </div>
      <div className={cx("content-container")}>
        <Input
          dark
          placeholder="Content..."
          name="content"
          frame="Collaborative Content"
          textarea
          onChange={handleInputChange}
          error={errors.content}
        />
      </div>
      <div className={cx("policy-container")}>
        <Input
          dark
          placeholder="Privacy & Policy..."
          name="policy"
          textarea
          frame="Privacy & Policy"
          onChange={handleInputChange}
          error={errors.policy}
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

export default PartnersAdd;
