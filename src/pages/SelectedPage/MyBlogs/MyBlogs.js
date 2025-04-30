import classNames from "classnames/bind";
import styles from "./MyBlogs.module.scss";
import { useContext } from "react";
import { BlogContext } from "../../../contexts/BlogContext";
import BlogManageItem from "../../../components/BlogManageItem";

const cx = classNames.bind(styles);

const user =
  JSON.parse(localStorage.getItem("user")) ||
  JSON.parse(sessionStorage.getItem("user"));
function MyBlogs() {
  const { allBlogData, handleSelectedBlog, handleDeleteBlog } =
    useContext(BlogContext);

  return (
    <div className={cx("wrapper")}>
      {allBlogData
        .filter((blogs) => blogs.clientId._id === user._id)
        .map((blog) => (
          <BlogManageItem
            key={blog._id}
            data={blog}
            onClick={() => handleSelectedBlog(blog)}
            onDelete={() => handleDeleteBlog(blog._id)}
          />
        ))}
    </div>
  );
}

export default MyBlogs;
