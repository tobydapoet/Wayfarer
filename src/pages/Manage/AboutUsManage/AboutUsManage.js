import classNames from "classnames/bind";
import styles from "./AboutUsManage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { useContext } from "react";

import { useNavigate } from "react-router-dom";
import AboutContentItem from "../../../components/AboutContentItem";
import { AboutUsContext } from "../../../contexts/AboutUsContext";

const cx = classNames.bind(styles);

function AboutUsManage() {
  const { allContent, handleDeleteContent } = useContext(AboutUsContext);
  const navigate = useNavigate();
  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("content-section")}>
          <div className={cx("header")}>
            <div className={cx("add")} onClick={() => navigate("add_content")}>
              <FontAwesomeIcon icon={faPlus} />
            </div>
          </div>
          <div className={cx("content")} />
          {allContent.map((content, index) => (
            <AboutContentItem
              data={content}
              key={index}
              onClick={() => navigate(content._id)}
              onDelete={() => handleDeleteContent(content._id)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default AboutUsManage;
