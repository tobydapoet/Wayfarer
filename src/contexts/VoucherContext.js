import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const VoucherContext = createContext({
  allVouchers: [],
  selectedVoucher: {},
  errors: {},
  openForm: false,
  setOpenForm: () => {},
  handleReset: () => {},
  handleInputChange: () => {},
  handleCreateVoucher: () => {},
  handleUpdateVoucher: () => {},
  handleDeleteVoucher: () => {},
  handleSelectedVoucher: () => {},
});

export const VoucherProvider = ({ children }) => {
  const [allVouchers, setAllVouchers] = useState([]);
  const initialVoucher = {
    name: "",
    discountValue: 0,
    minCost: 0,
    description: "",
  };

  const [selectedVoucher, setSelectedVoucher] = useState(initialVoucher);
  const [errors, setErrors] = useState({});
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/vouchers`)
      .then((res) => setAllVouchers(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSelectedVoucher = (data) => {
    setOpenForm(true);
    setSelectedVoucher(data);
  };

  const handleReset = () => {
    setSelectedVoucher(initialVoucher);
  };
  console.log(selectedVoucher);

  const handleValidate = (name, value) => {
    const newErrors = {};
    switch (name) {
      case "name":
        if (!value.trim()) {
          newErrors.name = "Name cannot be empty!";
        }
        break;
      case "description":
        if (!value.trim()) {
          newErrors.description = "Description cannot be empty!";
        }
        break;
      case "discountValue":
        if (!value) {
          newErrors.discountValue = "Discount cannot be empty!";
        }
        break;
      case "minCost":
        if (!value) {
          newErrors.minCost = "Min cannot be empty!";
        } else if (Number(value) > Number(selectedVoucher.discountValue)) {
          newErrors.minCost = "Min cannot bigger than value";
        }
        break;
    }
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newErrors = handleValidate(name, value);
    setErrors((prevErors) => {
      const updated = { ...newErrors, ...prevErors };
      if (!newErrors[name]) {
        delete updated[name];
      }
      return updated;
    });
    setSelectedVoucher((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateVoucher = async () => {
    let newErrors = {};
    Object.entries(selectedVoucher).forEach(([name, value]) => {
      const updatedErrors = handleValidate(name, value);
      newErrors = { ...newErrors, ...updatedErrors };
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    try {
      const res = await axios.post(
        `http://localhost:3000/vouchers/create_voucher`,
        selectedVoucher
      );
      if (res.data.success) {
        setAllVouchers((prev) => [...prev, res.data.data]);
        toast.success(res.data.message);
        setOpenForm(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateVoucher = async () => {
    let newErrors;
    Object.entries(selectedVoucher).forEach(([name, value]) => {
      const updatedErrors = handleValidate(name, value);
      newErrors = { ...newErrors, ...updatedErrors };
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }
    try {
      const res = await axios.put(
        `http://localhost:3000/vouchers/${selectedVoucher._id}`,
        selectedVoucher
      );
      if (res.data.success) {
        setAllVouchers((prev) =>
          prev.map((voucher) =>
            voucher._id === selectedVoucher._id ? res.data.data : voucher
          )
        );
        toast.success(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteVoucher = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/vouchers/${selectedVoucher._id}`
      );
      if (res.data.success) {
        setAllVouchers((prev) =>
          prev.filter((item) => item._id !== selectedVoucher._id)
        );
        setSelectedVoucher(initialVoucher);
        toast.success(res.data.message);
        setOpenForm(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <VoucherContext.Provider
      value={{
        allVouchers,
        selectedVoucher,
        errors,
        handleInputChange,
        handleReset,
        openForm,
        setOpenForm,
        handleCreateVoucher,
        handleUpdateVoucher,
        handleDeleteVoucher,
        handleSelectedVoucher,
      }}
    >
      {children}
    </VoucherContext.Provider>
  );
};
