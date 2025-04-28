import classNames from "classnames/bind";
import styles from "./BlogInfo.module.scss";
import Button from "../../../components/Button";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const cx = classNames.bind(styles);

const user =
  JSON.parse(localStorage.getItem("user")) ||
  JSON.parse(sessionStorage.getItem("user"));

const BLOG = {
  image:
    "https://res.klook.com/image/upload/fl_lossy.progressive/q_auto/c_fill,w_750/blogen/2019/05/things-to-do-in-hanoi-8.jpg",
  title: "Surviving Hanoi Traffic: Tips for Tourists",
  content:
    "Worried about crossing streets in Hanoi? Here's how to navigate the chaos safely.Worried about crossing streets in Hanoi? Here's how to navigate the chaos safely.Worried about crossing streets in Hanoi? Here's how to navigate the chaos safely.Worried about crossing streets in Hanoi? Here's how to navigate the chaos safely.Worried about crossing streets in Hanoi? Here's how to navigate the chaos safely.Worried about crossing streets in Hanoi? Here's how to navigate the chaos safely.Worried about crossing streets in Hanoi? Here's how to navigate the chaos safely.Worried about crossing streets in Hanoi? Here's how to navigate the chaos safely.Worried about crossing streets in Hanoi? Here's how to navigate the chaos safely.",
  createdBy: "Davis Astee",
  createdAt: "2025-04-03 08:50",
  status: false,
};
function BlogInfo() {
  const location = useLocation();
  const isBlogInfo = location.pathname.includes("/blogs/");

  return (
    <div className={cx("wrapper", { clientInterface: isBlogInfo })}>
      <div className={cx("header")}>
        <div className={cx("title")}>{BLOG.title}</div>
        <div className={cx("owner")}>By: {BLOG.createdBy}</div>
        <div className={cx("created-time")}>At: {BLOG.createdAt}</div>
        <hr></hr>
      </div>
      <div className={cx("body")}>
        <img src={BLOG.image} />
        <div className={cx("content")}>{BLOG.content}</div>
      </div>
      {user.position && BLOG.status !== true && (
        <div className={cx("btn-container")}>
          <Button rounded>Appove</Button>
        </div>
      )}
    </div>
  );
}

export default BlogInfo;
