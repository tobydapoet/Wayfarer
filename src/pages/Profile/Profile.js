import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import UserProfile from "../../components/UserProfile";
import { StaffProvider } from "../../contexts/StaffContext";
import { ClientProvider } from "../../contexts/ClientContext";
import { getCurrentUser } from "../../utils/currentUser";

const cx = classNames.bind(styles);

const user = getCurrentUser();

const isStaff = !!user?.position;

const Wrapper = isStaff ? StaffProvider : ClientProvider;

function Profile() {
  return (
    <div className={cx("wrapper")}>
      <Wrapper data={user}>
        <UserProfile />
      </Wrapper>
    </div>
  );
}
export default Profile;
