import classNames from "classnames/bind";
import styles from "./ContactPopper.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import images from "../../assets/images";

const cx = classNames.bind(styles);

function ContactPopper({ data, onClick }) {
  return (
    <div className={cx("wrapper")} onClick={onClick}>
      <div className={cx("left-side")}>
        <div className={cx("client-info")}>
          <img src={data.client.avatar || images.noImg} />
          <div className={cx("txt-info")}>
            <div className={cx("name")}>{data.client.name}</div>
            <div className={cx("email")}>{data.client.email}</div>
          </div>
        </div>
        <div className={cx("title")}>{data.title}</div>
      </div>

      <div className={cx("right-side")}>
        {data.response ? (
          <div className={cx("confirm-responsed")}>
            <FontAwesomeIcon icon={faCheckCircle} />
            <div>Is responsed</div>
          </div>
        ) : (
          <div className={cx("confirm-noresponsed")}>
            <FontAwesomeIcon icon={faXmarkCircle} />
            <div>Not responsed yet</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContactPopper;
