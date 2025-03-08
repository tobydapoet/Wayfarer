import classNames from "classnames/bind";
import styles from "./Clients.module.scss";
import SearchBar from "../../../../components/SearchBar";
import ClientItem from "../../../../components/ClientItem/ClientItem";

const cx = classNames.bind(styles);

const CLIENTS = [
  {
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFAz7TV79RYxtJu5RScxRax-OljYqpIKqPxw&s",
    name: "Davis Astee ",
    email: "davis@gmail.com",
    phone: "0348349754",
    location:
      "Chemin du Lac-Pike, Low, La Vallée-de-la-Gatineau, Outaouais, Quebec, Canada",
  },
  {
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFAz7TV79RYxtJu5RScxRax-OljYqpIKqPxw&s",
    name: "Davis Astee",
    email: "davis@gmail.com",
    phone: "0348349754",
    location:
      "Chemin du Lac-Pike, Low, La Vallée-de-la-Gatineau, Outaouais, Quebec, Canada",
  },
  {
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFAz7TV79RYxtJu5RScxRax-OljYqpIKqPxw&s",
    name: "Davis Astee",
    email: "davis@gmail.com",
    phone: "0348349754",
    location:
      "Chemin du Lac-Pike, Low, La Vallée-de-la-Gatineau, Outaouais, Quebec, Canada",
  },
  {
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFAz7TV79RYxtJu5RScxRax-OljYqpIKqPxw&s",
    name: "Davis Astee",
    email: "davis@gmail.com",
    phone: "0348349754",
    location:
      "Chemin du Lac-Pike, Low, La Vallée-de-la-Gatineau, Outaouais, Quebec, Canada",
  },
  {
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFAz7TV79RYxtJu5RScxRax-OljYqpIKqPxw&s",
    name: "Davis Astee",
    email: "davis@gmail.com",
    phone: "0348349754",
    location:
      "Chemin du Lac-Pike, Low, La Vallée-de-la-Gatineau, Outaouais, Quebec, Canada",
  },
];


function Clients() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("searchbar-container")}>
        <SearchBar />
      </div>
      <table className={cx("guests-list")}>
        <thead className={cx("header")}>
          <tr>
            <th className={cx("name-header")}>Name</th>
            <th className={cx("location")}>Location</th>
            <th className={cx("email")}>Email</th>
            <th className={cx("phone")}>Phone</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {CLIENTS.map((client, index) => (
            <ClientItem data={client} key={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Clients;
