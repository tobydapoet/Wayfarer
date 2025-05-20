import classNames from "classnames/bind";
import Input from "../../components/Input";
import styles from "./Contact.module.scss";
import Button from "../../components/Button";
import { useContext, useState } from "react";
import { ContactContext } from "../../contexts/ContactContext";
import Notice from "../../components/Notice";
import { getCurrentUser } from "../../utils/currentUser";

const cx = classNames.bind(styles);

function Contact() {
  const {
    contactValue,
    errors,
    notice,
    handleInputChange,
    handlePreventMessage,
    setNotice,
  } = useContext(ContactContext);

  const user = getCurrentUser();

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("title-page")}>GET IN TOUCH</div>
        <div className={cx("content")}>
          <div className={cx("info")}>
            <Input
              dark
              placeholder="Name"
              className={cx("name")}
              value={user?.name}
              name="name"
            />

            <Input
              dark
              placeholder="Email"
              className={cx("email")}
              value={user?.email}
              name="email"
            />
          </div>

          <Input
            dark
            placeholder="Title"
            className={cx("title")}
            value={contactValue.title}
            onChange={handleInputChange}
            name="title"
            error={errors.title}
          />

          <Input
            dark
            placeholder="Message"
            className={cx("message")}
            name="message"
            textarea
            value={contactValue.message}
            onChange={handleInputChange}
            error={errors.message}
          />

          <Button
            large
            className={cx("send-btn")}
            onClick={() => handlePreventMessage()}
          >
            Send message
          </Button>
        </div>
      </div>
      <div className={cx("img-container")}>
        <img
          src="https://images.saymedia-content.com/.image/t_share/MTc1MDEzMzE2MjE2MzY2ODkx/bon-voyage-messages-have-a-safe-trip-wishes.jpg"
          className={cx("image")}
        />
      </div>
      <Notice
        content="You are not client!"
        warn
        open={notice}
        onClose={() => setNotice(false)}
      />
    </div>
  );
}

export default Contact;
