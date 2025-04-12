import React, { createContext, useState } from "react";

export const StaffContext = createContext({
  staffData: {},
  staffTempData: {},
  staffErrors: {},
  handleChangeStaffInput: () => {},
  handleChangeStaffPhone: () => {},
  handleChangeStaffAvatar: () => {},
  handleOnSaveStaff: () => {},
});

export const StaffProvider = ({ children, data }) => {
  const [staffData, setStaffData] = useState(
    data || {
      avatar: "",
      name: "",
      status: "",
      site: "",
      salary: "",
      email: "",
      birth: "",
      phone: "",
      password: "",
    }
  );
  const [staffTempData, setStaffTempData] = useState({ ...staffData });
  const [staffErrors, setStaffErrors] = useState({});

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

    const imgURL = URL.createObjectURL(file);

    setStaffTempData((prev) => ({ ...prev, avatar: imgURL }));
    setStaffErrors((prevErrors) => {
      const { avatar, ...rest } = prevErrors;
      return rest;
    });
  };

  const handleOnSaveStaff = () => {
    try {
      let newErrors = {};
      console.log("Starting validation..."); // Kiểm tra xem có log này không

      Object.entries(staffTempData).forEach(([name, value]) => {
        const updatedErrors = validateInput(name, value);
        newErrors = { ...newErrors, ...updatedErrors };
      });

      console.log("Validation errors:", newErrors); // Xem lỗi validation

      setStaffErrors(newErrors);

      if (Object.keys(newErrors).length > 0) {
        console.log("Validation failed, not saving");
        return false;
      }

      console.log("Saving data:", staffTempData); // Xem dữ liệu trước khi lưu
      setStaffData({ ...staffTempData });
      return true;
    } catch (error) {
      console.error("Error in handleOnSaveStaff:", error);
      return false;
    }
  };

  return (
    <StaffContext.Provider
      value={{
        staffData,
        staffTempData,
        staffErrors,
        handleChangeStaffInput,
        handleChangeStaffPhone,
        handleChangeStaffAvatar,
        handleOnSaveStaff,
      }}
    >
      {children}
    </StaffContext.Provider>
  );
};
