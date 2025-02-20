import { NavLink, Outlet, useParams,useLocation } from "react-router-dom";
import classNames from "classnames/bind";
import styles from './Placement.module.scss'

const cx = classNames.bind(styles)

function Placement() {
  let { placement } = useParams();
  const location = useLocation()
  return (<div className={cx('wrapper')}>
    <div className={cx('menu-bar')}>
      <div className={cx('selected')}>{placement.replace(/([a-z])([A-Z])/g, '$1 $2')}</div>
      <NavLink to={`trips`} className={(nav) => cx('/trips', {active : nav.isActive})} > Trips </NavLink>
      <NavLink to={`hotels`} className={(nav) => cx('hotels', {active : nav.isActive})}> Hotels </NavLink>
      <NavLink to={`transports`} className={(nav) => cx('transports', {active : nav.isActive})}> Transports </NavLink>
    </div>
    <Outlet />
  </div>);
}

export default Placement;