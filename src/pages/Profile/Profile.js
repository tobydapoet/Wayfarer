import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import UserProfile from "../../components/UserProfile";

const cx = classNames.bind(styles);

const user = JSON.parse(localStorage.getItem("user"));
function Profile() {
  return (
    <div className={cx("wrapper")}>
      <UserProfile data={user} />
    </div>
  );
}

export default Profile;
