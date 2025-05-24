import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const UserOTPContext = createContext({
  userVerify: {},
  setUserVerify: () => {},
  handleCreateOTP: () => {},
  handleverifyOTP: () => {},
});

export const UserOTPProvider = ({ children }) => {
  const initialValue = { email: "", resetOtp: "" };
  const [userVerify, setUserVerify] = useState(initialValue);
  const { email } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (email) {
      setUserVerify((prev) => ({ ...prev, email: email }));
    }
  }, [email]);

  console.log(userVerify);

  const handleCreateOTP = async () => {
    try {
      const res = await axios.post(
        `http://localhost:3000/user-otp/send`,
        userVerify
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate(`/indentify/${userVerify.email}`);
        setUserVerify(initialValue);
      }
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  const handleverifyOTP = async () => {
    try {
      const res = await axios.post(
        `http://localhost:3000/user-otp/verify`,
        userVerify
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate(`/indentify/${userVerify.email}/reset`);
        setUserVerify(initialValue);
      }
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  return (
    <UserOTPContext.Provider
      value={{ userVerify, setUserVerify, handleCreateOTP, handleverifyOTP }}
    >
      {children}
    </UserOTPContext.Provider>
  );
};
