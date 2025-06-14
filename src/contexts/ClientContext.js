import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const ClientContext = createContext({
  allClientsData: [],
  clientData: {},
  clientData: {},
  clientErrors: {},
  searchResult: {},
  setClientData: () => {},
  handleSearchClient: () => {},
  handleAddClient: () => {},
  handleDeleteClient: () => {},
  handleSelectedClient: () => {},
  handleChangeClientInput: () => {},
  handleChangeClientPhone: () => {},
  handleChangeClientImg: () => {},
  handleOnSaveClient: () => {},
});

export const ClientProvider = ({ children }) => {
  const [allClientsData, setAllClientsData] = useState([]);
  const [clientData, setClientData] = useState({
    name: "",
    email: "",
    password: "",
    repassword: "",
    phone: "",
    site: "",
    avatar: "",
  });
  const [searchResult, setSearchResult] = useState([]);
  const [clientErrors, setClientErrors] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/clients")
      .then((res) => setAllClientsData(res.data))
      .catch((err) => console.error("Lỗi khi fetch:", err));
  }, []);

  const handleSelectedClient = (ClientEmail) => {
    axios
      .get(`http://localhost:3000/clients/${ClientEmail}`)
      .then((res) => setClientData(res.data))
      .catch((err) => navigate(`/unauthorized`));
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
      case "repassword":
        if (!value.trim()) {
          newErrors.repassword = "Please enter the password!";
        } else if (value !== clientData.password) {
          newErrors.repassword = "Passwords do not match!";
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

    setClientData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeClientPhone = (value) => {
    const newErrors = validateInput("phone", value);

    setClientErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors, ...newErrors };
      if (!newErrors.phone) delete updatedErrors.phone;
      return updatedErrors;
    });

    setClientData((prev) => ({ ...prev, phone: value }));
  };

  const handleChangeClientImg = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result;
      setClientData((prev) => ({ ...prev, avatar: base64 }));

      setClientErrors((prevErrors) => {
        const updatedErrors = { prevErrors };
        delete updatedErrors.avatar;
        return updatedErrors;
      });
    };
    reader.readAsDataURL(file);
  };
  const handleAddClient = async () => {
    let newErrors = {};
    Object.entries(clientData).forEach(([name, value]) => {
      if (name === "repassword") return;
      const errs = validateInput(name, value);
      newErrors = { ...newErrors, ...errs };
    });

    setClientErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const { repassword, ...data } = clientData;
      const res = await axios.post(
        "http://localhost:3000/clients/create_client",
        data
      );
      if (res.data.success) {
        toast.success(res.data.succes || "Add client success!");
        setAllClientsData((prev) => [...prev, res.data]);
        navigate("/manage/business/clients");
      }
    } catch (err) {
      if (err.response && err.response.data) {
        toast.error(err.response.data.message || "Add client failed!");
      } else {
        toast.error("An unknown error occurred!");
      }
    }
  };

  const handleOnSaveClient = async (id, updatedData) => {
    let newErrors = {};
    Object.entries(clientData).forEach(([name, value]) => {
      const errs = validateInput(name, value);
      newErrors = { ...newErrors, ...errs };
    });

    setClientErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const { repassword, ...data } = updatedData;
      const res = await axios.put(`http://localhost:3000/clients/${id}`, data);
      if (res.data.success) {
        toast.success(res.data.message);
        setAllClientsData((prev) =>
          prev.map((client) =>
            client._id === id ? { ...client, ...updatedData } : client
          )
        );
      } else {
        toast.error(res.data.mesage);
      }
    } catch (err) {
      toast.error(err);
    }
  };

  const handleChangePasswordClient = async (id, updatedData) => {
    let newErrors = {};
    Object.entries(clientData).forEach(([name, value]) => {
      const errs = validateInput(name, value);
      newErrors = { ...newErrors, ...errs };
    });

    setClientErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const { repassword, ...data } = updatedData;
      const res = await axios.put(`http://localhost:3000/clients/${id}`, data);
      if (res.data.success) {
        toast.success(res.data.message);
        setAllClientsData((prev) =>
          prev.map((client) =>
            client._id === id ? { ...client, ...updatedData } : client
          )
        );
      } else {
        toast.error(res.data.mesage);
      }
    } catch (err) {
      toast.error(err);
    }
  };

  const handleDeleteClient = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/clients/${id}`);
      if (res.data.success) {
        toast.success(res.data.message || "Delete success!");
        if (
          location.pathname.includes("/manage/business/clients/") &&
          location.pathname !== "/manage/business/clients"
        ) {
          navigate("/manage/business/clients");
        }
        setAllClientsData((prev) => prev.filter((client) => client._id !== id));
      } else {
        toast.error(res.data.message || "Delete failed!");
      }
    } catch (err) {
      toast.error(err);
    }
  };

  const handleSearchClient = async (keyword) => {
    await axios
      .get(`http://localhost:3000/clients/search?keyword=${keyword}`)
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

  return (
    <ClientContext.Provider
      value={{
        clientData,
        clientErrors,
        allClientsData,
        searchResult,
        setClientData,
        setClientErrors,
        handleAddClient,
        handleSearchClient,
        handleDeleteClient,
        handleSelectedClient,
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
