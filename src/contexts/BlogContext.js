import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getCurrentUser } from "../utils/currentUser";

export const BlogContext = createContext({
  allBlogData: [],
  blogData: {},
  blogData: {},
  errors: {},
  user: {},
  blogsSearchData: [],
  setBlogData: () => {},
  handleCreateBlog: () => {},
  handleApproveBlog: () => {},
  handleSearchBlogs: () => {},
  handleDeleteBlog: () => {},
  handleSearchBlogsApproved: () => {},
  handleSelectedBlog: () => {},
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

  const user = getCurrentUser();

  const [allBlogData, setAllBlogData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/blogs")
      .then((res) => setAllBlogData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const [blogData, setBlogData] = useState(
    data || {
      image: "",
      title: "",
      content: "",
      createdBy: user?.name || "",
      createdAt: new Date(),
      status: false,
    }
  );
  const [blogsSearchData, setBlogsSearchData] = useState([]);
  const [blogsSearchApprovedData, setBlogsSearchApprovedData] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3000/blogs/${id}`)
        .then((res) => setBlogData(res.data))
        .catch(() => navigate("/unauthorized"));
    }
  }, [id]);

  const [errors, setErrors] = useState({});

  const handleSelectedBlog = (selectedBlog) => {
    setBlogData(selectedBlog);
    navigate(`/blogs/${selectedBlog._id}`);
  };

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

    setBlogData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImgChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result;
      setBlogData((prev) => ({ ...prev, image: base64 }));
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors.image;
        return newErrors;
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSearchBlogs = async (keyword) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/blogs/search?keyword=${keyword}`
      );
      if (res.data.success) {
        console.log(res.data);
        setBlogsSearchData(Array.isArray(res.data.data) ? res.data.data : []);
      } else {
        setBlogsSearchData([]);
      }
    } catch (err) {
      toast.error(err);
    }
  };

  const handleSearchBlogsApproved = async (keyword) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/blogs/search_approved?keyword=${keyword}`
      );
      if (res.data.success) {
        setBlogsSearchApprovedData(
          Array.isArray(res.data.data) ? res.data.data : []
        );
      } else {
        setBlogsSearchApprovedData([]);
      }
    } catch (err) {
      toast.error(err);
    }
  };

  const handleApproveBlog = async (id) => {
    try {
      const res = await axios.put(`http://localhost:3000/blogs/${id}`, {
        status: true,
      });
      if (res.data.success) {
        setAllBlogData((prev) =>
          prev.map((blog) => {
            if (blog._id === id) {
              return { ...blog, ...res.data.data };
            }
          })
        );

        toast.success(res.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (err) {
      toast.error(err);
    }
  };

  const handleCreateBlog = async () => {
    let newErrors = {};
    Object.entries(blogData).forEach(([name, value]) => {
      const updatedErrors = validateError(name, value);
      newErrors = { ...newErrors, ...updatedErrors };
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    try {
      const res = await axios.post(`http://localhost:3000/blogs/create_blog`, {
        ...blogData,
        clientId: user._id,
      });
      if (res.data.success) {
        setAllBlogData((prev) => prev.concat(res.data.data));
        toast.success(res.data.message);
        setTimeout(() => {
          navigate(-1); // Quay lại sau khi UI có cơ hội cập nhật
        }, 300);
      }
    } catch (err) {
      toast.error(err);
    }
  };

  const handleSaveChange = (approve) => {
    let newErrors = {};
    Object.entries(blogData).forEach(([name, value]) => {
      const updatedErrors = validateError(name, value);
      newErrors = { ...newErrors, ...updatedErrors };
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const newData = { ...blogData, status: approve ? true : false };
    setBlogData(newData);
    setBlogData({
      image: "",
      title: "",
      content: "",
      createdBy: user.name,
      createdAt: formatTime(new Date()),
      status: false,
    });
  };

  const handleDeleteBlog = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/blogs/${id}`);
      if (res.data.success) {
        setAllBlogData((prev) =>
          prev.filter((currentBlog) => currentBlog._id !== id)
        );
        toast.success(res.data.message);
      }
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <BlogContext.Provider
      value={{
        allBlogData,
        blogData,
        blogData,
        errors,
        user,
        blogsSearchData,
        setBlogData,
        handleSearchBlogs,
        blogsSearchApprovedData,
        handleCreateBlog,
        handleApproveBlog,
        handleDeleteBlog,
        handleSearchBlogsApproved,
        handleSelectedBlog,
        handleInputChange,
        handleImgChange,
        handleSaveChange,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};
