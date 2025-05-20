import classNames from "classnames/bind";
import styles from "./MyBlogs.module.scss";
import { useContext } from "react";
import { BlogContext } from "../../../contexts/BlogContext";
import BlogManageItem from "../../../components/BlogManageItem";
import { getCurrentUser } from "../../../utils/currentUser";

const cx = classNames.bind(styles);

const user = getCurrentUser();

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
