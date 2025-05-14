import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const ScheduleContext = createContext({
  allSchedules: [],
  selectedSchedule: {},
  errors: {},
  handleRowClick: () => {},
  handleResetErrors: () => {},
  edittingSchedule: {},
  setSelectedSchedule: () => {},
  setEdittingSchedule: () => {},
  handleEditInputChange: () => {},
  handleInputChange: () => {},
  handleCreateSchedule: () => {},
  handleUpdateSchedule: () => {},
  handleDeleteSchedule: () => {},
});

export const ScheduleProvider = ({ children }) => {
  const { id } = useParams();

  const [allSchedules, setAllSchedules] = useState([]);
  const initialSchedule = {
    destinationId: id,
    startDate: "",
    endDate: "",
    status: true,
    amount: 0,
  };
  const [selectedSchedule, setSelectedSchedule] = useState(initialSchedule);
  const [edittingSchedule, setEdittingSchedule] = useState(initialSchedule);
  const [errors, setErrors] = useState({ create: {}, edit: {} });

  useEffect(() => {
    axios
      .get(`http://localhost:3000/schedules`)
      .then((res) => setAllSchedules(res.data))
      .catch((err) => console.log(err));
  }, [allSchedules]);

  const handleRowClick = (schedule) => {
    setEdittingSchedule(schedule);
  };

  const handleResetErrors = () => {
    setErrors({ create: {}, edit: {} });
  };

  const handleValidate = (name, value, schedule = {}) => {
    const newErrors = {};
    const currentDate = new Date();

    switch (name) {
      case "startDate":
        const endDate = schedule.endDate ? new Date(schedule.endDate) : null;
        const selectedStartDate = new Date(value);
        if (!value) {
          newErrors.startDate = "Start date cannot be empty!";
        } else if (new Date(value) < currentDate) {
          newErrors.startDate = "Start date must be in the future!";
        } else if (endDate && selectedStartDate >= endDate) {
          newErrors.startDate = "Start date must be before the end date!";
        }
        break;

      case "endDate":
        const startDate = schedule.startDate
          ? new Date(schedule.startDate)
          : null;
        const selectedEndDate = new Date(value);

        if (!value) {
          newErrors.endDate = "End date cannot be empty!";
        } else if (startDate && selectedEndDate <= startDate) {
          newErrors.endDate = "End date must be after the start date!";
        }
        break;
      case "amount":
        if (!value) {
          newErrors.amount = "Amount cannot be empty!";
        }
      default:
        break;
    }

    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newError = handleValidate(name, value, selectedSchedule);

    setErrors((prevErrors) => ({
      ...prevErrors,
      create: {
        ...prevErrors.create,
        [name]: newError[name] || undefined,
      },
    }));

    setSelectedSchedule((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    const newError = handleValidate(name, value, edittingSchedule);

    setErrors((prevErrors) => ({
      ...prevErrors,
      edit: {
        ...prevErrors.edit,
        [edittingSchedule._id]: {
          ...(prevErrors.edit?.[edittingSchedule._id] || {}),
          [name]: newError[name] || undefined,
        },
      },
    }));

    setEdittingSchedule((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateSchedule = async () => {
    let newErrors = {};
    Object.entries(selectedSchedule).forEach(([name, value]) => {
      const updatedErrors = handleValidate(name, value, selectedSchedule);
      newErrors = {
        ...newErrors,
        create: { ...newErrors.create, ...updatedErrors },
      };
    });
    setErrors(newErrors);
    if (Object.keys(newErrors.create).length > 0) return;
    try {
      const res = await axios.post(
        `http://localhost:3000/schedules`,
        selectedSchedule
      );
      if (res.data.success) {
        setAllSchedules((prev) => [...prev, res.data.data]);
        setSelectedSchedule(initialSchedule);
        toast.success(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateSchedule = async () => {
    let newErrors = { edit: { [edittingSchedule._id]: {} } };

    Object.entries(edittingSchedule).forEach(([name, value]) => {
      const updatedError = handleValidate(name, value, edittingSchedule);
      if (updatedError[name]) {
        newErrors.edit[edittingSchedule._id][name] = updatedError[name];
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors.edit[edittingSchedule._id]).length > 0) return;

    try {
      const res = await axios.put(
        `http://localhost:3000/schedules/${edittingSchedule._id}`,
        edittingSchedule
      );

      if (res.data.success) {
        setAllSchedules((prev) =>
          prev.map((schedule) =>
            schedule._id === res.data.data._id ? res.data.data : schedule
          )
        );
        toast.success(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteSchedule = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/schedules/${id}`);
      if (res.data.success) {
        setAllSchedules((prev) =>
          prev.filter((schedule) => schedule._id !== id)
        );
        toast.success(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScheduleContext.Provider
      value={{
        allSchedules,
        selectedSchedule,
        edittingSchedule,
        errors,
        setSelectedSchedule,
        setEdittingSchedule,
        handleResetErrors,
        handleRowClick,
        handleEditInputChange,
        handleInputChange,
        handleCreateSchedule,
        handleUpdateSchedule,
        handleDeleteSchedule,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
};
