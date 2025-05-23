import classNames from "classnames/bind";
import styles from "./BillSearchItem.module.scss";
import { useNavigate } from "react-router-dom";
import images from "../../assets/images";

const cx = classNames.bind(styles);

const statusColors = {
  "Pending Confirmation": "pending",
  Paid: "paid",
  "In Process": "in-process",
  Completed: "completed",
  Cancelled: "cancelled",
  Refunded: "refunded",
  "Pending Refund": "wait-refund",
};

function BillSearchItem({ data }) {
  const navigate = useNavigate();
  const handleRowClick = () => {
    navigate(`/manage/billsmanage/${data._id}`);
  };
  return (
    <div className={cx("wrapper")} onClick={handleRowClick}>
      <div className={cx("user")}>
        <div className={cx("img")}>
          <img
            src={data?.client?.avatar || images.noImg}
            alt={data?.client?.name}
          />
        </div>
        <div className={cx("name")}>{data?.client?.name}</div>
      </div>
      <div className={cx("cost")}>
        ${Number(data.pay).toLocaleString("us-US")}
      </div>
      <div className={cx("title")}>{data?.destination?.name}</div>
      <div className={cx("number")}>{data.num}</div>

      <div className={cx("status")}>
        <div className={cx("status-inner", statusColors[data.status])}>
          {data.status}
        </div>
      </div>
    </div>
  );
}

export default BillSearchItem;
