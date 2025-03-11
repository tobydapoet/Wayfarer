import classNames from "classnames/bind";
import styles from "./Content.module.scss";
import NavigateManage from "../../../components/NavigateManage/NavigateManage";
import { Outlet } from "react-router-dom";

const cx = classNames.bind(styles);

function Content() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("navigate")}>
        <NavigateManage
          to={`home_content`}
          className={(nav) => cx("homeContent", { active: nav.isActive })}
        >
          Home
        </NavigateManage>
        <NavigateManage
          to={`destinations_content`}
          className={(nav) =>
            cx("destinationsContent", { active: nav.isActive })
          }
        >
          Destinations
        </NavigateManage>
        <NavigateManage
          to={`about_us_content`}
          className={(nav) => cx("aboutusContent", { active: nav.isActive })}
        >
          About us
        </NavigateManage>
        <NavigateManage
          to={`blog_content`}
          className={(nav) => cx("blogContent", { active: nav.isActive })}
        >
          Blog
        </NavigateManage>
      </div>
      <div className={cx("content")}>
        <Outlet />
      </div>
    </div>
  );
}

export default Content;
