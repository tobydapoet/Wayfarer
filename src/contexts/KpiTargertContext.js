import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const KpiTargetContext = createContext({
  allKpi: [],
  currentKpi: {},
  setCurrentKpi: () => {},
  errors: {},
  openKpiForm: {},
  handleInputChange: () => {},
  handleCreateTarget: () => {},
  handleUpdateTarget: () => {},
  handleDeleteTarget: () => {},
  handleCloseKpiForm: () => {},
  handleOpenKpiForm: () => {},
  handleUpdateMonth: () => {},
});

export const KpiTargetProvider = ({ children }) => {
  const [openKpiForm, setOpenKpiForm] = useState(false);
  const [allKpi, setAllKpi] = useState([]);
  const initialValue = {
    year: new Date().getFullYear(),
    month: 0,
    target: {
      revenue: 0,
      billCount: 0,
    },
    actual: {
      revenue: 0,
      billCount: 0,
    },
  };
  const [currentKpi, setCurrentKpi] = useState(initialValue);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:3000/kpi-targets`)
      .then((res) => setAllKpi(res.data.reverse()))
      .catch((err) => console.log(err));
  }, []);

  const handleValidate = (name, value) => {
    const newErrors = {};
    switch (name) {
      case "month":
        if (!value) {
          newErrors.month = "Month cannot be empty!";
        } else if (
          Number(value) > 12 ||
          Number(value) < new Date().getMonth() + 1 ||
          !Number.isInteger(Number(value))
        ) {
          newErrors.month = "Invalid month!";
        }
        break;

      case "target.revenue":
        if (!value) {
          newErrors["target.revenue"] = "Revenue cannot be empty!";
        }
        break;
      case "target.billCount":
        if (!value) {
          newErrors["target.billCount"] = "Bill count cannot be empty!";
        }
        break;
    }
    return newErrors;
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const keys = name.split(".");
    const newErrors = handleValidate(name, value);

    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors, ...newErrors };
      if (!newErrors[name]) {
        delete updatedErrors[name];
      }
      return updatedErrors;
    });

    setCurrentKpi((prev) => {
      const updated = { ...prev };

      let current = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;

      return updated;
    });
  };

  const handleCloseKpiForm = () => {
    setErrors({});
    setCurrentKpi(initialValue);
    setOpenKpiForm(false);
  };

  const handleOpenKpiForm = (data) => {
    setOpenKpiForm(true);
    setCurrentKpi(data ? data : initialValue);
  };

  const handleCreateTarget = async () => {
    let newErrors = {};
    Object.entries(currentKpi).forEach(([name, value]) => {
      const updatedErrors = handleValidate(name, value);
      newErrors = { ...newErrors, ...updatedErrors };
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    try {
      const res = await axios.post(
        `http://localhost:3000/kpi-targets/create_kpi-target`,
        currentKpi
      );
      if (res.data.success) {
        setAllKpi((prev) => [...prev, res.data.data]);
        toast.success(res.data.message);
        setOpenKpiForm(false);
        setErrors({});
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const handleUpdateTarget = async () => {
    let newErrors = {};
    Object.entries(currentKpi).forEach(([name, value]) => {
      const updatedErrors = handleValidate(name, value);
      newErrors = { ...newErrors, ...updatedErrors };
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    try {
      const res = await axios.put(
        `http://localhost:3000/kpi-targets/${currentKpi._id}`,
        currentKpi
      );
      if (res.data.success) {
        setAllKpi((targets) =>
          targets.map((target) =>
            target._id === currentKpi._id ? res.data.data : target
          )
        );
        toast.success(res.data.message);
        setOpenKpiForm(false);
        setErrors({});
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateMonth = async (id, revenue, billCount) => {
    try {
      const res = await axios.put(`http://localhost:3000/kpi-targets/${id}`, {
        actual: { revenue, billCount },
      });
      if (res.data.success) {
        setAllKpi((targets) =>
          targets.map((target) => (target._id === id ? res.data.data : target))
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteTarget = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/kpi-targets/${currentKpi._id}`
      );
      if (res.data.success) {
        setAllKpi((targets) =>
          targets.filter((target) => target._id !== currentKpi._id)
        );
        toast.success(res.data.message);
        handleCloseKpiForm();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <KpiTargetContext.Provider
      value={{
        allKpi,
        currentKpi,
        setCurrentKpi,
        errors,
        handleInputChange,
        handleCreateTarget,
        handleUpdateTarget,
        handleDeleteTarget,
        openKpiForm,
        handleCloseKpiForm,
        handleOpenKpiForm,
        handleUpdateMonth,
      }}
    >
      {children}
    </KpiTargetContext.Provider>
  );
};
