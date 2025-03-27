import classNames from "classnames/bind";
import Input from "../../components/Input";
import styles from "./Contact.module.scss";
import Button from "../../components/Button";
import useForm from "../../hooks/useForm";
import { useState } from "react";

const cx = classNames.bind(styles);

function Contact() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [contactValue, setContactValue] = useForm({
    email: user.email,
    name: user.name,
    subject: "",
    message: "",
  });
  const [tempConctactValue, setTempContactValue] = useState({
    ...contactValue,
  });
  const [errors, setErrors] = useState({});

  const validateInput = (name, value) => {
    const newErrors = {};
    switch (name) {
      case "name": {
        if (!value.trim()) {
          newErrors.name = "Name cannot empty!";
        }
        break;
      }
      case "email": {
        if (!value.trim()) {
          newErrors.email = "Email cannot empty!";
        } else if (
          !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value
          )
        ) {
          newErrors.email = "Wrong format";
        }
        break;
      }
      case "subject": {
        if (!value.trim()) {
          newErrors.subject = "Subject cannot empty!";
        }
        break;
      }
      case "message": {
        if (!value.trim()) {
          newErrors.message = "Message cannot empty!";
        }
        break;
      }
    }
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newErrors = validateInput(name, value);
    setErrors((prevErrors) => {
      const updatedErrors = { ...newErrors, ...prevErrors };

      if (!newErrors[name]) {
        delete updatedErrors[name];
      }

      return updatedErrors;
    });

    setTempContactValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleOnSave = (e) => {
    const newErrors = {};
    Object.entries(tempConctactValue).forEach(([name, value]) => {
      const fieldErros = validateInput(name, value);
      Object.assign(newErrors, fieldErros);
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setContactValue({ ...tempConctactValue });
  };

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
              value={tempConctactValue.name}
              onChange={handleInputChange}
              name="name"
              error={errors.name}
            />

            <Input
              dark
              placeholder="Email"
              className={cx("email")}
              value={tempConctactValue.email}
              onChange={handleInputChange}
              name="email"
              error={errors.email}
            />
          </div>

          <Input
            dark
            placeholder="Subject"
            className={cx("subject")}
            value={tempConctactValue.subject}
            onChange={handleInputChange}
            name="subject"
            error={errors.subject}
          />

          <Input
            dark
            placeholder="Message"
            className={cx("message")}
            name="message"
            textarea
            value={tempConctactValue.message}
            onChange={handleInputChange}
            error={errors.message}
          />

          <Button large className={cx("send-btn")} onClick={() => handleOnSave()}>
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
