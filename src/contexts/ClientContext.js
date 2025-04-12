import { createContext, useContext, useState } from "react";

export const ClientContext = createContext({
  clientData: {},
  clientTempData: {},
  clientErrors: {},
  handleChangeClientInput: () => {},
  handleChangeClientPhone: () => {},
  handleChangeClientImg: () => {},
  handleOnSaveClient: () => {},
});

export const ClientProvider = ({ children, data }) => {
  const [clientData, setClientData] = useState(() => {
    return (
      data || {
        email: "",
        name: "",
        password: "",
        phone: "",
        site: "",
        avatar: "",
      }
    );
  });

  const [clientTempData, setClientTempData] = useState({ ...clientData });
  const [clientErrors, setClientErrors] = useState({});

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
          !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
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
        if (!value.trim()) newErrors.phone = "Phone cannot be empty!";
        break;
      case "site":
        if (!value.trim()) newErrors.site = "Site cannot be empty!";
        break;
      case "avatar":
        if (!value) newErrors.avatar = "Please choose your avatar!";
        break;
      default:
        break;
    }
    return newErrors;
  };

  const handleChangeClientInput = (e) => {
    const { name, value } = e.target;
    const newErrors = validateInput(name, value);
    setClientErrors((prev) => {
      const updated = { ...prev, ...newErrors };
      if (!newErrors[name]) delete updated[name];
      return updated;
    });

    setClientTempData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeClientPhone = (value) => {
    const newErrors = validateInput("phone", value);

    setClientErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors, ...newErrors };
      if (!newErrors.phone) delete updatedErrors.phone;
      return updatedErrors;
    });

    setClientTempData((prev) => ({ ...prev, phone: value }));
  };

  const handleChangeClientImg = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imgURL = URL.createObjectURL(file);
    setClientTempData((prev) => ({ ...prev, avatar: imgURL }));
    setClientErrors((prevErrors) => {
      const { avatar, ...rest } = prevErrors;
      return rest;
    });
  };

  const handleOnSaveClient = () => {
    let newErrors = {};
    Object.entries(clientTempData).forEach(([name, value]) => {
      const errs = validateInput(name, value);
      newErrors = { ...newErrors, ...errs };
    });

    setClientErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setClientData({ ...clientTempData });
  };

  return (
    <ClientContext.Provider
      value={{
        clientData,
        clientTempData,
        clientErrors,
        setClientErrors,
        handleChangeClientInput,
        handleChangeClientPhone,
        handleChangeClientImg,
        handleOnSaveClient,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};
