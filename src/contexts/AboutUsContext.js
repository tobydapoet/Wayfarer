import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getCurrentUser } from "../utils/currentUser";

export const AboutUsContext = createContext({
  allContent: [],
  size: {},
  errors: {},
  content: {},
  handleUpdateContent: () => {},
  handleDeleteContent: () => {},
  handleCreateContent: () => {},
  handleChangeImg: () => {},
  handleContentChange: () => {},
  handleImgLoad: () => {},
});

export const AboutUsProvider = ({ children }) => {
  const user = getCurrentUser();

  const [allContent, setAllContent] = useState([]);
  const initialContent = {
    title: "",
    describe: "",
    image: "",
    staffId: "",
  };
  const [content, setContent] = useState({ ...initialContent });
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/introduces`)
      .then((res) => setAllContent(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3000/introduces/${id}`)
        .then((res) => setContent(res.data))
        .catch((err) => console.log(err));
    } else {
      setContent(initialContent);
    }
  }, [id]);

  const validateInput = (name, value) => {
    const newErrors = {};
    switch (name) {
      case "title":
        if (!value.trim()) {
          newErrors.title = "Title cannot empty!";
        }
        break;
      case "describe":
        if (!value.trim()) {
          newErrors.describe = "Describe cannot empty!";
        }
        break;
      case "image":
        if (!value) {
          newErrors.image = "Please selecte image!";
        }
    }
    return newErrors;
  };

  const handleImgLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.target;
    setSize({
      width: naturalWidth,
      height: naturalHeight,
    });
  };

  const handleContentChange = (e) => {
    const { name, value } = e.target;
    const newErrors = validateInput(name, value);
    setErrors((prevErrors) => {
      const updatedErrors = { ...newErrors, ...prevErrors };
      if (!newErrors[name]) {
        delete updatedErrors[name];
      }
      return updatedErrors;
    });
    setContent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeImg = (e) => {
    const file = e.target?.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result;
      setContent((prev) => ({ ...prev, image: base64 }));
      setErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors };
        delete updatedErrors.image;
        return updatedErrors;
      });
    };
    reader.readAsDataURL(file);
  };

  const handleCreateContent = async () => {
    let newErrors = {};
    Object.entries(content).forEach(([name, value]) => {
      const fieldErrors = validateInput(name, value);
      newErrors = { ...newErrors, ...fieldErrors };
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    try {
      const res = await axios.post(
        `http://localhost:3000/introduces/create_introduce`,
        {
          ...content,
          staffId: user._id,
        }
      );
      if (res.data.success) {
        setAllContent((prev) => [...prev, res.data.data]);
        toast.success(res.data.message || "Save success!");
        setContent(initialContent);
        navigate(-1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateContent = async () => {
    let newErrors = {};
    Object.entries(content).forEach(([name, value]) => {
      const updatedErrors = validateInput(name, value);
      newErrors = { ...newErrors, ...updatedErrors };
    });
    setErrors(newErrors);
    if (Object.keys(errors).length > 0) {
      return;
    }
    try {
      const res = await axios.put(
        `http://localhost:3000/introduces/${content._id}`,
        content
      );
      if (res.data.success) {
        setAllContent((prev) =>
          prev.map((item) => (item._id === content._id ? res.data.data : item))
        );
        toast.success(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteContent = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/introduces/${id}`);
      if (res.data.success) {
        setAllContent((prev) => prev.filter((item) => item._id !== id));
        toast.success(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AboutUsContext.Provider
      value={{
        size,
        errors,
        content,
        allContent,
        handleDeleteContent,
        handleCreateContent,
        handleUpdateContent,
        handleChangeImg,
        handleContentChange,
        handleImgLoad,
      }}
    >
      {children}
    </AboutUsContext.Provider>
  );
};
