import classNames from "classnames/bind";
import styles from "./ContactResponse.module.scss";
import { useContext } from "react";
import { ContactContext } from "../../contexts/ContactContext";
import standardTime from "../../utils/standardTime";

const cx = classNames.bind(styles);

function ContactResponse() {
  const { contactValue } = useContext(ContactContext);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("client-question")}>
        <div className={cx("header")}>
          <div className={cx("client-info")}>
            <img src={contactValue.clientId.avatar} />
            <div className={cx("txt-info")}>
              <div className={cx("name")}>{contactValue.clientId.name}</div>
              <div className={cx("email")}>{contactValue.clientId.email}</div>
            </div>
          </div>
          <div className={cx("time-create")}>
            {standardTime(new Date(contactValue.createdAt))}
          </div>
        </div>
        <hr></hr>
        <div className={cx("body")}>
          <div className={cx("feedback")}>
            <p className={cx("txt")}>Title</p>
            <div className={cx("title")}>{contactValue.title}</div>
            <p className={cx("txt")}>Message</p>
            <div className={cx("message")}>{contactValue.message}</div>
          </div>
        </div>
      </div>
      <div className={cx("staff-response")}>
        <div className={cx("header")}>
          <div className={cx("time-response")}>
            {contactValue.updatedAt
              ? standardTime(new Date(contactValue.updatedAt))
              : ""}
          </div>
          <div className={cx("staff-info")}>
            <img src={contactValue.clientId.avatar} />
            <div className={cx("txt-info")}>
              <div className={cx("name")}>{contactValue.staffId?.name}</div>
              <div className={cx("email")}>{contactValue.staffId?.email}</div>
            </div>
          </div>
        </div>
        <hr></hr>
        <div className={cx("body")}>
          <p className={cx("txt")}>Response</p>
          <div className={cx("response-container")}>
            <div className={cx("response")}>{contactValue?.response}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactResponse;
