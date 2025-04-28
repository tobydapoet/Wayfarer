import { createContext, useState } from "react";

export const BlogContext = createContext({
  blogData: {},
  tempBlogData: {},
  errors: {},
  user: {},
  handleInputChange: () => {},
  handleImgChange: () => {},
  handleSaveChange: () => {},
});

export const BlogProvider = ({ children, data }) => {
  const today = new Date();

  const formatTime = (date) => {
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();
    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    return `${dd}/${mm}/${yyyy} ${hh}:${min}`;
  };

  const user =
    JSON.parse(localStorage.getItem("user")) ||
    JSON.parse(sessionStorage.getItem("user")) ||
    {};

  const [blogData, setBlogData] = useState({
    image: "",
    title: "",
    content: "",
    createdBy: user?.name || "",
    createdAt: formatTime(today),
    status: false,
  });

  const [tempBlogData, setTempBlogData] = useState({ ...blogData });
  const [errors, setErrors] = useState({});

  const validateError = (name, value) => {
    const newErrors = {};
    switch (name) {
      case "title":
        if (!value.trim()) newErrors.title = "Title cannot be empty!";
        break;
      case "content":
        if (!value.trim()) newErrors.content = "Content cannot be empty!";
        break;
      case "image":
        if (!value) newErrors.image = "Please choose image!";
        break;
    }
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newErrors = validateError(name, value);
    setErrors((prevErrors) => {
      const updatedErrors = { ...newErrors, ...prevErrors };
      if (!newErrors[name]) delete updatedErrors[name];
      return updatedErrors;
    });

    setTempBlogData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImgChange = (e) => {
    if (!e.target.files || e.target.value.length === 0) return;
    const file = e.target.files[0];
    if (errors.image) {
      const updatedErrors = { ...errors };
      delete updatedErrors.image;
      setErrors(updatedErrors);
    }
    const fileURL = URL.createObjectURL(file);
    setTempBlogData((prev) => ({ ...prev, image: fileURL }));
  };

  const handleSaveChange = (approve) => {
    let newErrors = {};
    Object.entries(tempBlogData).forEach(([name, value]) => {
      const updatedErrors = validateError(name, value);
      newErrors = { ...newErrors, ...updatedErrors };
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const newData = { ...tempBlogData, status: approve ? true : false };
    setBlogData(newData);
    setTempBlogData({
      image: "",
      title: "",
      content: "",
      createdBy: user.name,
      createdAt: formatTime(new Date()),
      status: false,
    });
  };

  return (
    <BlogContext.Provider
      value={{
        blogData,
        tempBlogData,
        errors,
        user,
        handleInputChange,
        handleImgChange,
        handleSaveChange,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};
