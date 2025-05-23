import classNames from "classnames/bind";
import styles from "./Navbar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleUp,
  faBars,
  faBell,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../../routes/routes";
import Button from "../Button";
import images from "../../assets/images";
import Modal from "../Modal";
import { useContext, useState } from "react";
import Input from "../Input";
import AccountItem from "../AccountItem/AccountItem";
import { AccountContext } from "../../contexts/AccountContext";
import { toast } from "react-toastify";
import { getCurrentUser } from "../../utils/currentUser";
import NotifyBell from "../NotifyBell";

const cx = classNames.bind(styles);

const user = getCurrentUser();

function Navbar() {
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);
  const [shrinkMenu, setShrinkMeu] = useState(false);

  const {
    user,
    successMessage,
    dataLogin,
    dataRegister,
    setSavedPassword,
    changeLogin,
    changeRegister,
    checkLogin,
    checkRegister,
    resetLoginData,
    resetRegisterData,
    errors,
  } = useContext(AccountContext);

  const handleCLearLogin = () => {
    setIsOpenLogin(false);
    resetLoginData();
  };

  const handleCLearRegister = () => {
    setIsOpenRegister(false);
    resetRegisterData();
  };
  const navigate = useNavigate();

  return (
    <header className={cx("wrapper")}>
      <Link to={"/"} className={cx("logo-link")}>
        <img src={images.logoDark} alt="Logo" />
      </Link>

      <div className={cx("btn-ffc")}>
        {user && !user.position && <NotifyBell />}
        <button
          className={cx("menu-btn")}
          onClick={() => setShrinkMeu(!shrinkMenu)}
        >
          {shrinkMenu ? (
            <FontAwesomeIcon icon={faAngleUp} />
          ) : (
            <FontAwesomeIcon icon={faBars} />
          )}
        </button>
      </div>
      <div className={cx("inner", { open: shrinkMenu })}>
        {(user && user.position && user.status != "quit"
          ? privateRoutes
          : publicRoutes
        ).map((route, index) => {
          if (route.layout === undefined || route.layout === false) {
            return route.topic ? (
              <Link
                key={index}
                className={cx("middle-btn")}
                to={route.path}
                onClick={() => setShrinkMeu(false)}
              >
                {route.topic}
              </Link>
            ) : null;
          }
          return null;
        })}
        <hr className={cx("divider")} />
        {user ? (
          <div className={cx("to-user-shrink", { open: shrinkMenu })}>
            <AccountItem data={user} />
          </div>
        ) : (
          <div className={cx("to-user-shrink", { open: shrinkMenu })}>
            <div className={cx("login-btn")}>
              <Button nav onClick={() => setIsOpenLogin(true)}>
                Login
              </Button>
            </div>
            <div className={cx("register-btn")}>
              <Button nav onClick={() => setIsOpenRegister(true)}>
                Register
              </Button>
            </div>
          </div>
        )}
      </div>

      {user ? (
        <div className={cx("to-user", { open: shrinkMenu })}>
          {user && !user.position && <NotifyBell />}
          <div className={cx("user")}>
            <AccountItem data={user} />
          </div>
        </div>
      ) : (
        <div className={cx("to-user", { open: shrinkMenu })}>
          <Button nav onClick={() => setIsOpenLogin(true)}>
            Login
          </Button>
          <Button nav onClick={() => setIsOpenRegister(true)}>
            Register
          </Button>
        </div>
      )}

      <Modal open={isOpenLogin} onClose={() => handleCLearLogin()}>
        <div className={cx("modal-title")}>Login</div>
        <FontAwesomeIcon
          className={cx("xmark")}
          icon={faXmark}
          onClick={() => handleCLearLogin()}
        />
        <Input
          light
          placeholder="Email"
          name="email"
          value={dataLogin.email}
          onChange={changeLogin}
          email
        />

        <Input
          light
          placeholder="Password"
          name="password"
          value={dataLogin.password}
          onChange={changeLogin}
          type="password"
        />
        <div className={cx("save-forgot-wrapper")}>
          <div className={cx("save-pass")}>
            <input
              type="checkbox"
              className={cx("save-btn")}
              onClick={() => setSavedPassword(true)}
            />
            <div>Save your password</div>
          </div>
          <div
            className={cx("forgot-pass")}
            onClick={() => {
              navigate(`/indentify`);
              setIsOpenLogin(false);
            }}
          >
            Forgot password?
          </div>
        </div>
        <div className={cx("btn-wrapper")}>
          <Button large className={cx("login-btn")} onClick={checkLogin}>
            Login
          </Button>
        </div>
      </Modal>

      <Modal open={isOpenRegister} onClose={() => handleCLearRegister()}>
        <div className={cx("modal-title")}>Register</div>

        <FontAwesomeIcon
          className={cx("xmark")}
          icon={faXmark}
          onClick={() => handleCLearRegister()}
        />

        <Input
          light
          placeholder="Username"
          name="name"
          value={dataRegister.name}
          onChange={changeRegister}
          error={errors.name}
        />

        <Input
          light
          placeholder="Email"
          name="email"
          value={dataRegister.email}
          onChange={changeRegister}
          error={errors.email}
        />
        <Input
          light
          placeholder="Password"
          name="password"
          value={dataRegister.password}
          onChange={changeRegister}
          error={errors.password}
          type="password"
        />
        <Input
          light
          placeholder="Enter your password"
          name="repassword"
          value={dataRegister.repassword}
          onChange={changeRegister}
          error={errors.repassword}
          type="password"
        />

        <div className={cx("btn-wrapper")}>
          <Button large className={cx("register-btn")} onClick={checkRegister}>
            Register
          </Button>
          <div className={cx("space-middle")}>
            <span>Or</span>
          </div>
          <div className={cx("social-register")}>
            <Button
              large
              email
              leftIcon={<FontAwesomeIcon icon={faGoogle} />}
              className={cx("email-btn")}
            >
              Email
            </Button>
            <Button
              facebook
              large
              leftIcon={<FontAwesomeIcon icon={faFacebook} />}
              className={cx("facebook-btn")}
            >
              Facebook
            </Button>
          </div>
        </div>
      </Modal>

      {successMessage && toast.success({ successMessage })}
    </header>
  );
}

export default Navbar;
