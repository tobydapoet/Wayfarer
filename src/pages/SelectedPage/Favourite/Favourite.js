import classNames from "classnames/bind";
import Slider from "react-slick";
import styles from "./Favourite.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import Pin from "../../../components/Tablet/Pin";
import { BlogContext } from "../../../contexts/BlogContext";
import { BlogFavouriteContext } from "../../../contexts/BlogFavouriteContext";
import { DestinationContext } from "../../../contexts/DestinationContext";
import { DestinationFavouriteContext } from "../../../contexts/DestinationFavouriteContext";
import PlacementItem from "../../../components/PlacementItem";
import { getCurrentUser } from "../../../utils/currentUser";

const cx = classNames.bind(styles);

function Favourite() {
  const [tab, setTab] = useState("Blogs");
  const { allBlogData, handleSelectedBlog } = useContext(BlogContext);
  const { allBlogFavourite } = useContext(BlogFavouriteContext);
  const { allDestinations, handleSelectedDestination } =
    useContext(DestinationContext);
  const { allDestinationFavourite } = useContext(DestinationFavouriteContext);

  const user = getCurrentUser();

  const favouriteBlogIdsOfClient = allBlogFavourite
    .filter((fav) => fav.clientId?._id === user._id)
    .map((fav) =>
      typeof fav.blogId === "string" ? fav.blogId : fav.blogId._id
    );

  const favouriteDestinationdsOfClient = allDestinationFavourite
    .filter((fav) => fav.clientId?._id === user._id)
    .map((fav) =>
      typeof fav.destinationId === "string"
        ? fav.destinationId
        : fav.destinationId._id
    );

  const renderContent = () => {
    switch (tab) {
      case "Blogs":
        return (
          <div className={cx("blog-container")}>
            {allBlogData
              .filter((blog) => favouriteBlogIdsOfClient.includes(blog._id))
              .map((blog) => (
                <Pin
                  key={blog._id}
                  type="page"
                  data={blog}
                  onClick={() => handleSelectedBlog(blog)}
                ></Pin>
              ))}
          </div>
        );
      case "Tours":
        return (
          <div className={cx("tour-container")}>
            {allDestinations
              .filter((destination) =>
                favouriteDestinationdsOfClient.includes(destination._id)
              )
              .map((tour) => (
                <PlacementItem
                  client
                  data={tour}
                  onClick={() => handleSelectedDestination(tour)}
                />
              ))}
          </div>
        );
    }
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("tabs")}>
        {["Blogs", "Tours"].map((item) => (
          <div
            key={item}
            onClick={() => setTab(item)}
            className={cx({ active: item === tab })}
          >
            {item}
          </div>
        ))}
      </div>
      <div>{renderContent()}</div>
    </div>
  );
}

export default Favourite;
