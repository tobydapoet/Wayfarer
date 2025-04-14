import { createContext, useState, useMemo } from "react";

export const BillContext = createContext({
  payType: {},
  errors: {},
  noticeBox: false,
  billInfo: {},
  tempBillInfo: {},
  totalCalculate: {},
  voucherSelected: {},
  userVoucher: [],
  setNoticeBox: () => {},
  handleInputChange: () => {},
  handleOnSave: () => {},
  handlePayType: () => {},
  handleVoucherClick: () => {},
});

export const BillProvider = ({ children, data, userVoucher }) => {
  const [payType, setPayType] = useState(data?.payType || "");
  const [errors, setErrors] = useState({});
  const [noticeBox, setNoticeBox] = useState(false);
  const [billInfo, setBillInfo] = useState({});
  const [voucherSelected, setVoucherSelected] = useState(null);
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

  const validateInput = (name, value) => {
    const newErrors = {};
    const currentDate = new Date();

    switch (name) {
      case "client":
        if (!value.trim()) newErrors.client = "Customer name cannot be empty!";
        break;
      case "service":
        if (!value.trim()) newErrors.service = "Service name cannot be empty!";
        break;
      case "dateStart":
        const selectedStartDate = new Date(value);
        if (!value) newErrors.dateStart = "Start date cannot be empty!";
        else if (selectedStartDate < currentDate)
          newErrors.dateStart = "Invalid start date!";
        break;
      case "dateEnd":
        const selectedEndDate = new Date(value);
        const startDate = new Date(tempBillInfo.dateStart);
        if (!value) newErrors.dateEnd = "End date cannot be empty!";
        else if (selectedEndDate <= startDate)
          newErrors.dateEnd = "End date must be greater than the start date!";
        break;
      case "number":
        if (!value || value <= 0)
          newErrors.number = "Number of rooms must be greater than 0!";
        break;
      default:
        break;
    }

    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newErrors = validateInput(name, value);

    setErrors((prev) => {
      const updated = { ...prev, ...newErrors };
      if (!newErrors[name]) delete updated[name];
      return updated;
    });

    setTempBillInfo((prev) => ({ ...prev, [name]: value }));
  };
  const handlePayType = (type) => {
    setPayType(type);
    setTempBillInfo((prev) => ({ ...prev, type }));
  };

  const handleVoucherClick = (voucherValue) => {
    setVoucherSelected((prev) => (prev === voucherValue ? null : voucherValue));
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
    return total < 0 ? 0 : total;
  }, [
    tempBillInfo.dateStart,
    tempBillInfo.dateEnd,
    tempBillInfo.number,
    voucherSelected,
  ]);

  console.log(billInfo);

  const handleOnSave = () => {
    const newErrors = {
      ...validateInput("client", tempBillInfo.client),
      ...validateInput("dateStart", tempBillInfo.dateStart),
      ...validateInput("dateEnd", tempBillInfo.dateEnd),
      ...validateInput("number", tempBillInfo.number),
    };

    if (!payType) newErrors.payment = "Please select a payment method!";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setNoticeBox(true);
      return;
    }

    const billData = { ...tempBillInfo, total: totalCalculate };
    setBillInfo(billData);
    console.log("BillInfo saved:", billData);
  };

  return (
    <BillContext.Provider
      value={{
        payType,
        errors,
        noticeBox,
        setNoticeBox,
        billInfo,
        tempBillInfo,
        totalCalculate,
        voucherSelected,
        userVoucher,
        setNoticeBox,
        handleInputChange,
        handleOnSave,
        handlePayType,
        handleVoucherClick,
      }}
    >
      {children}
    </BillContext.Provider>
  );
};
