import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function Sidebar() {
  const userInfo = {
    name: "Nguyen Viet Tung",
    email: "Cat@gmail.com",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFAz7TV79RYxtJu5RScxRax-OljYqpIKqPxw&s",
    position: "manager",
  };

  return (
    <div className={cx("wrapper")}>
      <Link to="" className={cx("current-user")}>
        <div className={cx("img-container")}>
          <img src={userInfo.avatar} className={cx("img-avatar")} />
        </div>
        
        <div className={cx('info-user')}>
            <div className={cx("name")}>{userInfo.name}</div>
            <div className={cx("email")}> {userInfo.email}</div>
            {userInfo.position !== "guess" && (
              <div className={cx("position")}>
                {userInfo.position.charAt(0).toUpperCase() +
                  userInfo.position.slice(1)}
              </div>
            )}
        </div>
      </Link>

      <div className="gap-line1"></div>

      <div className={cx("nevigate")}>
        <Link to="" className="notify">
          Notifiy
        </Link>
        <Link to="" className="favourite">
          Favourite
        </Link>
        <Link to="" className="history">
          History
        </Link>
      </div>

      <div className="gap-line2"></div>

      <div className={cx("logout")}>
        <Link to="" className="logout">
          Log out
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
