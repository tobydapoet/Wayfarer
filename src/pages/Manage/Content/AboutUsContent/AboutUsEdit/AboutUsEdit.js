import classNames from "classnames/bind";
import styles from "./AboutUsEdit.module.scss";
import { useState } from "react";
import Input from "../../../../../components/Input";
import Button from "../../../../../components/Button";
import images from "../../../../../assets/images";
import { useNavigate, useParams } from "react-router-dom";

const cx = classNames.bind(styles);

const CONTENT = {
  id: 0,
  title: "WE HAVE THE BEST TOURS",
  describe:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis vulputate eros, iaculis consequat nisl. Nunc et suscipit urna. Integer elementum orci eu vehicula pretium. Donec bibendum tristique condimentum. Aenean in lacus ligula. Phasellus euismod gravida eros. Aenean nec ipsum aliquet, pharetra magna id, interdum sapien. Etiam id lorem eu nisl pellentesque semper. Nullam tincidunt metus placerat, suscipit leo ut, tempus nulla. Fusce at eleifend tellus. Ut eleifend dui nunc, non fermentum quam placerat non. Etiam venenatis nibh augue, sed eleifend justo tristique eu",
  image:
    "https://img.freepik.com/free-vector/night-landscape-with-lake-mountains-trees-coast-vector-cartoon-illustration-nature-scene-with-coniferous-forest-river-shore-rocks-moon-stars-dark-sky_107791-8253.jpg",
};

function AboutUsEdit() {
  const param = useParams();
  console.log(param);
  const [selectedContent, setSelectedContent] = useState(
    param.title !== "add_content"
      ? { ...CONTENT }
      : { title: "", describe: "", image: "" }
  );
  const [selectedTempContent, setSelectedTempContent] = useState({
    ...selectedContent,
  });
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [errors, setErrors] = useState({});

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
    setSelectedTempContent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleChangeImg = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    const file = e.target.files[0];
    const newFile = URL.createObjectURL(file);
    setSelectedTempContent((prev) => ({ ...prev, image: newFile }));
  };
  const handleSaveContent = () => {
    const newErrors = {};

    Object.entries(selectedTempContent).forEach(([name, value]) => {
      const fieldErrors = validateInput(name, value);
      newErrors[name] = fieldErrors[name];
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setSelectedContent({ ...selectedTempContent });
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("content-edit-wrapper")}>
        <div className={cx("file-wrapper")}>
          <div className={cx("file-container")}>
            <input
              type="file"
              name={selectedTempContent?.image}
              onChange={(e) => handleChangeImg(e, "content")}
            />
          </div>
          <img
            className={cx(
              size.width < size.height ? "vertical-img" : "horizontal-img"
            )}
            src={selectedTempContent?.image || images.noImg}
            onLoad={(e) => handleImgLoad(e)}
          />
        </div>
        <div className={cx("content-edit-text")}>
          <Input
            dark
            placeholder="Title"
            frame="Title"
            name="title"
            value={selectedTempContent?.title || ""}
            onChange={handleContentChange}
            maxLength={60}
            error={errors.title}
          />
          <Input
            dark
            textarea
            placeholder="Describe..."
            frame="Describe"
            name="describe"
            value={selectedTempContent?.describe || ""}
            onChange={handleContentChange}
            maxLength={700}
            error={errors.describe}
          />
        </div>
      </div>
      <div className={cx("btn-container")}>
        <Button large onClick={handleSaveContent}>
          Save
        </Button>
        <Button large>Cancel</Button>
      </div>
    </div>
  );
}

export default AboutUsEdit;
