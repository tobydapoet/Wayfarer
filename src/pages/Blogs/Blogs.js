import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Blogs.module.scss";
import Pin from "../../components/Tablet/Pin";
import SearchBar from "../../components/SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { BlogContext } from "../../contexts/BlogContext";
import BlogPopper from "../../components/BlogPopper/BlogPopper";

const cx = classNames.bind(styles);

function Blogs() {
  const user =
    JSON.parse(localStorage.getItem("user")) ||
    JSON.parse(sessionStorage.getItem("user"));
  const {
    allBlogData,
    handleSelectedBlog,
    handleSearchBlogsApproved,
    blogsSearchApprovedData,
  } = useContext(BlogContext);
  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate("add_content");
  };

  return (
    <div className={cx("search-wrapper")}>
      <div className={cx("header")}>
        <SearchBar
          onSearch={handleSearchBlogsApproved}
          results={blogsSearchApprovedData}
          renderResult={(blog) => (
            <BlogPopper
              onClick={() => handleSelectedBlog(blog)}
              data={blog}
              noAdd={user.position}
            />
          )}
        />
        {!user.position && (
          <div
            className={cx("add")}
            onClick={handleAddClick}
            style={{ cursor: "pointer" }}
          >
            <FontAwesomeIcon icon={faPlus} />
          </div>
        )}
      </div>
      <div className={cx("content-wrapper")}>
        {allBlogData
          .filter((blogs) => blogs.status === true)
          .map((blog) => {
            return (
              <Pin
                key={blog._id}
                type="page"
                data={blog}
                onClick={() => handleSelectedBlog(blog)}
              ></Pin>
            );
          })}
      </div>
    </div>
  );
}

export default Blogs;
