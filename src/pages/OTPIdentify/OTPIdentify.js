import classNames from "classnames/bind";
import styles from "./OTPIdentify.module.scss";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useParams } from "react-router-dom";
import { UserOTPContext } from "../../contexts/UserOTPContext";
import { useContext } from "react";

const cx = classNames.bind(styles);

function OTPIdentify() {
  const { email } = useParams();
  const { userVerify, setUserVerify, handleverifyOTP } =
    useContext(UserOTPContext);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("content")}>
        <div className={cx("title")}>Enter security code</div>
        <div className={cx("body")}>
          <div className={cx("message")}>
            Please check email {email} with to get code
          </div>
          <Input
            dark
            value={userVerify.resetOtp}
            frame="OTP"
            onChange={(e) =>
              setUserVerify((prev) => ({ ...prev, resetOtp: e.target.value }))
            }
          />
        </div>
        <div className={cx("btn-container")}>
          <Button rounded onClick={() => handleverifyOTP()}>
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}

export default OTPIdentify;
