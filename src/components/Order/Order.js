import classNames from "classnames/bind";
import {Link} from 'react-router-dom'
import styles from "./Order.module.scss";


const cx = classNames.bind(styles);

function Order({data}) {

    const tour = { ...data };
    const status = {
      0: "Pending Confirmation",
      1: "Confirmed",
      2: "Payment Pending",
      3: "Paid",
      4: "Checked In ",
      5: "Completed",
      6: "Cancelled",
      7: "No Show",
      8: "Refunded",
    };

    const statusColors = {
        0: "pending",
        1: "confirmed",
        2: "payment-pending",
        3: "paid",
        4: "checked-in",
        5: "completed",
        6: "cancelled",
        7: "no-show",
        8: "refunded",
      };
  
      function getStatus(type, code) {
        if (code === 4) {
          if (type === "trips") return "On Trip";
          if (type === "hotels") return "Checked In";
          if (type === "transports") return "Rented";
        }
        return status[code] || "Unknown Status";
      }

  return <Link to={'/'} className={cx("wrapper")}>
    <div className={cx('user')}>
        <img src={data.avatar} alt={data.name} />
        <div className={cx('name')}>{data.name}</div>
    </div>
    <div className={cx('cost')}>${data.cost}</div>
    <div className={cx("status", statusColors[data.status])}>{getStatus(tour.type, tour.status)}</div>
    <div className={cx('time')}>{data.time}</div>

  </Link>;
}

export default Order;
