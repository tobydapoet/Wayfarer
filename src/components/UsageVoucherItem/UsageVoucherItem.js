import classNames from "classnames/bind";
import styles from "./UsageVoucherItem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import images from "../../assets/images";

const cx = classNames.bind(styles);

function UsageVoucherItem({ data, onCheck, checked }) {
  return (
    <tr className={cx("wrapper")} style={{ cursor: "pointer" }}>
      <td className={cx("info")}>
        <div className={cx("img")}>
          <img
            src={data.clientId.avatar || data.client.avatar || images.noImg}
            alt={data.clientId?.name || data.client.name}
          />
        </div>
        <div className={cx("name")}>
          {data.clientId.name || data.client.name}
        </div>
      </td>
      <td className={cx("voucher")}>
        {data.voucherId?.name || data.voucher.name}
      </td>
      <td className={cx("received")}>
        {new Date(data.receivedAt).toLocaleString(undefined, {
          dateStyle: "short",
          timeStyle: "short",
        })}
      </td>
      <td className={cx("expired")}>
        {new Date(data.expiredAt).toLocaleString(undefined, {
          dateStyle: "short",
          timeStyle: "short",
        })}
      </td>
      <td className={cx("used")}>
        {data.usedAt
          ? new Date(data.usedAt).toLocaleString(undefined, {
              dateStyle: "short",
              timeStyle: "short",
            })
          : "null"}
      </td>

      <td className={cx("delete")}>
        <input type="checkbox" checked={checked} onChange={onCheck} />
      </td>
    </tr>
  );
}

export default UsageVoucherItem;
