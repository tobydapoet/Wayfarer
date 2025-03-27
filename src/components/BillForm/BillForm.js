import classNames from "classnames/bind";
import styles from "./BillForm.module.scss";
import Input from "../Input";
import Button from "../Button";
import Notice from "../Notice/Notice";
import { useMemo, useState } from "react";

const cx = classNames.bind(styles);

function BillForm({ data, userVoucher }) {
  const [payType, setPayType] = useState(data?.payType || "");
  const [errors, setErrors] = useState({});
  const [noticeBox, setNoticeBox] = useState(false);
  const [billInfo, setBillInfo] = useState({});
  const [tempBillInfo, setTempBillInfo] = useState(() => {
    return data
      ? {
          client: data.client || "",
          service: data.service || "",
          dateStart: data.dateStart || "",
          dateEnd: data.dateEnd || "",
          number: data.number || "",
          type: data.type || "",
          total: data.total || "",
        }
      : {
          client: "",
          service: "",
          dateStart: "",
          dateEnd: "",
          number: "",
          type: "",
          total: "",
        };
  });
  const [voucherSelected, setVoucherSelected] = useState(null);

  const QRCODE = [
    {
      name: "Paypal",
      code: "https://cdn.pixabay.com/photo/2018/05/08/21/29/paypal-3384015_1280.png",
    },
    {
      name: "Visa",
      code: "https://mondialbrand.com/wp-content/uploads/2024/02/visa-logo-preview.png",
    },
    {
      name: "Mastercard",
      code: "https://athgroup.vn/upload/blocks/thumb_1920x0/ATH-kh%C3%A1m-ph%C3%A1-b%E1%BB%99-nh%E1%BA%ADn-di%E1%BB%87n-mastercard-1.png",
    },
    {
      name: "MBBank",
      code: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDbEnmjjKXOTObZ4YOqqpbcVtJjNwREceuzA&s",
    },
  ];

  const handlePayType = (type) => {
    setPayType(type);
  };
  console.log("errors: ", errors);

  const validateInput = (name, value, tempBillInfo) => {
    const newErrors = {};

    switch (name) {
      case "client":
        if (!value.trim()) {
          newErrors.client = "Customer name cannot be empty!";
        }

        break;
      case "service":
        if (!value.trim()) {
          newErrors.service = "Service name cannot be empty!";
        }

        break;
      case "dateStart":
        const currentDate = new Date();
        const selectedStartDate = new Date(value);

        if (!value) {
          newErrors.dateStart = "Start date cannot be empty!";
        } else if (selectedStartDate < currentDate) {
          newErrors.dateStart = "Invalid start date!";
        }

        break;

      case "dateEnd":
        const selectedEndDate = new Date(value);
        const startDate = new Date(tempBillInfo.dateStart);

        if (!value) {
          newErrors.dateEnd = "End date cannot be empty!";
        } else if (selectedEndDate <= startDate) {
          newErrors.dateEnd = "End date must be greater than the start date!";
        }
        break;

      case "number":
        if (!value || value <= 0) {
          newErrors.number = "Number of rooms must be greater than 0!";
        }

        break;

      default:
        break;
    }

    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const newErrors = validateInput(name, value, tempBillInfo);

    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors, ...newErrors };

      if (!newErrors[name]) {
        delete updatedErrors[name];
      }

      return updatedErrors;
    });

    setTempBillInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleOnSave = () => {
    const newErrors = {
      ...validateInput("client", tempBillInfo.client, tempBillInfo),
      ...validateInput("dateStart", tempBillInfo.dateStart, tempBillInfo),
      ...validateInput("dateEnd", tempBillInfo.dateEnd, tempBillInfo),
      ...validateInput("number", tempBillInfo.number, tempBillInfo),
    };

    if (!payType) {
      newErrors.payment = "Please select a payment method!";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setNoticeBox(true);
      return;
    }

    const billData = {
      ...tempBillInfo,
      total: totalCalculate,
    };
    setBillInfo(billData);
    console.log("BillInfo saved:", billData);
  };

  console.log("tempBillInfo trước khi save:", tempBillInfo);
  console.log("BillInfo ", billInfo);

  const serviceMap = {
    0: "Participants",
    1: "Number of rooms",
    2: "Number of transports",
  };

  const totalCalculate = useMemo(() => {
    if (!tempBillInfo.dateStart || !tempBillInfo.dateEnd) return 0;
    const dateStart = new Date(tempBillInfo.dateStart);
    const dateEnd = new Date(tempBillInfo.dateEnd);
    const days = Math.ceil(dateEnd - dateStart) / (1000 * 60 * 60 * 24);
    const number = tempBillInfo.number;
    const discount = voucherSelected || 0;

    const pricePerRoom = 500000;
    let total = days * number * pricePerRoom - discount;

    if (total < 0) total = 0;

    return total;
  }, [
    tempBillInfo.dateStart,
    tempBillInfo.dateEnd,
    tempBillInfo.number,
    voucherSelected,
  ]);

  const handleVoucherClick = (voucherValue) => {
    if (voucherSelected === voucherValue) {
      setVoucherSelected(null);
    } else {
      setVoucherSelected(voucherValue);
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("client")}>
        <Input
          dark
          name="client"
          frame="Client"
          value={tempBillInfo.client}
          onChange={handleInputChange}
          error={errors.client}
        />
      </div>
      <div className={cx("service", { "pointer-none": tempBillInfo.service })}>
        <Input
          dark
          name="service"
          frame="Name"
          value={tempBillInfo.service}
          onChange={handleInputChange}
          error={errors.service}
        />
      </div>
      <div className={cx("row")}>
        <div className={cx("check-in")}>
          <Input
            dark
            type="date"
            name="dateStart"
            frame="Check in"
            value={tempBillInfo.dateStart}
            onChange={handleInputChange}
            error={errors.dateStart}
          />
        </div>

        <div className={cx("check-out")}>
          <Input
            dark
            type="date"
            name="dateEnd"
            frame="Check out"
            value={tempBillInfo.dateEnd}
            onChange={handleInputChange}
            error={errors.dateEnd}
          />
        </div>

        <div className={cx("number")}>
          <Input
            dark
            type="number"
            name="number"
            frame={"Number"}
            value={tempBillInfo.number}
            onChange={handleInputChange}
            error={errors.number}
          />
        </div>
      </div>
      {userVoucher && (
        <div className={cx("voucher-wrapper")}>
          {userVoucher.map((voucher, index) => (
            <div
              key={index}
              className={cx("voucher-container", {
                selected: voucher.value === voucherSelected,
              })}
              onClick={() => handleVoucherClick(voucher.value)}
            >
              <div className={cx("voucher-code")}>{voucher.name}</div>
              <div className={cx("voucher-details")}>
                Use this code to get{" "}
                {`${voucher.value.toLocaleString("vi-VN")} VND ` || "a discount "}
                off on your next purchase.
              </div>
            </div>
          ))}
        </div>
      )}
      <div className={cx("total")}>
        <div className={cx("total-value")}>
          Total: {totalCalculate.toLocaleString("vi-VN")}
        </div>
      </div>
      <div className={cx("pay-type")}>
        <div className={cx("pay-title")}>Payment method</div>
        <div className={cx("type-choice")}>
          {QRCODE.map((type, index) => (
            <button
              key={index}
              onClick={() => {
                handlePayType(type.name);
                setTempBillInfo((prev) => ({ ...prev, type: type.name }));
              }}
            >
              {type.name}
            </button>
          ))}
        </div>
        {payType && (
          <img
            src={QRCODE.find((item) => item.name === payType)?.code}
            alt="Payment type"
          />
        )}
      </div>

      <div className={cx("btn-wrapper")}>
        <Button large onClick={handleOnSave}>
          Confirm
        </Button>
      </div>
      <Notice
        warn
        open={noticeBox}
        onClose={() => setNoticeBox(false)}
        content={
          errors.payment ? errors.payment : "Something wrong with your bill !"
        }
      />
    </div>
  );
}

export default BillForm;
