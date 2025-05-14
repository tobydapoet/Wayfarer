import classNames from "classnames/bind";
import styles from "./BillsManage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../../../components/SearchBar";
import Order from "../../../components/Order";
import { use, useContext, useState } from "react";
import BillForm from "../../../components/BillForm";
import Modal from "../../../components/Modal";
import { useNavigate } from "react-router-dom";
import { BillContext } from "../../../contexts/BillContext";

const cx = classNames.bind(styles);

function BillsManage() {
  const navigate = useNavigate();
  const { allBills, handleDeleteBill } = useContext(BillContext);

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
              <th className={cx("number")}>Number</th>
              <th className={cx("status")}>Status</th>
              <th className={cx("function")}></th>
            </tr>
          </thead>
          <tbody>
            {allBills.map((bill) => (
              <Order
                extent
                data={bill}
                key={bill._id}
                onDelete={() => {
                  console.log(bill._id);
                  handleDeleteBill(bill._id);
                }}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default BillsManage;
