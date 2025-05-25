import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getCurrentUser } from "../utils/currentUser";

export const ContactContext = createContext({
  contactValue: {},
  allContacts: [],
  errors: {},
  notice: {},
  searchContacts: {},
  setNotice: () => {},
  handlePreventMessage: () => {},
  handleInputChange: () => {},
  handleCreateContact: () => {},
  handleSelectedContact: () => {},
  setContactValue: () => {},
  handleUpdateContact: () => {},
  handleDeleteContact: () => {},
  handleSearchContact: () => {},
});
export const ContactProvider = ({ children }) => {
  const today = new Date();
  const user = getCurrentUser();

  const [allContacts, setAllContacts] = useState([]);
  const [searchContacts, setSearchContacts] = useState([]);
  const initialContactValue = {
    clientId: user?._id,
    title: "",
    message: "",
  };
  const [contactValue, setContactValue] = useState({
    ...initialContactValue,
  });
  console.log(contactValue);
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/contacts`)
      .then((res) => setAllContacts(res.data.reverse()))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (id)
      axios
        .get(`http://localhost:3000/contacts/${id}`)
        .then((res) => setContactValue(res.data))
        .catch((err) => navigate(`/unauthorized`));
  }, [id]);

  const handleSelectedContact = (data) => {
    setContactValue(data);
    navigate(`${data._id}`);
  };

  const handlePreventMessage = () => {
    if (!user || user?.position) {
      setNotice(true);
      setContactValue(initialContactValue);
    } else {
      handleCreateContact();
    }
  };

  const validateInput = (name, value) => {
    const newErrors = {};
    switch (name) {
      case "name": {
        if (!value.trim()) {
          newErrors.name = "Name cannot empty!";
        }
        break;
      }
      case "email": {
        if (!value.trim()) {
          newErrors.email = "Email cannot empty!";
        } else if (
          !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value
          )
        ) {
          newErrors.email = "Wrong format";
        }
        break;
      }
      case "title": {
        if (!value.trim()) {
          newErrors.title = "Title cannot be empty!";
        }
        break;
      }
      case "message": {
        if (!value.trim()) {
          newErrors.message = "Message cannot be empty!";
        }
        break;
      }
      case "response": {
        if (!value.trim()) {
          newErrors.response = "Response cannot be empty!";
        }
        break;
      }
    }
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newErrors = validateInput(name, value);
    setErrors((prevErrors) => {
      const updatedErrors = { ...newErrors, ...prevErrors };

      if (!newErrors[name]) {
        delete updatedErrors[name];
      }

      return updatedErrors;
    });

    setContactValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateContact = async () => {
    const newErrors = {};
    Object.entries(contactValue).forEach(([name, value]) => {
      const fieldErrors = validateInput(name, value);
      Object.assign(newErrors, fieldErrors);
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:3000/contacts/create_contact`,
        contactValue
      );
      if (res.data.success) {
        setAllContacts((prev) => [...prev, res.data.data]);
        toast.success(res.data.message);
        setContactValue(initialContactValue);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateContact = async () => {
    const newErrors = {};
    Object.entries(contactValue).forEach(([name, value]) => {
      const fieldErrors = validateInput(name, value);
      Object.assign(newErrors, fieldErrors);
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    try {
      const res = await axios.put(
        `http://localhost:3000/contacts/${contactValue._id}`,
        {
          staffId: user._id,
          ...contactValue,
        }
      );
      if (res.data.success) {
        setAllContacts((prev) =>
          prev.map((contact) =>
            contact._id === contactValue._id ? res.data.data : contact
          )
        );
        toast.success(res.data.message);
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/contacts/${id}`);
      if (res.data.success) {
        setAllContacts((prev) => prev.filter((contact) => contact._id !== id));
        toast.success(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearchContact = async (keyword) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/contacts/search?keyword=${keyword}`
      );
      if (res.data.success) {
        setSearchContacts(Array.isArray(res.data.data) ? res.data.data : []);
      } else {
        setSearchContacts([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ContactContext.Provider
      value={{
        contactValue,
        allContacts,
        errors,
        searchContacts,
        notice,
        setNotice,
        handlePreventMessage,
        setContactValue,
        handleSelectedContact,
        handleInputChange,
        handleCreateContact,
        handleUpdateContact,
        handleDeleteContact,
        handleSearchContact,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};
