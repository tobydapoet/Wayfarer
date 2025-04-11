import { useState } from "react";
import classNames from "classnames/bind";
import styles from "./ContactItem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Notice from "../Notice/Notice";
import Modal from "../Modal";

const cx = classNames.bind(styles);

function ContactItem({ data }) {
  const [openNotice, setOpenNotice] = useState(false);
  const [openContent, setOpenContent] = useState(false);
  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("xmark")} onClick={() => setOpenNotice(true)}>
          <FontAwesomeIcon icon={faXmark} />
        </div>
        <div className={cx("container")} onClick={() => setOpenContent(true)}>
          <div className={cx("header")}>
            <div className={cx("client-info")}>
              <img src={data.avatar} />
              <div className={cx("txt-info")}>
                <div className={cx("name-client")}>{data.name}</div>
                <div className={cx("email-client")}>{data.email}</div>
              </div>
            </div>
            <div className={cx("time-create")}>{data.createdAt}</div>
          </div>
          <div className={cx("body")}>
            <div className={cx("title")}>{data.title}</div>
            <div className={cx("content")}>{data.content}</div>
          </div>
        </div>
      </div>
      <Notice
        open={openNotice}
        onClose={() => setOpenNotice(false)}
        content="Do you want to delete this contact ??"
      />
      <Modal form open={openContent} onClose={() => setOpenContent(false)}>
        <div
          className={cx("modal-wrapper")}
          onClick={() => setOpenContent(true)}
        >
          {" "}
          <div className={cx("header")}>
            <div className={cx("client-info")}>
              <img src={data.avatar} />
              <div className={cx("txt-info")}>
                <div className={cx("name-client")}>{data.name}</div>
                <div className={cx("email-client")}>{data.email}</div>
              </div>
            </div>
            <div className={cx("time-create")}>{data.createdAt}</div>
          </div>
          <div className={cx("body")}>
            <div className={cx("title")}>{data.title}</div>
            <div className={cx("content")}>{data.content}</div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ContactItem;
