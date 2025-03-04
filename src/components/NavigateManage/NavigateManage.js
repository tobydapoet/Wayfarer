import classNames from "classnames/bind";
import styles from "./NavigateManage.module.scss";
import { NavLink } from "react-router-dom";

const cx= classNames.bind(styles)

function NavigateManage({to,children}) {
  return (
    <div className={cx('wrapper')}>
      <NavLink
        to={to}
        className={(nav) => cx('navigate-item' ,{ active: nav.isActive })}
      >{children}</NavLink>
    </div>
  );
}

export default NavigateManage;
