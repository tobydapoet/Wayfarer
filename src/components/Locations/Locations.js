import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faCar,
  faLocationDot,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Locations.module.scss";
import Button from "../Button";
import { useState } from "react";
import Modal from "../Modal";

const cx = classNames.bind(styles);
function Locations({ data, manage, client }) {
  const [deleteNotice, setDeleteNotice] = useState(false);

  const navigate = useNavigate();

  const handleRowClick = () => {
    navigate(`${data.name}`);
  };

  return (
    <div className={cx("wrapper", { manage })}>
      <img className={cx("img")} src={data.image} />
      <div className={cx("overlay")}>
        <div className={cx("location")}>
          <div className={cx("name", { manage })}>{data.name}</div>
        </div>
        <div className={cx("info")}>
          {data.trips && (
            <div className={cx("trips-container")}>
              <FontAwesomeIcon icon={faLocationDot} />
              <div> {data.trips}</div>
            </div>
          )}
          {data.hotel && (
            <div className={cx("hotel-container")}>
              <FontAwesomeIcon icon={faBed} />
              <div> {data.hotel}</div>
            </div>
          )}
          {data.transport && (
            <div className={cx("transport-container")}>
              <FontAwesomeIcon icon={faCar} />
              <div> {data.transport}</div>
            </div>
          )}
        </div>
      </div>
      {client && (
        <Link
          className={cx("view")}
          to={`/destinations/${data.to.replace(/^\//, "")}`}
        >
          View more
        </Link>
      )}

      {manage && (
        <>
          <div
            className={cx("delete")}
            onClick={(e) => {
              e.stopPropagation();
              setDeleteNotice(true);
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </div>
          <Modal open={deleteNotice} onClose={() => setDeleteNotice(false)}>
            <div className={cx("notice-container")}>
              <div className={cx("notice-content")}>
                Do you want to delete this destination ?
              </div>
              <div className={cx("btn-container")}>
                <Button large>Yes</Button>
                <Button large onClick={() => setDeleteNotice(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </Modal>
          <div className={cx('view')}>
            <Button large className={cx('view-manage')} onClick={handleRowClick}>
              View
            </Button>
            <Button large className={cx('edit-manage')} onClick={handleRowClick}>
              Edit
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default Locations;
