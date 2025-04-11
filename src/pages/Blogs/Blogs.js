import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Blogs.module.scss";
import Pin from "../../components/Tablet/Pin";
import SearchBar from "../../components/SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function Blogs() {
  const BLOGITEMS = [
    {
      name: "HaNoi",
      image:
        "https://res.klook.com/image/upload/fl_lossy.progressive/q_auto/c_fill,w_750/blogen/2019/05/things-to-do-in-hanoi-8.jpg",
      title: "Your Guide To Visiting Hanoi In 2025",
    },
    {
      name: "HaNoi",
      image:
        "https://www.captureatrip.com/_next/image?url=https%3A%2F%2Fcaptureatrip-cms-storage.s3.ap-south-1.amazonaws.com%2FPlaces_to_Visit_in_Hanoi_bfad619bfa.jpg&w=3840&q=50",
      title: "Your Guide To Visiting Hanoi In 2025",
    },
    {
      name: "HaNoi",
      image:
        "https://www.roowanders.com/wp-content/uploads/2023/10/Hanoi-Tran-Quoc-Pagoda-02-820x1024.jpg",
      title: "Your Guide To Visiting Hanoi In 2025",
    },
    {
      name: "HaNoi",
      image:
        "https://res.klook.com/image/upload/fl_lossy.progressive/q_auto/c_fill,w_750/blogen/2019/05/things-to-do-in-hanoi-8.jpg",
      title: "Your Guide To Visiting Hanoi In 2025",
    },
    {
      name: "HaNoi",
      image:
        "https://www.captureatrip.com/_next/image?url=https%3A%2F%2Fcaptureatrip-cms-storage.s3.ap-south-1.amazonaws.com%2FPlaces_to_Visit_in_Hanoi_bfad619bfa.jpg&w=3840&q=50",
      title: "Your Guide To Visiting Hanoi In 2025",
    },
    {
      name: "HaNoi",
      image:
        "https://www.roowanders.com/wp-content/uploads/2023/10/Hanoi-Tran-Quoc-Pagoda-02-820x1024.jpg",
      title: "Your Guide To Visiting Hanoi In 2025",
    },
    {
      name: "HaNoi",
      image:
        "https://res.klook.com/image/upload/fl_lossy.progressive/q_auto/c_fill,w_750/blogen/2019/05/things-to-do-in-hanoi-8.jpg",
      title: "Your Guide To Visiting Hanoi In 2025",
    },
    {
      name: "HaNoi",
      image:
        "https://www.captureatrip.com/_next/image?url=https%3A%2F%2Fcaptureatrip-cms-storage.s3.ap-south-1.amazonaws.com%2FPlaces_to_Visit_in_Hanoi_bfad619bfa.jpg&w=3840&q=50",
      title: "Your Guide To Visiting Hanoi In 2025",
    },
    {
      name: "HaNoi",
      image:
        "https://www.roowanders.com/wp-content/uploads/2023/10/Hanoi-Tran-Quoc-Pagoda-02-820x1024.jpg",
      title: "Your Guide To Visiting Hanoi In 2025",
    },
    {
      name: "HaNoi",
      image:
        "https://res.klook.com/image/upload/fl_lossy.progressive/q_auto/c_fill,w_750/blogen/2019/05/things-to-do-in-hanoi-8.jpg",
      title: "Your Guide To Visiting Hanoi In 2025",
    },
    {
      name: "HaNoi",
      image:
        "https://www.captureatrip.com/_next/image?url=https%3A%2F%2Fcaptureatrip-cms-storage.s3.ap-south-1.amazonaws.com%2FPlaces_to_Visit_in_Hanoi_bfad619bfa.jpg&w=3840&q=50",
      title: "Your Guide To Visiting Hanoi In 2025",
    },
    {
      name: "HaNoi",
      image:
        "https://www.roowanders.com/wp-content/uploads/2023/10/Hanoi-Tran-Quoc-Pagoda-02-820x1024.jpg",
      title: "Your Guide To Visiting Hanoi In 2025",
    },
    {
      name: "HaNoi",
      image:
        "https://res.klook.com/image/upload/fl_lossy.progressive/q_auto/c_fill,w_750/blogen/2019/05/things-to-do-in-hanoi-8.jpg",
      title: "Your Guide To Visiting Hanoi In 2025",
    },
    {
      name: "HaNoi",
      image:
        "https://www.captureatrip.com/_next/image?url=https%3A%2F%2Fcaptureatrip-cms-storage.s3.ap-south-1.amazonaws.com%2FPlaces_to_Visit_in_Hanoi_bfad619bfa.jpg&w=3840&q=50",
      title: "Your Guide To Visiting Hanoi In 2025",
    },
    {
      name: "HaNoi",
      image:
        "https://www.roowanders.com/wp-content/uploads/2023/10/Hanoi-Tran-Quoc-Pagoda-02-820x1024.jpg",
      title: "Your Guide To Visiting Hanoi In 2025",
    },
    {
      name: "HaNoi",
      image:
        "https://res.klook.com/image/upload/fl_lossy.progressive/q_auto/c_fill,w_750/blogen/2019/05/things-to-do-in-hanoi-8.jpg",
      title: "Your Guide To Visiting Hanoi In 2025",
    },
    {
      name: "HaNoi",
      image:
        "https://www.captureatrip.com/_next/image?url=https%3A%2F%2Fcaptureatrip-cms-storage.s3.ap-south-1.amazonaws.com%2FPlaces_to_Visit_in_Hanoi_bfad619bfa.jpg&w=3840&q=50",
      title: "Your Guide To Visiting Hanoi In 2025",
    },
    {
      name: "HaNoi",
      image:
        "https://www.roowanders.com/wp-content/uploads/2023/10/Hanoi-Tran-Quoc-Pagoda-02-820x1024.jpg",
      title: "Your Guide To Visiting Hanoi In 2025",
    },
  ];
  const navigate = useNavigate();

  const handleRowClick = (title) => {
    navigate(`${title}`);
  };
  const handleAddClick = () => {
    navigate("add_content");
  };

  return (
    <div className={cx("search-wrapper")}>
      <div className={cx("header")}>
        <SearchBar />
        <div
          className={cx("add")}
          onClick={handleAddClick}
          style={{ cursor: "pointer" }}
        >
          <FontAwesomeIcon icon={faPlus} />
        </div>
      </div>
      <div className={cx("content-wrapper")}>
        {BLOGITEMS.map((blog, index) => {
          return (
            <Pin
              key={index}
              imgSrc={blog.image}
              type="page"
              name={blog.name}
              title={blog.title}
              onClick={() => handleRowClick(blog.title)}
            ></Pin>
          );
        })}
      </div>
    </div>
  );
}

export default Blogs;
