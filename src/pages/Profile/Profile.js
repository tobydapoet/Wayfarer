import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import UserProfile from "../../components/UserProfile";
import { StaffProvider } from "../../contexts/StaffContext";
import { ClientProvider } from "../../contexts/ClientContext";

const cx = classNames.bind(styles);

const user = JSON.parse(localStorage.getItem("user"));
const isStaff = !!user?.position;

const Wrapper = isStaff ? StaffProvider : ClientProvider;

function Profile() {
  return (
    <div className={cx("wrapper")}>
      <Wrapper data={user}>
        <ClientProvider data={user}>
          <UserProfile />
        </ClientProvider>
      </Wrapper>
    </div>
  );
}

export default Profile;
