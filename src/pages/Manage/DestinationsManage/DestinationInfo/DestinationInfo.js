import classNames from "classnames/bind";
import styles from "./DestinationInfo.module.scss";
import NavigateManage from "../../../../components/NavigateManage/NavigateManage";
import { Outlet, useParams } from "react-router-dom";

const cx = classNames.bind(styles);

function DestinationInfo() {
  const param = useParams();
  
  return (
    <div className={cx("wrapper")}>
      <div className={cx("navigate")}>
        <div className={cx('info')}>{param.info==='add_content' ? 'Adding': param.info}</div>
        <NavigateManage to={`trips`}>Trips</NavigateManage>
        <NavigateManage to={`hotels`}>Hotels</NavigateManage>
        <NavigateManage to={`transports`}>Transports</NavigateManage>
      </div>
      <div className={cx("content")}>
        <Outlet />
      </div>
    </div>
  );
}

export default DestinationInfo;
