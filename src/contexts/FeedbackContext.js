import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { BillContext } from "./BillContext";
import { getCurrentUser } from "../utils/currentUser";

export const FeedBackContext = createContext({
  allFeedbacks: [],
  feedbackContent: {},
  setFeedBackContent: () => {},
  openFeedBack: {},
  setOpenFeedback: () => {},
  handleExist: () => {},
  errors: {},
  handleCloseFeedback: () => {},
  handleInputChange: () => {},
  handleCreateFeedback: () => {},
  handleDeleteFeedback: () => {},
  handleCalculateRating: () => {},
});

const user = getCurrentUser();

export const FeedBackProvider = ({ children }) => {
  const { billInfo } = useContext(BillContext);
  const [allFeedbacks, setAllFeedbacks] = useState([]);
  const initialValue = {
    destinationId: "",
    clientId: user?._id,
    rating: 0,
    comment: "",
  };
  const [openFeedBack, setOpenFeedback] = useState(false);
  const [feedbackContent, setFeedBackContent] = useState(initialValue);
  const [errors, setErrors] = useState({});

  const handleExist = allFeedbacks.some(
    (feedback) =>
      feedback.destinationId === billInfo?.scheduleId?.destinationId?._id &&
      feedback.clientId === billInfo?.clientId._id
  );

  useEffect(() => {
    if (billInfo?.scheduleId?.destinationId?._id) {
      setFeedBackContent((prev) => ({
        ...prev,
        destinationId: billInfo.scheduleId.destinationId._id,
      }));
    }
  }, [billInfo]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/feedbacks`)
      .then((res) => setAllFeedbacks(res.data))
      .then((err) => console.log(err));
  }, []);

  const handleValidate = (name, value) => {
    const newErrors = {};
    switch (name) {
      case "rating":
        if (!value || Number(value) === 0) {
          newErrors.rating = "Please rating!";
        }
        break;
      case "comment":
        if (!value.trim()) {
          newErrors.comment = "Comment cannot be empty!";
        }
        break;
    }
    return newErrors;
  };

  const handleCloseFeedback = () => {
    setOpenFeedback(false);
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newErrors = handleValidate(name, value);
    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors, ...newErrors };
      if (!newErrors[name]) {
        delete updatedErrors[name];
      }
      return updatedErrors;
    });
    setFeedBackContent((prev) => ({ ...prev, [name]: value }));
  };

  const handleCalculateRating = (id) => {
    const relevantFeedbacks = allFeedbacks.filter(
      (feedback) => feedback.destinationId._id === id
    );
    if (relevantFeedbacks.length === 0) return 0;
    const total = relevantFeedbacks.reduce(
      (sum, feedback) => sum + feedback.rating,
      0
    );
    return Math.round((total / relevantFeedbacks.length) * 10) / 10;
  };

  const handleCreateFeedback = async () => {
    let newErrors = {};
    Object.entries(feedbackContent).forEach(([name, value]) => {
      const updatedErrors = handleValidate(name, value);
      newErrors = { ...newErrors, ...updatedErrors };
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    try {
      const res = await axios.post(
        `http://localhost:3000/feedbacks/create_feedback`,
        feedbackContent
      );
      if (res.data.success) {
        setAllFeedbacks((prev) => [...prev, res.data.data]);
        toast.success(res.data.message);
        setOpenFeedback(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteFeedback = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/feedbacks/${id}`);
      if (res.data.success) {
        setAllFeedbacks((prev) =>
          prev.filter((feedback) => feedback._id !== id)
        );
        toast.success(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <FeedBackContext.Provider
      value={{
        allFeedbacks,
        feedbackContent,
        errors,
        openFeedBack,
        handleExist,
        handleCloseFeedback,
        setOpenFeedback,
        setFeedBackContent,
        handleInputChange,
        handleCreateFeedback,
        handleDeleteFeedback,
        handleCalculateRating,
      }}
    >
      {children}
    </FeedBackContext.Provider>
  );
};
