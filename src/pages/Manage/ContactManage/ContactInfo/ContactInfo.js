import classNames from "classnames/bind";
import styles from "./ContactInfo.module.scss";
import { useContext } from "react";
import { ContactContext } from "../../../../contexts/ContactContext";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";

const cx = classNames.bind(styles);

function ContactInfo() {
  const { contactValue, handleInputChange, errors, handleUpdateContact } =
    useContext(ContactContext);
  const timeContact = new Date(contactValue.createdAt);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <div className={cx("client-info")}>
          <img src={contactValue.clientId.avatar} />
          <div className={cx("txt-info")}>
            <div className={cx("name")}>{contactValue.clientId.name}</div>
            <div className={cx("email")}>{contactValue.clientId.email}</div>
          </div>
        </div>
        <div className={cx("time-create")}>
          {timeContact.toLocaleDateString()}
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

        {contactValue.staffId && (
          <div className={cx("staff-info")}>
            <img src={contactValue.clientId.avatar} />
            <div className={cx("txt-info")}>
              <div className={cx("name")}>{contactValue.staffId.name}</div>
              <div className={cx("email")}>{contactValue.staffId.email}</div>
            </div>
          </div>
        )}
        {contactValue.staffId && <hr></hr>}
        <p className={cx("txt")}>Response</p>
        <div className={cx("response-container")}>
          <Input
            textarea
            dark
            name="response"
            placeholder="Response..."
            className={cx("response")}
            value={contactValue?.response}
            maxLength={2000}
            onChange={handleInputChange}
            error={errors.response}
          />
        </div>
      </div>
      <div className={cx("btn-container")}>
        <Button rounded onClick={() => handleUpdateContact()}>
          Save
        </Button>
      </div>
    </div>
  );
}

export default ContactInfo;
