import classNames from "classnames/bind";
import styles from './Content.module.scss'
import { NavLink, Outlet } from "react-router-dom";

const cx = classNames.bind(styles)

function Content() {
    return ( 
              <div className={cx('wrapper')}>
                  <div className={cx("navigate")}>
                    <NavLink
                      to={`home_content`}
                      className={(nav) => cx("homeContent", { active: nav.isActive })}
                    >
                      Home
                    </NavLink>
                    <NavLink
                      to={`destinations_content`}
                      className={(nav) => cx("destinationsContent", { active: nav.isActive })}
                    >
                      Destinations
                    </NavLink>
                    <NavLink
                      to={`about_us_content`}
                      className={(nav) => cx("aboutusContent", { active: nav.isActive })}
                    >
                      About us
                    </NavLink>
                    <NavLink
                      to={`blog_content`}
                      className={(nav) => cx("blogContent", { active: nav.isActive })}
                    >
                      Blog
                    </NavLink>
                  </div>
                  <div className={cx('content')}>
                    <Outlet />
                  </div>
              </div> );
}

export default Content;