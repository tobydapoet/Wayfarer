import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";

const cx = classNames.bind(styles);

function Sidebar({ profile, management, dark }) {
  const user = JSON.parse(localStorage.getItem('user'))

  const positionMap = {
    0: 'Manager',
    1: 'Staff',
    2: 'Client'
  }

  const { email } = useParams();

  return (
    <div className={cx("wrapper")}>
      <Link to={`/${user.email}`} className={cx("current-user")}>
        <div className={cx("img-container")}>
          <img src={user.avatar} className={cx("img-avatar")} />
        </div>

        <div className={cx("info-user", { dark })}>
          <div className={cx("name")}>{user.name}</div>
          <div className={cx("email")}> {user.email}</div>
          {user.position !== "guess" && (
            <div className={cx("position")}>
              {positionMap[user.position]}
            </div>
          )}
        </div>
      </Link>

      {profile && (
        <>
          <div className="gap-line1"></div>

          <div className={cx("navigate-profile")}>
            <NavLink
              to={`/${email}/processing`}
              className={(nav) => cx("processing", { active: nav.isActive })}
            >
              Processing
            </NavLink>
            <NavLink
              to={`/${email}/favourite`}
              className={(nav) => cx("favourite", { active: nav.isActive })}
            >
              Favourite
            </NavLink>
            <NavLink
              to={`/${email}/bonus`}
              className={(nav) => cx("bonus", { active: nav.isActive })}
            >
              Bonus point
            </NavLink>
          </div>

          <div className="gap-line2"></div>

          <div className={cx("logout")}>
            <Link to="" className="logout">
              Log out
            </Link>
          </div>
        </>
      )}
      {management && (
        <div className={cx("navigate-manage")}>
          <NavLink
            to={`business`}
            className={(nav) => cx("busniness", { active: nav.isActive })}
          >
            Business
          </NavLink>
          <NavLink
            to={`destinations`}
            className={(nav) => cx("destinations", { active: nav.isActive })}
          >
            Destinations
          </NavLink>
          <NavLink
            to={`content`}
            className={(nav) => cx("content", { active: nav.isActive })}
          >
            Content
          </NavLink>
          <NavLink
            to={`partners`}
            className={(nav) => cx("partners", { active: nav.isActive })}
          >
            Partners
          </NavLink>
          <NavLink
            to={`billsmanage`}
            className={(nav) => cx("billsmanage", { active: nav.isActive })}
          >
            Bills
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
