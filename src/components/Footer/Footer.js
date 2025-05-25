import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTelegram,
} from "@fortawesome/free-brands-svg-icons";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import styles from "./Footer.module.scss";
import images from "../../assets/images";

const cx = classNames.bind(styles);
function Footer() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("content")}>
        <div className={cx("info")}>
          <div>
            Address: 53 P. Nguyen Dinh Chieu, Le Dai Hanh, Hoan Kiem, Ha Noi
          </div>
          <div>tnkoko123@gmail.com</div>
          <div>Phone: *-***-***-***</div>
          <div className={cx("media")}>
            <a href="">
              <FontAwesomeIcon className={cx("icon")} icon={faFacebook} />
            </a>
            <a href="">
              <FontAwesomeIcon className={cx("icon")} icon={faInstagram} />
            </a>
            <a href="">
              <FontAwesomeIcon className={cx("icon")} icon={faTelegram} />
            </a>
          </div>
        </div>
        <Link to={"/"} className={cx("logo-link")}>
          <img src={images.logoLight} alt="Logo" />
        </Link>
      </div>
    </div>
  );
}

export default Footer;
