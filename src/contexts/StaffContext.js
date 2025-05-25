import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getCurrentUser } from "../utils/currentUser";

export const StaffContext = createContext({
  allStaffsData: [],
  staffData: {},
  staffTempData: {},
  staffErrors: {},
  searchResult: {},
  handleSearchStaff: () => {},
  handleAddStaff: () => {},
  handleSearchStaff: () => {},
  handleSelectedStaff: () => {},
  handleDeleteStaff: () => {},
  handleChangeStatus: () => {},
  handleChangeStaffInput: () => {},
  handleChangeStaffPhone: () => {},
  handleChangeStaffAvatar: () => {},
  handleOnSaveStaff: () => {},
});

export const StaffProvider = ({ children }) => {
  const [allStaffsData, setAllStaffsData] = useState([]);
  const [staffData, setStaffData] = useState({
    name: "",
    email: "",
    password: "",
    repassword: "",
    birth: "",
    phone: "",
    salary: "",
    site: "",
    avatar: "",
    status: "off duty",
  });
  const [staffTempData, setStaffTempData] = useState({});
  const [staffErrors, setStaffErrors] = useState({});
  const [searchResult, setSearchResult] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setStaffTempData({ ...staffData });
  }, [staffData]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/staffs")
      .then((res) => setAllStaffsData(res.data))
      .catch((err) => console.error("Lỗi khi fetch:", err));
  }, []);

  const handleSelectedStaff = (StaffEmail) => {
    axios
      .get(`http://localhost:3000/staffs/${StaffEmail}`)
      .then((res) => setStaffData(res.data))
      .catch(() => navigate(`/unauthorized`));
  };

  const validateInput = (name, value) => {
    const newErrors = {};
    switch (name) {
      case "name":
        if (!value.trim()) newErrors.name = "Name cannot be empty!";
        break;
      case "email":
        if (!value.trim()) {
          newErrors.email = "Email cannot be empty!";
        } else if (
          !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value
          )
        ) {
          newErrors.email = "Wrong format";
        }
        break;
      case "password":
        if (!value.trim()) {
          newErrors.password = "Password cannot be empty!";
        } else if (value.length < 8) {
          newErrors.password = "Password must be more than 8 characters";
        }
        break;
      case "repassword":
        if (!value.trim()) {
          newErrors.repassword = "Please enter the password!";
        } else if (value !== staffData.password) {
          newErrors.repassword = "Passwords do not match!";
        }
        break;
      case "phone":
        if (!value.trim()) newErrors.phone = "Phone cannot be empty";
        break;
      case "site":
        if (!value.trim()) newErrors.site = "Site cannot be empty!";
        break;
      case "avatar":
        if (!value) newErrors.avatar = "Please choose your avatar!";
        break;
      case "salary":
        if (!value.trim()) newErrors.salary = "Salary cannot be empty";
        break;
      case "birth": {
        const birthDate = new Date(value);
        const today = new Date();
        const tenYearsAgo = new Date();
        tenYearsAgo.setFullYear(today.getFullYear() - 10);
        if (!value.trim()) {
          newErrors.birth = "Birth cannot be empty";
        } else if (birthDate > tenYearsAgo) {
          newErrors.birth = "Invalid birthday";
        }
        break;
      }
    }
    return newErrors;
  };

  const handleChangeStaffInput = (e) => {
    const { name, value } = e.target;
    const newErrors = validateInput(name, value);

    setStaffErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors, ...newErrors };
      if (!newErrors[name]) delete updatedErrors[name];
      return updatedErrors;
    });

    setStaffTempData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeStaffPhone = (value) => {
    const newErrors = validateInput("phone", value);

    setStaffErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors, ...newErrors };
      if (!newErrors.phone) delete updatedErrors.phone;
      return updatedErrors;
    });

    setStaffTempData((prev) => ({ ...prev, phone: value }));
  };

  const handleChangeStaffAvatar = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result;
      setStaffTempData((prev) => ({ ...prev, avatar: base64 }));

      setStaffErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors };
        delete updatedErrors.avatar;
        return updatedErrors;
      });
    };
    reader.readAsDataURL(file); // Chuyển thành base64
  };

  const handleOnSaveStaff = async (id, updatedData) => {
    let newErrors = {};

    Object.entries(staffTempData).forEach(([name, value]) => {
      const updatedErrors = validateInput(name, value);
      newErrors = { ...newErrors, ...updatedErrors };
    });

    setStaffErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      console.log("Validation failed, not saving");
      return false;
    }
    try {
      const res = await axios.put(
        `http://localhost:3000/staffs/${id}`,
        updatedData
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setAllStaffsData((prev) =>
          prev.map((staff) =>
            staff._id === id ? { ...staff, ...updatedData } : staff
          )
        );
      } else {
        toast.error(res.data.mesage);
      }
    } catch (err) {
      toast.error(err);
    }

    return true;
  };

  const handleAddStaff = async () => {
    let newErrors = {};

    Object.entries(staffTempData).forEach(([name, value]) => {
      if (name === "repassword") return;
      const updatedErrors = validateInput(name, value);
      newErrors = { ...newErrors, ...updatedErrors };
    });

    setStaffErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      console.log("Validation failed, not saving");
      return false;
    }
    try {
      const today = new Date();
      const res = await axios.post(
        "http://localhost:3000/staffs/create_staff",
        {
          ...staffTempData,
          start: today.toISOString(),
        }
      );
      if (res.data.success) {
        toast.success(res.data.succes || "Add staff success!");
        setAllStaffsData((prev) => [...prev, res.data.data]);

        navigate("/manage/business/staffs");
      }
    } catch (err) {
      if (err.response && err.response.data) {
        toast.error(err.response.data.message || "Add staff failed!");
      } else {
        toast.error("An unknown error occurred!");
      }
    }
    return true;
  };

  const handleDeleteStaff = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/staffs/${id}`);
      if (res.data.success) {
        toast.success(res.data.message || "Delete success!");
        if (
          location.pathname.includes("/manage/business/staffs/") &&
          location.pathname !== "/manage/business/staffs"
        ) {
          navigate("/manage/business/staffs");
        }
        setAllStaffsData((prev) => prev.filter((staff) => staff._id !== id));
      } else {
        toast.error(res.data.message || "Delete failed!");
      }
    } catch (err) {
      toast.error(err);
    }
  };

  const handleSearchStaff = async (keyword) => {
    await axios
      .get(`http://localhost:3000/staffs/search?keyword=${keyword}`)
      .then((res) => {
        console.log("Kết quả:", res.data);
        setSearchResult(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        toast.error("Lỗi khi tìm kiếm!");
        setSearchResult([]);
        console.error(err);
      });
  };

  const handleChangeStatus = async (status) => {
    const user = getCurrentUser();

    try {
      const res = await axios.put(
        `http://localhost:3000/staffs/${staffData._id}/status`,
        {
          status: status,
        }
      );
      if (res.data.success) {
        toast.success(`Change status to ${status}`);
        setStaffData((prev) => ({ ...prev, status: status }));
      }
    } catch (err) {
      console.error("Lỗi khi cập nhật trạng thái:", err);
    }
  };

  // const handleSetAdmin = (staff) => {
  //   const res = axios.put(`http://localhost:3000/staffs/${staff._id}`);
  //   if(res.data.succes){

  //   }
  // };

  return (
    <StaffContext.Provider
      value={{
        allStaffsData,
        staffData,
        staffTempData,
        staffErrors,
        searchResult,
        handleChangeStatus,
        handleSearchStaff,
        handleAddStaff,
        handleDeleteStaff,
        handleSelectedStaff,
        handleChangeStaffInput,
        handleSearchStaff,
        handleChangeStaffPhone,
        handleChangeStaffAvatar,
        handleOnSaveStaff,
      }}
    >
      {children}
    </StaffContext.Provider>
  );
};
