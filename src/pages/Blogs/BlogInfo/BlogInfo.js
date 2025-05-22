import classNames from "classnames/bind";
import styles from "./BlogInfo.module.scss";
import Button from "../../../components/Button";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { BlogContext } from "../../../contexts/BlogContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShare } from "@fortawesome/free-solid-svg-icons";
import { BlogFavouriteContext } from "../../../contexts/BlogFavouriteContext";
import { getCurrentUser } from "../../../utils/currentUser";

const cx = classNames.bind(styles);

function BlogInfo() {
  const { blogData, handleApproveBlog } = useContext(BlogContext);
  const location = useLocation();
  const isBlogInfo = location.pathname.includes("/blogs/");
  const isOwnerInfo = location.pathname.includes("/my_blogs/");
  const blogTime = new Date(blogData.createdAt);
  const user = getCurrentUser();

  const { allBlogFavourite, handleToggleFavourite } =
    useContext(BlogFavouriteContext);

  const isFavourite = allBlogFavourite.some((fav) => {
    const favBlogId =
      typeof fav.blogId === "string" ? fav.blogId : fav.blogId?._id;
    const favClientId =
      typeof fav.clientId === "string" ? fav.clientId : fav.clientId?._id;
    return favBlogId === blogData?._id && favClientId === user?._id;
  });

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
        <div className={cx("right-side")}>
          {!isBlogInfo && <img src={blogData.image} />}
          {isBlogInfo && user && !user?.position && (
            <div className={cx("client-ffc")}>
              <FontAwesomeIcon
                icon={faHeart}
                className={cx("favourite-icon", { isActive: isFavourite })}
                onClick={(e) => {
                  const icon = e.currentTarget;
                  icon.classList.add(styles.shrink);
                  setTimeout(() => icon.classList.remove(styles.shrink), 100);
                  handleToggleFavourite(blogData._id);
                }}
              />
              <FontAwesomeIcon
                icon={faShare}
                className={cx("share-icon")}
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                }}
              />
            </div>
          )}
        </div>
      </div>
      <hr></hr>
      <div className={cx("body")}>
        <div dangerouslySetInnerHTML={{ __html: blogData.content }} />
      </div>
      {user.position && blogData.status === false && (
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
