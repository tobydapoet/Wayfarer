import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AccountContext = createContext({
  user: {},
  setUser: () => {},
  dataLogin: {},
  dataRegister: {},
  changeLogin: () => {},
  setSavedPassword: () => {},
  handleLogout: () => {},
  changeRegister: () => {},
  checkLogin: () => {},
  checkRegister: () => {},
  errors: {},
});

export const AccountProvider = ({ children }) => {
  const [dataLogin, setDataLogin] = useState({});
  const [dataRegister, setDataRegister] = useState({});
  const [errors, setErrors] = useState({});
  const [savedPassword, setSavedPassword] = useState(false);
  const [user, setUser] = useState(() => {
    const localUser =
      localStorage.getItem("user") || sessionStorage.getItem("user");
    return localUser ? JSON.parse(localUser) : null;
  });
  const navigate = useNavigate();

  const handleValidate = (name, value) => {
    let newErrors = {};

    switch (name) {
      case "email":
        if (!value.trim()) {
          newErrors.email = "Email cannot be empty!";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          newErrors.email = "Wrong format!";
        }
        break;

      case "name":
        if (!value.trim()) {
          newErrors.name = "Name cannot be empty!";
        }
        break;

      case "password":
        if (!value.trim()) {
          newErrors.password = "Password cannot be empty!";
        } else if (value.length < 8) {
          newErrors.password = "Password minimum 8 characters!";
        }
        break;

      case "repassword":
        if (!value.trim()) {
          newErrors.repassword = "Please enter the password!";
        } else if (value !== dataRegister.password) {
          newErrors.repassword = "Passwords do not match!";
        }
        break;
    }

    return newErrors;
  };

  const changeRegister = (e) => {
    const { name, value } = e.target;
    const newErrors = handleValidate(name, value);
    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors, ...newErrors };
      if (!newErrors[name]) {
        delete updatedErrors[name];
      }
      return updatedErrors;
    });
    setDataRegister((prev) => ({ ...prev, [name]: value }));
  };

  const changeLogin = (e) => {
    const { name, value } = e.target;
    setDataLogin((prev) => ({ ...prev, [name]: value }));
  };

  const checkRegister = async () => {
    let newErrors = {};
    Object.entries(dataRegister).forEach(([name, value]) => {
      const updatedErrors = handleValidate(name, value);
      newErrors = { ...newErrors, ...updatedErrors };
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    try {
      const res = await axios.post("http://localhost:3000/clients/register", {
        email: dataRegister.email,
        name: dataRegister.name,
        password: dataRegister.password,
      });
      if (res.data.success) {
        toast.success("Register success!");
        resetRegisterData();
        sessionStorage.setItem("user", JSON.stringify({ ...res.data.data }));
        setUser(res.data.data);
        window.location.reload();
      } else {
        toast.error(res.data.message || "Email already exists!");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Register failed!";
      toast.error(errorMessage);
    }
  };

  const checkLogin = async () => {
    try {
      const resStaff = await axios.post("http://localhost:3000/staffs/login", {
        email: dataLogin.email,
        password: dataLogin.password,
      });
      if (resStaff.data.success) {
        const resUpdate = await axios.put(
          `http://localhost:3000/staffs/${resStaff.data.data._id}`,
          {
            status: "working",
          }
        );
        if (resUpdate.data.success) {
          if (savedPassword) {
            localStorage.setItem(
              "user",
              JSON.stringify({ ...resStaff.data.data })
            );
          } else {
            sessionStorage.setItem(
              "user",
              JSON.stringify({ ...resStaff.data.data })
            );
          }
          setUser(resStaff.data.data);
          window.location.reload();
        }
        return;
      }
    } catch (err) {}

    try {
      const resClient = await axios.post(
        "http://localhost:3000/clients/login",
        {
          email: dataLogin.email,
          password: dataLogin.password,
        }
      );

      if (resClient.data.success) {
        toast.success("Login success!");
        if (savedPassword) {
          localStorage.setItem(
            "user",
            JSON.stringify({ ...resClient.data.data })
          );
        } else {
          sessionStorage.setItem(
            "user",
            JSON.stringify({ ...resClient.data.data })
          );
        }

        window.location.reload();
        setUser(resClient.data.data);
      } else {
        const errorMessage =
          resClient.data.message || "Wrong email or password!";
        toast.error(errorMessage);
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Wrong email or password!";
      toast.error(errorMessage);
    }
  };

  const resetLoginData = () => {
    setDataLogin({ email: "", password: "" });
  };

  const resetRegisterData = () => {
    setDataRegister({
      name: "",
      email: "",
      password: "",
      repassword: "",
    });
    setErrors({});
  };

  const handleLogout = async () => {
    try {
      const user =
        JSON.parse(localStorage.getItem("user")) ||
        JSON.parse(sessionStorage.getItem("user"));

      if (user?.position) {
        // Nếu là nhân viên (có position), gọi API cập nhật trạng thái
        const res = await axios.put(
          `http://localhost:3000/staffs/${user._id}`,
          {
            status: "off duty",
          }
        );

        if (res.data.success) {
          console.log("Logout thành công (nhân viên)");
        } else {
          console.warn("Cập nhật trạng thái thất bại");
        }
      } else {
        console.log("Logout khách hàng (không cần cập nhật trạng thái)");
      }

      // Xoá user khỏi storage và chuyển trang
      localStorage.removeItem("user");
      sessionStorage.removeItem("user");
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <AccountContext.Provider
      value={{
        user,
        setUser,
        dataLogin,
        dataRegister,
        setSavedPassword,
        changeLogin,
        changeRegister,
        checkLogin,
        handleLogout,
        checkRegister,
        resetLoginData,
        resetRegisterData,
        errors,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
