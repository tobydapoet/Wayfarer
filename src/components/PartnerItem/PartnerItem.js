import classNames from "classnames/bind";
import styles from "./PartnerItem.module.scss";
import { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Notice from "../Notice";

const cx = classNames.bind(styles);

function PartnerItem({ data, onClick }) {
  const [deleteNotice, setDeleteNotice] = useState(false);

  const CONTRACT_STATUS = {
    0: "Active",
    1: "Expring soon",
    2: "Expired",
    3: "Canceled",
  };
  const updateStatus = useMemo(() => {
    const today = new Date();
    const endDate = new Date(data.endDate);
    console.log(endDate);
    if (endDate < today) {
      return 2;
    } else if ((endDate - today) / (1000 * 60 * 60 * 24) <= 30) {
      return 1;
    }
    return 0;
  }, [data.endDate]);
  console.log(data.endDate);
  return (
    <>
      <div className={cx("wrapper")} onClick={onClick}>
        <div className={cx("img-container")}>
          <img src={data.logo} />
        </div>
        <div className={cx("content-container")}>
          <div className={cx("name")}>{data.name}</div>
          <div className={cx("start")}>
            Start: {new Date(data.startDate).toLocaleDateString("en-US")}
          </div>
          <div className={cx("end")}>
            Finish: {new Date(data.endDate).toLocaleDateString("en-US")}
          </div>
          <div className={cx("status", `status-${updateStatus}`)}>
            Status : {CONTRACT_STATUS[updateStatus]}
          </div>
        </div>
        {updateStatus > 1 && (
          <div
            className={cx("delete")}
            onClick={(e) => {
              e.stopPropagation();
              setDeleteNotice(true);
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </div>
        )}
      </div>
      <Notice
        open={deleteNotice}
        onClose={() => setDeleteNotice(false)}
        content="Do you want to delete this contract ?"
      />
    </>
  );
}

export default PartnerItem;
