import classNames from "classnames/bind";
import styles from "./BillsManage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../../../components/SearchBar";
import Order from "../../../components/Order";
import { use, useState } from "react";
import BillForm from "../../../components/BillForm";
import Modal from "../../../components/Modal";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

const ORDERS = [
  {
    id: 0,
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFAz7TV79RYxtJu5RScxRax-OljYqpIKqPxw&s",
    client: "Davis Astee3",
    total: "2020",
    service: "Temple of Literature1",
    status: 4,
    payType: "Paypal",
    dateStart: "2025-05-03",
    dateEnd: "2025-05-05",
    number: 3,
    type: 0,
  },
  {
    id: 1,
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFAz7TV79RYxtJu5RScxRax-OljYqpIKqPxw&s",
    client: "Davis Astee3",
    total: "2020",
    service: "Temple of Literature1",
    status: 4,
    payType: "Paypal",
    dateStart: "2025-05-03",
    dateEnd: "2025-05-05",
    number: 3,
    type: 2,
  },
  {
    id: 1,
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFAz7TV79RYxtJu5RScxRax-OljYqpIKqPxw&s",
    client: "Davis Astee3",
    total: "2020",
    service: "Temple of Literature1",
    status: 4,
    payType: "Paypal",
    dateStart: "2025-05-03",
    dateEnd: "2025-05-05",
    number: 3,
    type: 2,
  },
  {
    id: 3,
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFAz7TV79RYxtJu5RScxRax-OljYqpIKqPxw&s",
    client: "Davis Astee3",
    total: "2020",
    service: "Temple of Literature1",
    status: 4,
    payType: "Paypal",
    dateStart: "2025-05-03",
    dateEnd: "2025-05-05",
    number: 3,
    type: 1,
  },
  {
    id: 4,
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFAz7TV79RYxtJu5RScxRax-OljYqpIKqPxw&s",
    client: "Davis Astee3",
    total: "2020",
    service: "Temple of Literature1",
    status: 4,
    payType: "Paypal",
    dateStart: "2025-05-03",
    dateEnd: "2025-05-05",
    number: 3,
    type: 2,
  },
  {
    id: 5,
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFAz7TV79RYxtJu5RScxRax-OljYqpIKqPxw&s",
    client: "Davis Astee3",
    total: "2020",
    service: "Temple of Literature1",
    status: 4,
    payType: "Paypal",
    dateStart: "2025-05-03",
    dateEnd: "2025-05-05",
    number: 3,
    type: 0,
  },
  {
    id: 6,
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFAz7TV79RYxtJu5RScxRax-OljYqpIKqPxw&s",
    client: "Davis Astee3",
    total: "2020",
    service: "Temple of Literature1",
    status: 4,
    payType: "Paypal",
    dateStart: "2025-05-03",
    dateEnd: "2025-05-05",
    number: 3,
    type: 2,
  },
  {
    id: 7,
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFAz7TV79RYxtJu5RScxRax-OljYqpIKqPxw&s",
    client: "Davis Astee3",
    total: "2020",
    service: "Temple of Literature1",
    status: 4,
    payType: "Paypal",
    dateStart: "2025-05-03",
    dateEnd: "2025-05-05",
    number: 3,
    type: 2,
  },
  {
    id: 8,
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFAz7TV79RYxtJu5RScxRax-OljYqpIKqPxw&s",
    client: "Davis Astee3",
    total: "2020",
    service: "Temple of Literature1",
    status: 4,
    payType: "Paypal",
    dateStart: "2025-05-03",
    dateEnd: "2025-05-05",
    number: 3,
    type: 2,
  },

  {
    id: 9,
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFAz7TV79RYxtJu5RScxRax-OljYqpIKqPxw&s",
    client: "Davis Astee3",
    total: "2020",
    service: "Temple of Literature1",
    status: 4,
    payType: "Paypal",
    dateStart: "2025-05-03",
    dateEnd: "2025-05-05",
    number: 3,
    type: 1,
  },
];

function BillsManage() {
  const [billSelected, setBillSelected] = useState(null);
  const [editBill, setEditBill] = useState(false);
  const [addBill, setAddBill] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("header")}>
          <SearchBar />
          <div
            className={cx("add")}
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/manage/billsmanage/add_content`)}
          >
            <FontAwesomeIcon icon={faPlus} />
          </div>
        </div>
        <table className={cx("guests-list")}>
          <thead className={cx("header-table")}>
            <tr>
              <th className={cx("client")}>Client</th>
              <th className={cx("cost")}>Cost</th>
              <th className={cx("service")}>Service</th>
              <th className={cx("start")}>Start</th>
              <th className={cx("status")}>Status</th>
              <th className={cx("function")}></th>
            </tr>
          </thead>
          <tbody>
            {ORDERS.map((client, index) => (
              <Order extent data={client} key={index} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default BillsManage;
