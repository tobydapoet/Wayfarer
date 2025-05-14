import axios from "axios";
import { createContext, useState, useMemo, useEffect, useContext } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { DestinationContext } from "./DestinationContext";
import { UsageVoucherContext } from "./UsageVoucherContext";
import { PayTypeContext } from "./PayTypeContext";
import { ScheduleContext } from "./ScheduleContext";
import { toast } from "react-toastify";

export const BillContext = createContext({
  allBills: [],
  errors: {},
  noticeBox: false,
  billInfo: {},
  totalCalculate: {},
  setNoticeBox: () => {},
  handleSchedule: () => {},
  handleInputChange: () => {},
  handleUsageVoucher: () => {},
  handleOnSave: () => {},
  handlePayType: () => {},
  handleCreateBill: () => {},
  handleDeleteBill: () => {},
});

const user =
  JSON.parse(localStorage.getItem("user")) ||
  JSON.parse(sessionStorage.getItem("user"));

export const BillProvider = ({ children }) => {
  const navigate = useNavigate();
  const initialValue = {
    clientId: user._id,
    usageVoucherId: null,
    paytypeId: "",
    scheduleId: "",
    num: 0,
    pay: 0,
    status: "Pending Confirmation",
    cancelledAt: null,
    cancelReason: null,
    refundAmount: null,
  };

  const [allBills, setAllBills] = useState([]);
  const [errors, setErrors] = useState({});
  const [noticeBox, setNoticeBox] = useState(false);
  const [billInfo, setBillInfo] = useState(initialValue);
  const { content } = useContext(DestinationContext);
  const { selectedUsageVoucher, setSelectedUsageVoucher } =
    useContext(UsageVoucherContext);
  const { setPayTypeSelected } = useContext(PayTypeContext);
  const { setEdittingSchedule } = useContext(ScheduleContext);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/bills`)
      .then((res) => setAllBills(res.data))
      .catch((err) => console.log(err));
  }, []);

  const validateInput = (name, value) => {
    const newErrors = {};

    switch (name) {
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

    setBillInfo((prev) => ({ ...prev, [name]: value }));
  };
  const handlePayType = (type) => {
    setPayTypeSelected(type);
    setBillInfo((prev) => ({ ...prev, paytypeId: type._id }));
  };

  const handleUsageVoucher = (voucher) => {
    setSelectedUsageVoucher(voucher);
    setBillInfo((prev) => ({ ...prev, usageVoucherId: voucher._id }));
  };

  const handleSchedule = (schedule) => {
    console.log("here: ", schedule);
    setEdittingSchedule(schedule);
    setBillInfo((prev) => ({ ...prev, scheduleId: schedule._id }));
  };
  console.log(selectedUsageVoucher || "");

  console.log(billInfo);

  const totalCalculate = useMemo(() => {
    let estimateCost =
      content?.price * Number(billInfo.num) -
      (selectedUsageVoucher?.voucherId?.discountValue || 0);
    return Math.max(estimateCost, 0);
  }, [content?.price, billInfo.num, selectedUsageVoucher]);

  useEffect(() => {
    setBillInfo((prev) => ({
      ...prev,
      pay: totalCalculate,
    }));
  }, [totalCalculate]);

  const handleOnSave = () => {
    const newErrors = {
      ...validateInput("number", billInfo.number),
    };

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setNoticeBox(true);
      return;
    }

    const billData = { ...billInfo, total: totalCalculate };
    setBillInfo(billData);
    console.log("BillInfo saved:", billData);
  };

  const handleCreateBill = async () => {
    try {
      const res = await axios.post(
        `http://localhost:3000/bills/create_bill`,
        billInfo
      );
      if (res.data.success) {
        setAllBills((prev) => [...prev, res.data.data]);
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const handleDeleteBill = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/bills/${id}`);
      console.log(res.data.message);
      if (res.data.success) {
        setAllBills((bills) => bills.filter((bill) => bill._id != id));
        toast.success(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <BillContext.Provider
      value={{
        errors,
        noticeBox,
        setNoticeBox,
        handleCreateBill,
        allBills,
        billInfo,
        billInfo,
        totalCalculate,
        handleSchedule,
        handleUsageVoucher,
        setNoticeBox,
        handleInputChange,
        handleOnSave,
        handlePayType,
        handleDeleteBill,
      }}
    >
      {children}
    </BillContext.Provider>
  );
};
