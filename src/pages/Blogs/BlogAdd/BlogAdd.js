import classNames from "classnames/bind";
import styles from "./BlogAdd.module.scss";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { use, useState } from "react";
import images from "../../../assets/images";
import { useLocation } from "react-router-dom";

const cx = classNames.bind(styles);

const user = JSON.parse(localStorage.getItem("user"));

function BlogAdd() {
  const today = new Date();

  const formatTime = (date) => {
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();
    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");

    return `${dd}/${mm}/${yyyy} ${hh}:${min}`;
  };
  const [data, setData] = useState({
    image: "",
    title: "",
    content: "",
    createdBy: user.name,
    createdAt: formatTime(today),
    status: false,
  });
  const [tempData, setTempData] = useState({ ...data });
  const [errors, setErrors] = useState({});
  const location = useLocation();
  const isBlogInfo = location.pathname.includes("/blogs/");

  const validateError = (name, value) => {
    const newErrors = {};
    switch (name) {
      case "title": {
        if (!value.trim()) {
          newErrors.title = "Title cannot be empty!";
        }
        break;
      }
      case "content": {
        if (!value.trim()) {
          newErrors.content = "Content cannot be empty!";
        }
        break;
      }
      case "image": {
        if (!value) {
          newErrors.image = "Please choose image!";
        }
        break;
      }
    }
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newErrors = validateError(name, value);
    setErrors((prevErrors) => {
      const updatedErrors = { ...newErrors, ...prevErrors };
      if (!newErrors[name]) {
        delete updatedErrors[name];
      }
      return updatedErrors;
    });

    setTempData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImgChange = (e) => {
    if (!e.target.files || e.target.value.length === 0) {
      return;
    }
    const file = e.target.files[0];
    if (errors.image) {
      const updatedErrors = { ...errors };
      delete updatedErrors.image;
      setErrors(updatedErrors);
    }
    const fileURL = URL.createObjectURL(file);
    setTempData((prev) => ({ ...prev, image: fileURL }));
  };

  const handleSaveChange = (approve) => {
    let newErrors = {};
    Object.entries(tempData).forEach(([name, value]) => {
      const updatedErrors = validateError(name, value);
      newErrors = { ...newErrors, ...updatedErrors };
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    const newData = { ...tempData, status: approve ? true : false };
    setData(newData);

    setTempData({});
  };
  console.log(data);
  return (
    <div className={cx("wrapper", { clientInterface: isBlogInfo })}>
      <div className={cx("header")}>
        <Input
          dark
          name="title"
          placeholder="Title..."
          className={cx("title")}
          error={errors.title}
          value={data.title}
          onChange={handleInputChange}
        />
        <div className={cx("owner")}>By: {data.createdBy} </div>
        <div dark className={cx("created-time")}>
          At: {data.createdAt}
        </div>
        <hr></hr>
      </div>
      <div className={cx("body")}>
        <div className={cx("img-container")}>
          <img src={tempData.image || images.noImg} />
          <div className={cx("input-container")}>
            <input type="file" onChange={handleImgChange} />
          </div>
          {errors.image && (
            <div className={cx("error-text")}>{errors.image}</div>
          )}
        </div>
        <Input
          dark
          name="content"
          textarea
          maxLength={2000}
          className={cx("content")}
          error={errors.content}
          value={data.content}
          onChange={handleInputChange}
        />
      </div>
      {user.position < 2 && (
        <div className={cx("btn-container")}>
          <Button rounded onClick={() => handleSaveChange(false)}>
            Save
          </Button>
          <Button rounded onClick={() => handleSaveChange(true)}>
            Save and approve
          </Button>
        </div>
      )}
      {user.position === 2 && (
        <div className={cx("btn-container")}>
          <Button rounded onClick={() => handleSaveChange(false)}>
            Apply
          </Button>
        </div>
      )}
    </div>
  );
}

export default BlogAdd;
