import classNames from "classnames/bind";
import Slider from "react-slick";
import styles from "./Favourite.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import Pin from "../../../components/Tablet/Pin";

const cx = classNames.bind(styles);

function Favourite() {
  const BLOGS = [
    {
      name: "HaNoi",
      image:
        "https://res.klook.com/image/upload/fl_lossy.progressive/q_auto/c_fill,w_750/blogen/2019/05/things-to-do-in-hanoi-8.jpg",
      title: "Your Guide To Visiting Hanoi In 2025",
      to: "/",
    },
    {
      name: "HaNoi",
      image:
        "https://www.captureatrip.com/_next/image?url=https%3A%2F%2Fcaptureatrip-cms-storage.s3.ap-south-1.amazonaws.com%2FPlaces_to_Visit_in_Hanoi_bfad619bfa.jpg&w=3840&q=50",
      title: "Your Guide To Visiting Hanoi In 2025",
      to: "/",
    },
    {
      name: "HaNoi",
      image:
        "https://www.roowanders.com/wp-content/uploads/2023/10/Hanoi-Tran-Quoc-Pagoda-02-820x1024.jpg",
      title: "Your Guide To Visiting Hanoi In 2025",
      to: "/",
    },
    {
      name: "HaNoi",
      image:
        "https://res.klook.com/image/upload/fl_lossy.progressive/q_auto/c_fill,w_750/blogen/2019/05/things-to-do-in-hanoi-8.jpg",
      title: "Your Guide To Visiting Hanoi In 2025",
      to: "/",
    },
    {
      name: "HaNoi",
      image:
        "https://www.captureatrip.com/_next/image?url=https%3A%2F%2Fcaptureatrip-cms-storage.s3.ap-south-1.amazonaws.com%2FPlaces_to_Visit_in_Hanoi_bfad619bfa.jpg&w=3840&q=50",
      title: "Your Guide To Visiting Hanoi In 2025",
      to: "/",
    },
    {
      name: "HaNoi",
      image:
        "https://www.roowanders.com/wp-content/uploads/2023/10/Hanoi-Tran-Quoc-Pagoda-02-820x1024.jpg",
      title: "Your Guide To Visiting Hanoi In 2025",
      to: "/",
    },
    {
      name: "HaNoi",
      image:
        "https://res.klook.com/image/upload/fl_lossy.progressive/q_auto/c_fill,w_750/blogen/2019/05/things-to-do-in-hanoi-8.jpg",
      title: "Your Guide To Visiting Hanoi In 2025",
      to: "/",
    },
    {
      name: "HaNoi",
      image:
        "https://www.captureatrip.com/_next/image?url=https%3A%2F%2Fcaptureatrip-cms-storage.s3.ap-south-1.amazonaws.com%2FPlaces_to_Visit_in_Hanoi_bfad619bfa.jpg&w=3840&q=50",
      title: "Your Guide To Visiting Hanoi In 2025",
      to: "/",
    },
    {
      name: "HaNoi",
      image:
        "https://www.roowanders.com/wp-content/uploads/2023/10/Hanoi-Tran-Quoc-Pagoda-02-820x1024.jpg",
      title: "Your Guide To Visiting Hanoi In 2025",
      to: "/",
    },
    {
      name: "HaNoi",
      image:
        "https://res.klook.com/image/upload/fl_lossy.progressive/q_auto/c_fill,w_750/blogen/2019/05/things-to-do-in-hanoi-8.jpg",
      title: "Your Guide To Visiting Hanoi In 2025",
      to: "/",
    },
    {
      name: "HaNoi",
      image:
        "https://www.captureatrip.com/_next/image?url=https%3A%2F%2Fcaptureatrip-cms-storage.s3.ap-south-1.amazonaws.com%2FPlaces_to_Visit_in_Hanoi_bfad619bfa.jpg&w=3840&q=50",
      title: "Your Guide To Visiting Hanoi In 2025",
      to: "/",
    },
    {
      name: "HaNoi",
      image:
        "https://www.roowanders.com/wp-content/uploads/2023/10/Hanoi-Tran-Quoc-Pagoda-02-820x1024.jpg",
      title: "Your Guide To Visiting Hanoi In 2025",
      to: "/",
    },
    {
      name: "HaNoi",
      image:
        "https://res.klook.com/image/upload/fl_lossy.progressive/q_auto/c_fill,w_750/blogen/2019/05/things-to-do-in-hanoi-8.jpg",
      title: "Your Guide To Visiting Hanoi In 2025",
      to: "/",
    },
    {
      name: "HaNoi",
      image:
        "https://www.captureatrip.com/_next/image?url=https%3A%2F%2Fcaptureatrip-cms-storage.s3.ap-south-1.amazonaws.com%2FPlaces_to_Visit_in_Hanoi_bfad619bfa.jpg&w=3840&q=50",
      title: "Your Guide To Visiting Hanoi In 2025",
      to: "/",
    },
    {
      name: "HaNoi",
      image:
        "https://www.roowanders.com/wp-content/uploads/2023/10/Hanoi-Tran-Quoc-Pagoda-02-820x1024.jpg",
      title: "Your Guide To Visiting Hanoi In 2025",
      to: "/",
    },
  ];
  const TRIPS = [
    {
      name: "Temple of Literature",
      city: "Ha Noi",
      star: 3.5,
      price: 20,
      image:
        "https://image.vietnam.travel/sites/default/files/styles/top_banner/public/2017-06/vietnam-travel-5.jpg?itok=XVnHP3ty",
      description:
        "Văn Miếu (Vietnamese: Văn Miếu, chữ Hán: 文廟[1][2]), literally translated as Temple of Literature (although a more accurate name should be Temple of Confucius, as Văn refers to Confucius), is a temple dedicated to Confucius in Hanoi, northern Vietnam. The temple was founded and first built in 1070 at the time of Emperor Lý Thánh Tông, and it hosted the Imperial Academy (Quốc Tử Giám, 國子監), Vietnam's first national university, from 1076 to 1779. In 1803, The academy was moved to the new capital of Nguyen dynasty in Hue.",
      to: "/",
      activities: "visit,souvenir",
    },
    {
      name: "Temple of Literature",
      city: "Ha Nam",
      star: 4,
      price: 20,
      image:
        "https://media.gettyimages.com/id/564677101/photo/pagoda-on-hoan-kiem-lake.jpg?s=612x612&w=gi&k=20&c=yt1Uhahe8yczaTMa5g_q3Cab2RSh7zUBAf2Z6f1m8tc=",
      description:
        "Văn Miếu (Vietnamese: Văn Miếu, chữ Hán: 文廟[1][2]), literally translated as Temple of Literature (although a more accurate name should be Temple of Confucius, as Văn refers to Confucius), is a temple dedicated to Confucius in Hanoi, northern Vietnam. The temple was founded and first built in 1070 at the time of Emperor Lý Thánh Tông, and it hosted the Imperial Academy (Quốc Tử Giám, 國子監), Vietnam's first national university, from 1076 to 1779. In 1803, The academy was moved to the new capital of Nguyen dynasty in Hue.",
      to: "/",
    },
    {
      name: "Temple of Literature",
      city: "Ha Noi",
      star: 4,
      price: 20,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwH7zryZS9Prdrkfl4hvz-3B-03JqK5y9Oww&s",
      description:
        "Văn Miếu (Vietnamese: Văn Miếu, chữ Hán: 文廟[1][2]), literally translated as Temple of Literature (although a more accurate name should be Temple of Confucius, as Văn refers to Confucius), is a temple dedicated to Confucius in Hanoi, northern Vietnam. The temple was founded and first built in 1070 at the time of Emperor Lý Thánh Tông, and it hosted the Imperial Academy (Quốc Tử Giám, 國子監), Vietnam's first national university, from 1076 to 1779. In 1803, The academy was moved to the new capital of Nguyen dynasty in Hue.",
      to: "/",
      activities: "fishing,campfire",
    },
    {
      name: "Temple of Literature",
      city: "Ha Nam",
      star: 4,
      price: 20,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrx6r2oFGmae87rAfgPXHj7PTZDnsSRgwawA&s",
      description:
        "Văn Miếu (Vietnamese: Văn Miếu, chữ Hán: 文廟[1][2]), literally translated as Temple of Literature (although a more accurate name should be Temple of Confucius, as Văn refers to Confucius), is a temple dedicated to Confucius in Hanoi, northern Vietnam. The temple was founded and first built in 1070 at the time of Emperor Lý Thánh Tông, and it hosted the Imperial Academy (Quốc Tử Giám, 國子監), Vietnam's first national university, from 1076 to 1779. In 1803, The academy was moved to the new capital of Nguyen dynasty in Hue.",
      to: "/",
    },
    {
      name: "Temple of Literature",
      city: "Ha Giang",
      star: 4,
      price: 20,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Hanoi_Skyline_-_NKS.jpg/288px-Hanoi_Skyline_-_NKS.jpg",
      description:
        "Văn Miếu (Vietnamese: Văn Miếu, chữ Hán: 文廟[1][2]), literally translated as Temple of Literature (although a more accurate name should be Temple of Confucius, as Văn refers to Confucius), is a temple dedicated to Confucius in Hanoi, northern Vietnam. The temple was founded and first built in 1070 at the time of Emperor Lý Thánh Tông, and it hosted the Imperial Academy (Quốc Tử Giám, 國子監), Vietnam's first national university, from 1076 to 1779. In 1803, The academy was moved to the new capital of Nguyen dynasty in Hue.",
      to: "/",
    },
  ];

  const [tab, setTab] = useState("Blogs");
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    centerMode: true,
    centerPadding: "0px",
    arrows: true,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "0px",
        },
      },
    ],
  };

  const renderContent = () => {
    switch (tab) {
      case "Blogs":
        return (
          <div className={cx("blog-container")}>
            {BLOGS.map((blog, index) => (
              <Pin
                className={cx("blog-content")}
                key={index}
                imgSrc={blog.image}
                type="page"
                to="/"
                name={blog.name}
                title={blog.title}
              />
            ))}
          </div>
        );
      case "Trips":
        return (
          <div className={cx("container")}>
            <Slider {...settings}>
              {TRIPS.map((trip, index) => (
                <Link
                  to={trip.to}
                  key={index}
                  tabIndex={0}
                  className={cx("info", {
                    "active-slide": index === currentSlide,
                  })}
                >
                  <img className={cx("img")} src={trip.image} />
                  <div className={cx("content")}>
                    <div className={cx("name")}> {trip.name}</div>
                  </div>
                </Link>
              ))}
            </Slider>
          </div>
        );
    }
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("tabs")}>
        {" "}
        {["Blogs", "Trips"].map((item) => (
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
