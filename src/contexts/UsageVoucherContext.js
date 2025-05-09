import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const UsageVoucherContext = createContext({
  allUsageVouchers: {},
  listVouchersReceived: {},
  setListVouchersReceived: () => {},
  setVoucherReceived: () => {},
  voucherReceived: {},
  toggleDelete: () => {},
  listDelete: {},
  handleAssignVoucher: () => {},
  openForm: {},
  setOpenForm: () => {},
  handleDelete: () => {},
});

export const UsageVoucherProvider = ({ children }) => {
  const [allUsageVouchers, setAllUsageVouchers] = useState([]);
  const [listVouchersReceived, setListVouchersReceived] = useState([]);
  const [voucherReceived, setVoucherReceived] = useState({});
  const [listDelete, setlistDelete] = useState([]);
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/usage_vouchers`)
      .then((res) => setAllUsageVouchers(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleAssignVoucher = async () => {
    if (listVouchersReceived.length === 0) return;
    if (Object.keys(voucherReceived).length === 0) return;
    try {
      const clientIds = listVouchersReceived.map((client) => client._id);
      const res = await axios.post(
        `http://localhost:3000/usage_vouchers/assign`,
        {
          voucherId: voucherReceived._id,
          clientIds: clientIds,
        }
      );

      if (res.data.success) {
        setAllUsageVouchers((prev) => [...prev, ...res.data.data]);
        toast.success(res.data.message);
        setOpenForm(false);
        setListVouchersReceived([]);
        setVoucherReceived({});
      }
    } catch (err) {
      console.log(err);
      toast.error("Đã xảy ra lỗi khi gán voucher.");
    }
  };

  console.log("ListDelete: ", listDelete);

  const toggleDelete = (usage) => {
    setlistDelete((prev) => {
      const currentList = prev || [];
      const exists = currentList.some((item) => item._id === usage._id);

      if (exists) {
        return currentList.filter((item) => item._id !== usage._id);
      }
      return [...currentList, usage];
    });
  };

  const handleDelete = async () => {
    if (listDelete.length === 0) return;
    try {
      const usageIds = listDelete.map((usage) => usage._id);
      const res = await axios.delete(
        `http://localhost:3000/usage_vouchers/delete-many`,
        {
          data: { ids: usageIds },
        }
      );
      if (res.data.success) {
        setAllUsageVouchers((prev) =>
          prev.filter((voucher) => !usageIds.includes(voucher._id))
        );
        setlistDelete([]);
        toast.success(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <UsageVoucherContext.Provider
      value={{
        allUsageVouchers,
        listVouchersReceived,
        voucherReceived,
        openForm,
        toggleDelete,
        listDelete,
        setOpenForm,
        setListVouchersReceived,
        setVoucherReceived,
        handleAssignVoucher,
        handleDelete,
      }}
    >
      {children}
    </UsageVoucherContext.Provider>
  );
};
