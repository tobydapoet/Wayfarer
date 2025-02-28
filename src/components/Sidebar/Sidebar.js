import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import { Link, NavLink, useParams } from "react-router-dom";

const cx = classNames.bind(styles);

function Sidebar() {
  const userInfo = {
    name: "Nguyen Viet Tung",
    email: "Cat@gmail.com",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFAz7TV79RYxtJu5RScxRax-OljYqpIKqPxw&s",
    position: "manager",
  };

  const { email } = useParams();

  return (
    <div className={cx("wrapper")}>
      <Link to={`/${userInfo.email}`} className={cx("current-user")}>
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
        <NavLink to={`/${email}/processing`} className={(nav) => cx('processing', {active : nav.isActive})}>
          Processing
        </NavLink>
        <NavLink to={`/${email}/favourite`} className={(nav) => cx('favourite', {active : nav.isActive})}>
          Favourite
        </NavLink>
        <NavLink to={`/${email}/history`} className={(nav) => cx('history', {active : nav.isActive})} >
          History
        </NavLink>
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
