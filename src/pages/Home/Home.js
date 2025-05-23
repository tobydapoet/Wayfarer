import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import { ToIcon } from "../../components/Icons";
import CinematicVideo from "../../components/CinematicVideo/CinematicVideo";
import styles from "./Home.module.scss";
import Tablet from "../../components/Tablet/Tablet";
import { useContext, useState } from "react";
import { DestinationContext } from "../../contexts/DestinationContext";
import { BlogContext } from "../../contexts/BlogContext";
import { CityContext } from "../../contexts/CityContext";
import CityItem from "../../components/CityItem/CityItem";
import Slider from "react-slick";
import BlogHomeItem from "../../components/BlogHomeItem/BlogHomeItem";
import { BlogFavouriteContext } from "../../contexts/BlogFavouriteContext";
import { BillContext } from "../../contexts/BillContext";

const cx = classNames.bind(styles);

function Home() {
  const { allDestinations, handleSelectedDestination } =
    useContext(DestinationContext);
  const { allBlogData } = useContext(BlogContext);
  const { allCities } = useContext(CityContext);
  const { allBlogFavourite } = useContext(BlogFavouriteContext);
  const { handleCalculateClient } = useContext(BillContext);
  const navigate = useNavigate();

  const blogMap = allBlogFavourite.reduce((acc, fav) => {
    const blogId = typeof fav.blogId === "string" ? fav.blogId : fav.blogId._id;
    acc[blogId] = (acc[blogId] || 0) + 1;
    return acc;
  }, {});

  const sortedBlogs = [...allBlogData].sort((a, b) => {
    const countA = blogMap[a._id] || 0;
    const countB = blogMap[b._id] || 0;
    return countB - countA;
  });

  const sortedLocations = [...allDestinations].sort((a, b) => {
    const countA = handleCalculateClient(a._id);
    const countB = handleCalculateClient(b._id);
    return countB - countA; // Giảm dần theo số người đã đi
  });

  const settings = {
    slidesToShow: 3,
    slidesToScroll: 3,
    centerPadding: "0px",
    arrows: true,
    responsive: [
      {
        settings: {
          breakpoint: 0,
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
        },
      },
    ],
  };

  return (
    <>
      <div className={cx("page-header")}>
        <CinematicVideo />
        <div className={cx("content")}>
          <div className={cx("brand")}>
            <div className={cx("brand-name")}>Farwayer</div>
            <div className={cx("brand-title")}>Farer and Lover</div>
          </div>
          <div className={cx("list")}>
            <Link to="/destinations" className={cx("item-container")}>
              <div className={cx("booking")}>Plan your journey</div>
              <span className={cx("icon-container")}>
                <ToIcon className={cx("icon")} />
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className={cx("main-info")}>
        <div className={cx("destinations")}>
          {sortedLocations.slice(0, 5).map((destination) => {
            return (
              <Tablet
                key={destination._id}
                image={destination.image}
                title={destination.name}
                content={destination.description}
                showMore={() => handleSelectedDestination(destination)}
              />
            );
          })}
        </div>
        <div className={cx("city")}>
          <Slider {...settings}>
            {allCities.map((city) => (
              <CityItem
                key={city._id}
                data={city}
                onClick={() => navigate(`/destinations/${city.name}`)}
              />
            ))}
          </Slider>
        </div>
        <div className={cx("blog")}>
          {sortedBlogs.slice(0, 3).map((blog) => (
            <Tablet
              key={blog._id}
              image={blog.image}
              title={blog.title}
              content={blog.content}
              showMore={() => navigate(`/blogs/${blog._id}`)}
              author={blog?.clientId?.name}
            />
          ))}
        </div>
        <div className={cx("new-blog-container")}>
          <div className={cx("new-blog-txt")}>New Blogs</div>
          <div className={cx("blog-row")}>
            {allBlogData.slice(-3).map((blog) => (
              <BlogHomeItem
                key={blog._id}
                data={blog}
                onClick={() => navigate(`/blogs/${blog._id}`)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
