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
import Notice from "../Notice";

const cx = classNames.bind(styles);
function Locations({ data: location, manage, client, onEdit, onDelete }) {
  const [deleteNotice, setDeleteNotice] = useState(false);

  const navigate = useNavigate();

  const handleRowClick = () => {
    navigate(`${location.name}`);
  };
  return (
    <div className={cx("wrapper", { manage })}>
      <img className={cx("img")} src={location.image} />
      <div className={cx("overlay")}>
        <div className={cx("location")}>
          <div className={cx("name", { manage })}>{location.name}</div>
        </div>
        <div className={cx("info")}>
          {location.trips && (
            <div className={cx("trips-container")}>
              <FontAwesomeIcon icon={faLocationDot} />
              <div> {location.trips}</div>
            </div>
          )}
          {location.hotel && (
            <div className={cx("hotel-container")}>
              <FontAwesomeIcon icon={faBed} />
              <div> {location.hotel}</div>
            </div>
          )}
          {location.transport && (
            <div className={cx("transport-container")}>
              <FontAwesomeIcon icon={faCar} />
              <div> {location.transport}</div>
            </div>
          )}
        </div>
      </div>
      {client && (
        <Link
          className={cx("view")}
          to={`/destinations/${location.name.replace(/^\//, "")}`}
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
          <div className={cx("view")}>
            <Button
              large
              className={cx("view-manage")}
              onClick={handleRowClick}
            >
              View
            </Button>
            <Button large className={cx("edit-manage")} onClick={onEdit}>
              Edit
            </Button>
          </div>
        </>
      )}
      <Notice
        open={deleteNotice}
        onClose={() => setDeleteNotice(false)}
        content="Do you want to delete this location ?"
        onConfirm={onDelete}
      />
    </div>
  );
}

export default Locations;
