import classNames from "classnames/bind";
import Input from "../../components/Input";
import styles from "./Contact.module.scss";
import Button from "../../components/Button";
import useForm from "../../hooks/useForm";

const cx = classNames.bind(styles);

function Contact() {
  const [inputValue, handleValue, resetValue] = useForm({
    email: "",
    name: "",
    subject: "",
    message: "",
  });
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("title")}>GET IN TOUCH</div>
        <div className={cx("content")}>
          <div className={cx("info")}>
            <Input
              dark
              placeholder="Name"
              className={cx("name")}
              value={inputValue.name}
              onChange={handleValue}
              name="name"
            />

            <Input
              dark
              placeholder="Email"
              className={cx("email")}
              value={inputValue.email}
              onChange={handleValue}
              name="email"
            />
          </div>

          <Input
            dark
            placeholder="Subject"
            className={cx("subject")}
            value={inputValue.subject}
            onChange={handleValue}
            name="subject"
          />

          <Input
            dark
            placeholder="Message"
            className={cx("message")}
            name="message"
            textarea
            value={inputValue.message}
            onChange={handleValue}
          />

          <Button large className={cx("send-btn")}>
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
    </div>
  );
}

export default Contact;
