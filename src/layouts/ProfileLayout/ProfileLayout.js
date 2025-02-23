import classNames from "classnames/bind";
import styles from "./ProfileLayout.module.scss";
import Sidebar from "../../components/Sidebar/Sidebar";

const cx = classNames.bind(styles);

function ProfileLayout({ children }) {
  return (
    <div className={cx("wrapper")}>
     <img src="https://i.pinimg.com/736x/20/13/0d/20130d96442b00c5bccffdb250a25c93.jpg" className={cx('background-img')}/>
     <div className={cx('container')}>
        <div className={cx("sidebar-container")}>
          <Sidebar />
        </div>
        <div className={cx("content")}>{children}</div>
     </div>
    </div>
  );
}

export default ProfileLayout;
