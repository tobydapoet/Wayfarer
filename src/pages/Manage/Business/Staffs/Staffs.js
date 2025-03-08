import classNames from "classnames/bind";
import styles from "./Staffs.module.scss";
import StaffItem from "../../../../components/StaffItem";

const cx = classNames.bind(styles);

const STAFFS = [
  {
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFAz7TV79RYxtJu5RScxRax-OljYqpIKqPxw&s",
    name: "Davis Astee",
    status: 0,
    location: "Bắc Sơn, Thị trấn Chúc Sơn, Chương Mỹ District, Hà Nội, 13400, Vietnam",
    salary: "1500",
    start: "00:00:00",
  },
  {
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFAz7TV79RYxtJu5RScxRax-OljYqpIKqPxw&s",
    name: "Davis Astee",
    status: 2,
    location: "Myitkyina Township, Myitkyina District, Kachin State, Myanmar",
    salary: "1500",
    start: "00:00:00",
  },
  {
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFAz7TV79RYxtJu5RScxRax-OljYqpIKqPxw&s",
    name: "Davis Astee",
    status: 0,
    location: "Bắc Sơn, Thị trấn Chúc Sơn, Chương Mỹ District, Hà Nội, 13400, Vietnam",
    salary: "1500",
    start: "00:00:00",
  },
  {
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFAz7TV79RYxtJu5RScxRax-OljYqpIKqPxw&s",
    name: "Davis Astee",
    status: 1,
    location: "Sangsu, Koloriang, Koloriang HQ, Kurung Kumey, Arunachal Pradesh, India",
    salary: "1500",
    start: "00:00:00",
  },
  {
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFAz7TV79RYxtJu5RScxRax-OljYqpIKqPxw&s",
    name: "Davis Astee",
    status: 3,
    location: "Bắc Sơn, Thị trấn Chúc Sơn, Chương Mỹ District, Hà Nội, 13400, Vietnam",
    salary: "1500",
    start: "00:00:00",
  },
  {
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFAz7TV79RYxtJu5RScxRax-OljYqpIKqPxw&s",
    name: "Davis Astee",
    status: 0,
    location: "Nakha, Xam Neua District, Houaphanh, Lào",
    salary: "1500",
    start: "00:00:00",
  },
  {
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFAz7TV79RYxtJu5RScxRax-OljYqpIKqPxw&s",
    name: "Davis Astee",
    status: 2,
    location: "Непское сельское поселение, Katangsky Rayon, Irkutsk Oblast, Siberian Federal District, Russia",
    salary: "1500",
    start: "00:00:00",
  },
  {
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFAz7TV79RYxtJu5RScxRax-OljYqpIKqPxw&s",
    name: "Davis Astee",
    status: 0,
    location: "Chemin du Lac-Pike, Low, La Vallée-de-la-Gatineau, Outaouais, Quebec, Canada",
    salary: "1500",
    start: "00:00:00",
  },
  {
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFAz7TV79RYxtJu5RScxRax-OljYqpIKqPxw&s",
    name: "Davis Astee",
    status: 1,
    location: "Bắc Sơn, Thị trấn Chúc Sơn, Chương Mỹ District, Hà Nội, 13400, Vietnam",
    salary: "1500",
    start: "00:00:00",
  },
  {
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFAz7TV79RYxtJu5RScxRax-OljYqpIKqPxw&s",
    name: "Davis Astee",
    status: 3,
    location: "Bắc Sơn, Thị trấn Chúc Sơn, Chương Mỹ District, Hà Nội, 13400, Vietnam",
    salary: "1500",
    start: "00:00:00",
  },
  {
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFAz7TV79RYxtJu5RScxRax-OljYqpIKqPxw&s",
    name: "Davis Astee",
    status: 1,
    location: "Bắc Sơn, Thị trấn Chúc Sơn, Chương Mỹ District, Hà Nội, 13400, Vietnam",
    salary: "1500",
    start: "00:00:00",
  },
  {
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFAz7TV79RYxtJu5RScxRax-OljYqpIKqPxw&s",
    name: "Davis Astee",
    status: 3,
    location: "Bắc Sơn, Thị trấn Chúc Sơn, Chương Mỹ District, Hà Nội, 13400, Vietnam",
    salary: "1500",
    start: "00:00:00",
  },
];
function Staffs() {
  return (
    <div className={cx("wrapper")}>
      <table>
        <thead className={cx("header")}>
          <tr>
            <th className={cx("name-header")}>Name</th>
            <th className={cx("location")}>Location</th>
            <th className={cx("salary")}>Salary</th>
            <th className={cx("start")}>Start</th>
            <th className={cx("status")}>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {STAFFS.map((staff, index) => (
            <StaffItem key={index} data={staff} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Staffs;
