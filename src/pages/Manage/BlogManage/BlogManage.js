import classNames from "classnames/bind";
import styles from "./BlogManage.module.scss";
import SearchBar from "../../../components/SearchBar";
import BlogManageItem from "../../../components/BlogManageItem";
import { useContext } from "react";
import { BlogContext } from "../../../contexts/BlogContext";
import BlogPopper from "../../../components/BlogPopper/BlogPopper";
import ScrollHeader from "../../../components/ScrollHeader";

const cx = classNames.bind(styles);

function BlogManage() {
  const {
    allBlogData,
    handleSelectedBlog,
    blogsSearchData,
    handleSearchBlogs,
    handleDeleteBlog,
  } = useContext(BlogContext);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <SearchBar
          onSearch={handleSearchBlogs}
          results={blogsSearchData}
          renderResult={(blog) => (
            <BlogPopper
              manage
              data={blog}
              onClick={() => handleSelectedBlog(blog)}
            />
          )}
        />
      </div>
      <div className={cx("blogs-wrapper")}>
        {allBlogData.map((blog, index) => (
          <BlogManageItem
            key={index}
            data={blog}
            onClick={() => handleSelectedBlog(blog)}
            onDelete={() => handleDeleteBlog(blog._id)}
          />
        ))}
      </div>
    </div>
  );
}

export default BlogManage;
