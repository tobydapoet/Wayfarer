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
  const isOwnerInfo = location.pathname.includes("/my_blogs/");
  const blogTime = new Date(blogData.createdAt);

  return (
    <div className={cx("wrapper", { clientInterface: isBlogInfo })}>
      <div className={cx("header")}>
        <div className={cx("left-side")}>
          <div className={cx("title")}>{blogData.title}</div>
          <div className={cx("owner")}>By: {blogData.clientId?.name}</div>
          <div className={cx("created-time")}>
            At: {blogTime.toLocaleDateString()}
          </div>
        </div>
        {!isBlogInfo && (
          <div className={cx("right-side")}>
            <img src={blogData.image} />
          </div>
        )}
      </div>
      <hr></hr>
      <div className={cx("body")}>
        <div dangerouslySetInnerHTML={{ __html: blogData.content }} />
      </div>
      {!isBlogInfo && !isOwnerInfo && blogData.status === false && (
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
