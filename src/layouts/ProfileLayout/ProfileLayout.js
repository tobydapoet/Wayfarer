import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import styles from "./ProfileLayout.module.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Link } from "react-router-dom";
import { AccountProvider } from "../../contexts/AccountContext";

const cx = classNames.bind(styles);

function ProfileLayout({ children }) {
  return (
    <div className={cx("wrapper")}>
      <Link to={"/"} className={cx("go-back")}>
        <FontAwesomeIcon className={cx("back-icon")} icon={faArrowLeft} />
      </Link>
      <img
        src="https://i.pinimg.com/736x/20/13/0d/20130d96442b00c5bccffdb250a25c93.jpg"
        className={cx("background-img")}
      />
      <div className={cx("container")}>
        <div className={cx("sidebar-container")}>
          <AccountProvider>
            <Sidebar profile />
          </AccountProvider>
        </div>
        <div className={cx("content")}>{children}</div>
      </div>
    </div>
  );
}

export default ProfileLayout;
