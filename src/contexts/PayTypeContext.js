import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const PayTypeContext = createContext({
  allPayTypes: [],
  payTypeSelected: {},
  openEditForm: false,
  setOpenEditForm: () => {},
  errors: {},
  handleSelectedPaytype: () => {},
  handleImgChange: () => {},
  handleCloseSelectedPayType: () => {},
  handleCreatePaytype: () => {},
  handleUpdatePayType: () => {},
  handleDeletePayType: () => {},
  handleInputChange: () => {},
});

export const PayTypeProvider = ({ children }) => {
  const [allPayTypes, setAllPaytypes] = useState([]);
  const initialPayType = {
    name: "",
    image: "",
  };
  const [payTypeSelected, setPayTypeSelected] = useState(initialPayType);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3000/paytypes")
      .then((res) => setAllPaytypes(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleValidate = (name, value) => {
    const newErrors = {};
    switch (name) {
      case "name":
        if (!value.trim()) {
          newErrors.name = "Name cannot be empty!";
        }
        break;
      case "image":
        if (!value) {
          newErrors.image = "Please choose image!";
        }
        break;
      default:
        break;
    }
    return newErrors;
  };

  const handleSelectedPaytype = (paytype) => {
    setPayTypeSelected(paytype);
    setOpenEditForm(true);
  };

  const handleCloseSelectedPayType = () => {
    setPayTypeSelected(initialPayType);
    setOpenEditForm(false);
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newErrors = handleValidate(name, value);
    setErrors((prevErrors) => {
      const updatedErrors = { ...newErrors, ...prevErrors };
      if (!newErrors[name]) delete updatedErrors[name];
      return updatedErrors;
    });
    setPayTypeSelected((prev) => ({ ...prev, [name]: value }));
  };

  const handleImgChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result;
      setPayTypeSelected((prev) => ({ ...prev, image: base64 }));
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors.image;
        return newErrors;
      });
    };
    reader.readAsDataURL(file);
  };

  const handleCreatePaytype = async () => {
    let newErrors = {};
    Object.entries(payTypeSelected).forEach(([name, value]) => {
      const updatedErrors = handleValidate(name, value);
      newErrors = { ...newErrors, ...updatedErrors };
    });
    setErrors(newErrors);
    if (Object.keys(errors).length > 0) return;
    try {
      const res = await axios.post(
        `http://localhost:3000/paytypes`,
        payTypeSelected
      );
      if (res.data.success) {
        setAllPaytypes((prev) => [...prev, res.data.data]);
        toast.success(res.data.message);
        setOpenEditForm(false);
        setPayTypeSelected(initialPayType);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdatePayType = async () => {
    let newErrors = {};
    Object.entries(payTypeSelected).forEach(([name, value]) => {
      const updatedErrors = handleValidate(name, value);
      newErrors = { ...newErrors, ...updatedErrors };
    });
    setErrors(newErrors);
    if (Object.keys(errors).length > 0) return;
    try {
      const res = await axios.put(
        `http://localhost:3000/paytypes/${payTypeSelected._id}`,
        payTypeSelected
      );
      if (res.data.success) {
        setAllPaytypes((paytypes) =>
          paytypes.map((paytype) =>
            paytype._id === payTypeSelected._id ? res.data.data : paytype
          )
        );
        setPayTypeSelected(res.data.data);
        setOpenEditForm(false);
        toast.success(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeletePayType = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/paytypes/${id}`);
      if (res.data.success) {
        setAllPaytypes((paytypes) =>
          paytypes.filter((paytype) => paytype._id !== id)
        );
        toast.success(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <PayTypeContext.Provider
      value={{
        allPayTypes,
        payTypeSelected,
        openEditForm,
        setOpenEditForm,
        errors,
        handleInputChange,
        handleImgChange,
        handleSelectedPaytype,
        handleCloseSelectedPayType,
        handleCreatePaytype,
        handleUpdatePayType,
        handleDeletePayType,
      }}
    >
      {children}
    </PayTypeContext.Provider>
  );
};
