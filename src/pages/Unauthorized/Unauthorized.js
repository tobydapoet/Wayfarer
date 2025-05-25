import classNames from "classnames/bind";
import styles from "./Unauthorized.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function Unauthorized() {
  return (
    <div className={cx("wrapper")}>
      <FontAwesomeIcon className={cx("icon")} icon={faExclamation} />
      <div className={cx("content")}>This page is not exists!</div>
    </div>
  );
}

export default Unauthorized;
