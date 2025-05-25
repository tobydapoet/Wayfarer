import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import UserProfile from "../../components/UserProfile";

const cx = classNames.bind(styles);

function Profile() {
  return (
    <div className={cx("wrapper")}>
      <UserProfile />
    </div>
  );
}
export default Profile;
