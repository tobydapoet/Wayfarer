import classNames from "classnames/bind";
import styles from "./Clients.module.scss";
import SearchBar from "../../../../components/SearchBar";
import ClientItem from "../../../../components/ClientItem/ClientItem";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <SearchBar />
        <div
          className={cx("add")}
          style={{ cursor: "pointer" }}
          onClick={() => navigate("add_content")}
        >
          <FontAwesomeIcon icon={faPlus} />
        </div>
      </div>
      <table className={cx("guests-list")}>
        <thead>
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
