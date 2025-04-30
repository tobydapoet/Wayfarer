import classNames from "classnames/bind";
import styles from "./BlogInfo.module.scss";
import Button from "../../../components/Button";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { BlogContext } from "../../../contexts/BlogContext";

const cx = classNames.bind(styles);

function BlogInfo() {
  const { blogData, handleApproveBlog } = useContext(BlogContext);
  console.log(blogData);
  const location = useLocation();
  const isBlogInfo = location.pathname.includes("/blogs/");
  const blogTime = new Date(blogData.createdAt);

  return (
    <div className={cx("wrapper", { clientInterface: isBlogInfo })}>
      <div className={cx("header")}>
        <div className={cx("title")}>{blogData.title}</div>
        <div className={cx("owner")}>By: {blogData.clientId?.name}</div>
        <div className={cx("created-time")}>
          At: {blogTime.toLocaleDateString()}
        </div>
        <hr></hr>
      </div>
      <div className={cx("body")}>
        <img src={blogData.image} />
        <div className={cx("content")}>{blogData.content}</div>
      </div>
      {!isBlogInfo && blogData.status === false && (
        <div className={cx("btn-container")}>
          <Button rounded onClick={() => handleApproveBlog(blogData._id)}>
            Approve
          </Button>
        </div>
      )}
    </div>
  );
}

export default BlogInfo;
