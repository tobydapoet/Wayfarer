import classNames from "classnames/bind";
import styles from "./ForgetPassword.module.scss";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useContext } from "react";
import { UserOTPContext } from "../../contexts/UserOTPContext";

const cx = classNames.bind(styles);

function ForgetPassword() {
  const { userVerify, setUserVerify, handleCreateOTP } =
    useContext(UserOTPContext);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("content")}>
        <div className={cx("title")}>Find your account</div>
        <div className={cx("body")}>
          <div className={cx("message")}>
            Please enter your email address to search for your account.
          </div>
          <Input
            dark
            frame="Email"
            value={userVerify.email}
            onChange={(e) =>
              setUserVerify((prev) => ({ ...prev, email: e.target.value }))
            }
          />
        </div>
        <div className={cx("btn-container")}>
          <Button rounded onClick={() => handleCreateOTP()}>
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
