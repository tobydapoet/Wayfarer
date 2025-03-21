import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import UserProfile from "../../components/UserProfile";

const cx = classNames.bind(styles);

const userInfo = {
  name: "Nguyen Viet Tung",
  email: "Cat@gmail.com",
  password: "1234567",
  avatar:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFAz7TV79RYxtJu5RScxRax-OljYqpIKqPxw&s",
  position: "manager",

  birth: "2004-10-29",
  phone: "0348349754",
  location:
    "Непское сельское поселение, Katangsky Rayon, Irkutsk Oblast, Siberian Federal District, Russia",
};
localStorage.setItem("user", JSON.stringify(userInfo))
function Profile() {
  return (
    <div className={cx("wrapper")}>
      <UserProfile data={userInfo} />
    </div>
  );
}

export default Profile;
