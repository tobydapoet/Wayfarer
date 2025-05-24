import classNames from "classnames/bind";
import styles from "./ResetPassword.module.scss";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { AccountContext } from "../../contexts/AccountContext";
import { useContext, useEffect } from "react";
import { StaffContext } from "../../contexts/StaffContext";
import { ClientContext } from "../../contexts/ClientContext";
import { useNavigate, useParams } from "react-router-dom";

const cx = classNames.bind(styles);

function ResetPassword() {
  const { email } = useParams();
  const navigate = useNavigate();

  const {
    clientData,
    clientErrors,
    handleChangeClientInput,
    handleOnSaveClient,
    handleSelectedClient,
  } = useContext(ClientContext);

  const {
    staffData,
    staffErrors,
    handleChangeStaffInput,
    handleOnSaveStaff,
    handleSelectedStaff,
  } = useContext(StaffContext);

  const isStaff = !!staffData?.position;

  const formData = isStaff ? staffData : clientData;
  const errors = isStaff ? staffErrors : clientErrors;
  const handleChangeInput = isStaff
    ? handleChangeStaffInput
    : handleChangeClientInput;
  const handleOnSave = isStaff ? handleOnSaveStaff : handleOnSaveClient;
  const handleSelected = isStaff ? handleSelectedStaff : handleSelectedClient;

  useEffect(() => {
    if (email) {
      handleSelected(email);
    }
  }, [email]);

  console.log(formData);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("content")}>
        <div className={cx("title")}>Enter security code</div>
        <div className={cx("body")}>
          <Input
            dark
            frame="Password"
            name="password"
            onChange={handleChangeInput}
            // value={formData.password}
            error={errors.password}
            type="password"
          />
          <Input
            dark
            frame="Enter your password"
            name="repassword"
            onChange={handleChangeInput}
            // value={formData.repassword}
            error={errors.repassword}
            type="password"
          />
        </div>
        <div className={cx("btn-container")}>
          <Button
            rounded
            onClick={() => {
              handleOnSave(formData._id, formData);
              navigate(`/`);
            }}
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
