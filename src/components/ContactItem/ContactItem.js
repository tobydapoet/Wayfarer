import { useState } from "react";
import classNames from "classnames/bind";
import styles from "./ContactItem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faXmark,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import Notice from "../Notice/Notice";

const cx = classNames.bind(styles);

function ContactItem({ data, onClick, onDelete }) {
  const [openNotice, setOpenNotice] = useState(false);
  const timeContact = new Date(data.createdAt);
  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("xmark")} onClick={() => setOpenNotice(true)}>
          <FontAwesomeIcon icon={faXmark} />
        </div>
        <div className={cx("container")} onClick={onClick}>
          <div className={cx("header")}>
            <div className={cx("client-info")}>
              <img src={data.clientId.avatar} />
              <div className={cx("txt-info")}>
                <div className={cx("name-client")}>{data.clientId.name}</div>
                <div className={cx("email-client")}>{data.clientId.email}</div>
              </div>
            </div>
            <div className={cx("time-create")}>
              {timeContact.toLocaleDateString()}
            </div>
          </div>
          <div className={cx("body")}>
            <div className={cx("title")}>{data.title}</div>
            <div className={cx("content")}>{data.message}</div>
          </div>
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
      <Notice
        open={openNotice}
        onClose={() => setOpenNotice(false)}
        content="Do you want to delete this contact ??"
        onConfirm={onDelete}
      />
    </>
  );
}

export default ContactItem;
