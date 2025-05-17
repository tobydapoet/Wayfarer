import axios from "axios";
import { createContext, useState, useMemo, useEffect, useContext } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { DestinationContext } from "./DestinationContext";
import { UsageVoucherContext } from "./UsageVoucherContext";
import { PayTypeContext } from "./PayTypeContext";
import { ScheduleContext } from "./ScheduleContext";
import { toast } from "react-toastify";
import { ClientContext } from "./ClientContext";

export const BillContext = createContext({
  allBills: [],
  errors: {},
  noticeBox: false,
  billInfo: {},
  totalCalculate: {},
  totalTempCalculate: {},
  tempBillInfo: {},
  searchBillsResult: {},
  setNoticeBox: () => {},
  handleClient: () => {},
  handleUpdateBill: () => {},
  setTempBillInfo: () => {},
  setBillInfo: () => {},
  handleSchedule: () => {},
  handleInputChange: () => {},
  handleUsageVoucher: () => {},
  setTempBillInfo: () => {},
  handleOnSave: () => {},
  handlePayType: () => {},
  handleCreateBill: () => {},
  handleDeleteBill: () => {},
  handleUpdateStatusBill: () => {},
  handleSearchBill: () => {},
});

const user =
  JSON.parse(localStorage.getItem("user")) ||
  JSON.parse(sessionStorage.getItem("user"));

export const BillProvider = ({ children }) => {
  const navigate = useNavigate();

  const [allBills, setAllBills] = useState([]);
  const [errors, setErrors] = useState({});
  const [noticeBox, setNoticeBox] = useState(false);
  const param = useParams();

  const initialValue = {
    clientId: !user.position ? user._id : "",
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
  const [billInfo, setBillInfo] = useState(initialValue);
  const [tempBillInfo, setTempBillInfo] = useState(initialValue);
  const { content } = useContext(DestinationContext);
  const { selectedUsageVoucher, setSelectedUsageVoucher } =
    useContext(UsageVoucherContext);
  const { setPayTypeSelected } = useContext(PayTypeContext);
  const { edittingSchedule, setEdittingSchedule, allSchedules } =
    useContext(ScheduleContext);
  const [searchBillsResult, setSearchBillsResult] = useState([]);
  const { setClientData } = useContext(ClientContext);

  // useEffect(() => {
  //   console.log(billInfo);
  // }, [billInfo]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/bills`)
      .then((res) => setAllBills(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (param.id)
      axios
        .get(`http://localhost:3000/bills/${param.id}`)
        .then((res) => setBillInfo(res.data))
        .catch((err) => console.log(err));
  }, [param.id]);

  useEffect(() => {
    setTempBillInfo({ ...billInfo, status: "Pending Confirmation" });
  }, [billInfo]);

  const validateInput = (name, value) => {
    const newErrors = {};

    switch (name) {
      case "num":
        if (!value || value <= 0) newErrors.num = "Must be greater than 0!";
        break;
      case "scheduleId":
        if (!value) newErrors.scheduleId = "Please select schedule!";
        else if (
          allBills
            .filter((bill) => bill.scheduleId._id === edittingSchedule._id)
            .reduce((sum, bill) => sum + bill.num, 0) === edittingSchedule.amout
        )
          newErrors.scheduleId = "This schedule is full!";
        break;
      case "paytypeId":
        if (!value) newErrors.paytypeId = "Please select paytype!";
        break;
      case "clientId":
        if (!value) newErrors.clientId = "Please select client!";
        break;
      default:
        break;
    }

    return newErrors;
  };

  useEffect(() => {
    const updateStatus = async () => {
      await axios.post("http://localhost:3000/bills/status-by-time");
    };
    updateStatus();
  }, []);

  const handleInputChange = (e, setState) => {
    const { name, value } = e.target;
    const newErrors = validateInput(name, value);

    setErrors((prev) => {
      const updated = { ...prev, ...newErrors };
      if (!newErrors[name]) delete updated[name];
      return updated;
    });

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleClient = (client) => {
    const newErrors = validateInput("client", client._id);
    setErrors((prevErrors) => {
      const updatedErrors = { ...newErrors, ...prevErrors };
      if (!newErrors.clientId) {
        delete updatedErrors.clientId;
      }
      return updatedErrors;
    });
    setClientData(client);
    setBillInfo((prev) => ({ ...prev, clientId: client._id }));
  };

  const handlePayType = (type) => {
    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      if (prevErrors.paytypeId) {
        delete updatedErrors.paytypeId;
      }
      return updatedErrors;
    });
    setPayTypeSelected(type);
    setBillInfo((prev) => ({ ...prev, paytypeId: type._id }));
  };

  const handleUsageVoucher = (voucher) => {
    setSelectedUsageVoucher(voucher);
    setBillInfo((prev) => ({ ...prev, usageVoucherId: voucher._id }));
  };

  const handleSchedule = (schedule, setState) => {
    const newErrors = validateInput("schedule", schedule._id);
    setErrors((prevErrors) => {
      const updatedErrors = { ...newErrors, ...prevErrors };
      if (!newErrors.scheduleId) {
        delete updatedErrors.scheduleId;
      }
      return updatedErrors;
    });

    setState((prev) => ({ ...prev, scheduleId: schedule._id }));

    setEdittingSchedule(schedule);
  };

  const totalCalculate = useMemo(() => {
    let estimateCost =
      content?.price * Number(billInfo?.num) -
      (selectedUsageVoucher?.voucherId?.discountValue || 0);
    return Math.max(estimateCost, 0);
  }, [content?.price, billInfo?.num, selectedUsageVoucher]);

  useEffect(() => {
    setBillInfo((prev) => ({
      ...prev,
      pay: totalCalculate,
    }));
  }, [totalCalculate]);

  const totalTempCalculate = useMemo(() => {
    const scheduleId =
      typeof tempBillInfo.scheduleId === "string"
        ? tempBillInfo?.scheduleId
        : tempBillInfo?.scheduleId?._id;

    const selectedSchedule = allSchedules.find((s) => s?._id === scheduleId);

    const price = selectedSchedule?.destinationId?.price || 0;
    const num = Number(tempBillInfo.num) || 0;
    const discount = tempBillInfo.usageVoucherId?.voucherId?.discountValue || 0;

    const estimateCost = price * num - discount;
    return Math.max(estimateCost, 0);
  }, [
    tempBillInfo?.scheduleId,
    tempBillInfo?.num,
    tempBillInfo?.usageVoucherId,
    allSchedules,
  ]);

  useEffect(() => {
    setTempBillInfo((prev) => ({
      ...prev,
      pay: totalTempCalculate,
    }));
  }, [totalTempCalculate]);

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
  };

  const handleCreateBill = async () => {
    let newErrors = {};
    Object.entries(billInfo).forEach(([name, value]) => {
      const updatedErrors = validateInput(name, value);
      newErrors = { ...newErrors, ...updatedErrors };
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

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

  const handleUpdateBill = async () => {
    let newErrors = {};
    Object.entries(tempBillInfo).forEach(([name, value]) => {
      const updatedErrors = validateInput(name, value);
      newErrors = { ...newErrors, ...updatedErrors };
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:3000/bills/${tempBillInfo._id}`,
        {
          ...tempBillInfo,
          scheduleId: tempBillInfo.scheduleId?._id || null,
          usageVoucherId: tempBillInfo.usageVoucherId?._id || null,
          paytypeId:
            typeof tempBillInfo.paytypeId === "object"
              ? tempBillInfo.paytypeId?._id || null
              : tempBillInfo.paytypeId,
          status: "Pending Confirmation",
        }
      );
      if (res.data.success) {
        setAllBills((prev) =>
          prev.map((bill) =>
            bill._id === tempBillInfo._id ? res.data.data : bill
          )
        );
        setBillInfo(tempBillInfo);
        toast.success(res.data.message);
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const handleUpdateStatusBill = async (id, status, cancelReason) => {
    try {
      const res = await axios.put(`http://localhost:3000/bills/${id}/status`, {
        status,
        cancelReason,
      });
      if (res.data.success) {
        setAllBills((bills) =>
          bills.map((bill) =>
            bill._id === id ? { ...bill, status: res.data.data.status } : bill
          )
        );
        setBillInfo((prev) => ({ ...prev, status: res.data.data.status }));
        toast.success(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteBill = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/bills/${id}`);
      if (res.data.success) {
        setAllBills((bills) => bills.filter((bill) => bill._id != id));
        toast.success(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearchBill = async (keyword) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/bills/search?keyword=${keyword}`
      );
      if (res.data.success) {
        setSearchBillsResult(res.data.data);
      } else {
        setSearchBillsResult([]);
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
        handleUpdateBill,
        allBills,
        billInfo,
        billInfo,
        totalCalculate,
        totalTempCalculate,
        searchBillsResult,
        tempBillInfo,
        handleClient,
        setTempBillInfo,
        handleSchedule,
        handleUsageVoucher,
        setNoticeBox,
        setBillInfo,
        setTempBillInfo,
        handleInputChange,
        handleUpdateStatusBill,
        handleOnSave,
        handlePayType,
        handleDeleteBill,
        handleSearchBill,
      }}
    >
      {children}
    </BillContext.Provider>
  );
};
