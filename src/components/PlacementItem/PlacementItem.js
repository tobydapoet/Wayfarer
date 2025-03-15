import classNames from "classnames/bind";
import styles from "./PlacementItem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../Modal";
import Button from "../Button";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import StarRating from "../../utils/StartRating";

const cx = classNames.bind(styles);

function PlacementItem({ type, data, manage, client }) {
  const contentMap = {
    trips: {
      ...data,
      activities: data.activities ? data.activities.split(",") : [],
    },

    hotels: {
      ...data,
      activities: data.activities ? data.activities.split(",") : [],
    },

    transports: { ...data ,  activities: data.activities ? data.activities.split(",") : [],},
  };
  const content = contentMap[type] || {};

  const [deleteNotice, setDeleteNotice] = useState(false);

  const navigate = useNavigate();

  const handleRowClick = () => {
    navigate(`${data.name}`);
  };

  const getRandomPastelColor = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 90%, 50%)`;
  };
  const randomColor = getRandomPastelColor();

  return (
    <div className={cx("wrapper")}>
      {content && (
        <div className={cx("container", { manage })}>
          <img src={content.img} className={cx({ manage })} />
          <div className={cx("content")}>
            <div className={cx("header")}>
              <div className={cx("name", { manage })}>{content.name}</div>
              <div
                className={cx("price", { manage })}
              >{`$${content.price}`}</div>
            </div>
            <div className={cx("star")}>
              <StarRating rating={content.star} />
            </div>
            <div className={cx("description", { manage })}>
              {content.description}
            </div>
            {content.activities && (
              <div className={cx("activities-container")}>
                {content.activities &&
                  content.activities.map((activity, index) => (
                    <div
                      key={index}
                      className={cx("activity")}
                      style={{ backgroundColor: randomColor }}
                    >
                      {activity.toLowerCase()}
                    </div>
                  ))}
              </div>
            )}
            <div className={cx("view-container")}>
              {client && (
                <Link className={cx("btn-cotnainer")}>
                  <Button large className={cx("view-more")}>
                    Show more
                  </Button>
                </Link>
              )}
              {manage && (
                <>
                  <div className={cx("btn-container")}>
                    <Button
                      large
                      className={cx("view-more")}
                      onClick={handleRowClick}
                    >
                      View more
                    </Button>
                    <div
                      large
                      className={cx("delete")}
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteNotice(true);
                      }}
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </div>
                  </div>
                  <Modal
                    open={deleteNotice}
                    onClose={() => setDeleteNotice(false)}
                  >
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
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlacementItem;
