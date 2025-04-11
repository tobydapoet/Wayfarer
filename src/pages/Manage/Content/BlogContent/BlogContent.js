import classNames from "classnames/bind";
import styles from "./BlogContent.module.scss";
import SearchBar from "../../../../components/SearchBar";
import BlogManageItem from "../../../../components/BlogManageItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

const BLOGITEMS = [
  {
    image:
      "https://res.klook.com/image/upload/fl_lossy.progressive/q_auto/c_fill,w_750/blogen/2019/05/things-to-do-in-hanoi-8.jpg",
    title: "Top 10 Must-See Attractions in Hanoi",
    content:
      "Explore the beauty of Hanoi with this guide to the most iconic landmarks, from Hoan Kiem Lake to the Temple of Literature.",
    createdBy: "Davis Astee",
    createdAt: "2025-04-10 09:30",
    status: false,
  },
  {
    image:
      "https://res.klook.com/image/upload/fl_lossy.progressive/q_auto/c_fill,w_750/blogen/2019/05/things-to-do-in-hanoi-8.jpg",
    title: "A Local’s Food Tour Through the Streets of Hanoi",
    content:
      "Join Davis on a delicious adventure sampling street food classics like pho, bun cha, and egg coffee.",
    createdBy: "Davis Astee",
    createdAt: "2025-04-09 15:45",
    status: true,
  },
  {
    image:
      "https://res.klook.com/image/upload/fl_lossy.progressive/q_auto/c_fill,w_750/blogen/2019/05/things-to-do-in-hanoi-8.jpg",
    title: "Hanoi’s Best Hidden Cafés",
    content:
      "Discover cozy corners and Instagram-worthy spots hidden in the alleyways of Vietnam's capital.",
    createdBy: "Davis Astee",
    createdAt: "2025-04-08 11:00",
    status: false,
  },
  {
    image:
      "https://res.klook.com/image/upload/fl_lossy.progressive/q_auto/c_fill,w_750/blogen/2019/05/things-to-do-in-hanoi-8.jpg",
    title: "Weekend Getaways Near Hanoi",
    content:
      "Escape the hustle of Hanoi with these scenic destinations just a short drive away.",
    createdBy: "Davis Astee",
    createdAt: "2025-04-07 16:20",
    status: true,
  },
  {
    image:
      "https://res.klook.com/image/upload/fl_lossy.progressive/q_auto/c_fill,w_750/blogen/2019/05/things-to-do-in-hanoi-8.jpg",
    title: "Exploring Hanoi’s Historical Temples",
    content:
      "Step back in time as you explore Hanoi's ancient temples and pagodas filled with history and charm.",
    createdBy: "Davis Astee",
    createdAt: "2025-04-06 10:05",
    status: true,
  },
  {
    image:
      "https://res.klook.com/image/upload/fl_lossy.progressive/q_auto/c_fill,w_750/blogen/2019/05/things-to-do-in-hanoi-8.jpg",
    title: "Hanoi at Night: A City That Never Sleeps",
    content:
      "Experience the lively energy of Hanoi after dark—from night markets to rooftop lounges.",
    createdBy: "Davis Astee",
    createdAt: "2025-04-05 21:30",
    status: false,
  },
  {
    image:
      "https://res.klook.com/image/upload/fl_lossy.progressive/q_auto/c_fill,w_750/blogen/2019/05/things-to-do-in-hanoi-8.jpg",
    title: "The Art Scene in Hanoi",
    content:
      "Uncover Hanoi’s growing art scene from contemporary galleries to street murals.",
    createdBy: "Davis Astee",
    createdAt: "2025-04-04 14:10",
    status: false,
  },
  {
    image:
      "https://res.klook.com/image/upload/fl_lossy.progressive/q_auto/c_fill,w_750/blogen/2019/05/things-to-do-in-hanoi-8.jpg",
    title: "Surviving Hanoi Traffic: Tips for Tourists",
    content:
      "Worried about crossing streets in Hanoi? Here's how to navigate the chaos safely.",
    createdBy: "Davis Astee",
    createdAt: "2025-04-03 08:50",
    status: true,
  },
];

function BlogContent() {
  const navigate = useNavigate();
  const handleRowClick = () => {
    navigate("add_content");
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <SearchBar />
        <div
          className={cx("add")}
          style={{ cursor: "pointer" }}
          onClick={handleRowClick}
        >
          <FontAwesomeIcon icon={faPlus} />
        </div>
      </div>
      <div className={cx("blogs-wrapper")}>
        {BLOGITEMS.map((blog, index) => (
          <BlogManageItem key={index} data={blog} />
        ))}
      </div>
    </div>
  );
}

export default BlogContent;
