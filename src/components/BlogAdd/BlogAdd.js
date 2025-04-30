import classNames from "classnames/bind";
import styles from "./BlogAdd.module.scss";
import Button from "../Button";
import Input from "../Input";
import images from "../../assets/images";
import { useLocation } from "react-router-dom";
import { BlogContext } from "../../contexts/BlogContext";
import { useContext } from "react";

const cx = classNames.bind(styles);

function BlogAdd() {
  const {
    blogData,
    tempBlogData,
    errors,
    user,
    handleInputChange,
    handleImgChange,
    handleCreateBlog,
  } = useContext(BlogContext);

  const location = useLocation();
  const isBlogInfo = location.pathname.includes("/blogs/");
  console.log(tempBlogData);
  return (
    <div className={cx("wrapper", { clientInterface: isBlogInfo })}>
      <div className={cx("header")}>
        <Input
          dark
          name="title"
          placeholder="Title..."
          className={cx("title")}
          value={tempBlogData?.title || ""}
          error={errors.title}
          onChange={handleInputChange}
        />
        <div className={cx("owner")}>By: {blogData.createdBy} </div>
        <div className={cx("created-time")}>
          At: {new Date(blogData.createdAt).toLocaleDateString()}
        </div>
        <hr />
      </div>
      <div className={cx("body")}>
        <div className={cx("img-container")}>
          <img src={tempBlogData.image || images.noImg} />
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
          value={tempBlogData.content}
          onChange={handleInputChange}
        />
      </div>
      {/* {user.position && (
        <div className={cx("btn-container")}>
          <Button rounded onClick={() => handleSaveChange(false)}>
            Save
          </Button>
          <Button rounded onClick={() => handleSaveChange(true)}>
            Save and approve
          </Button>
        </div>
      )} */}

      <div className={cx("btn-container")}>
        <Button rounded onClick={() => handleCreateBlog()}>
          Apply
        </Button>
      </div>
    </div>
  );
}

export default BlogAdd;
