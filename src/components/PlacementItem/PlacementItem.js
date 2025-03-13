import classNames from "classnames/bind";
import styles from "./PlacementItem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../Modal";
import Button from "../Button";
import {
  faStarHalfStroke,
  faStar,
  faPersonChalkboard,
  faShop,
  faMapLocationDot,
  faGuitar,
  faBurger,
  faMugHot,
  faCampground,
  faExclamation,
  faPersonSwimming,
  faFish,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const cx = classNames.bind(styles);

function PlacementItem({ type, data, manage, client }) {
  const defaultActivities = [
    "souvenir",
    "visit",
    "campfire",
    "music",
    "food",
    "drink",
    "travel",
    "swim",
    "fishing",
  ];

  const contentMap = {
    trips: {
      ...data,
      activities: data.activities ? data.activities.split(",") : [],
    },

    hotels: {
      ...data,
      activities: data.activities ? data.activities.split(",") : [],
    },

    transports: { ...data },
  };
  const content = contentMap[type] || {};

  const StarRating = ({ rating }) => {
    const stars = [];
    const roundedRating = Math.round(rating * 2) / 2;
    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(roundedRating)) {
        stars.push(<FontAwesomeIcon icon={faStar} color="#FFD700" />);
      } else if (i + 0.5 === roundedRating) {
        stars.push(<FontAwesomeIcon icon={faStarHalfStroke} color="#FFD700" />);
      } else {
        stars.push(<FontAwesomeIcon icon={emptyStar} color="#FFD700" />);
      }
    }
    return <div>{stars}</div>;
  };

  const getIcon = (activity) => {
    const icons = {
      souvenir: faShop,
      visit: faPersonChalkboard,
      campfire: faCampground,
      music: faGuitar,
      food: faBurger,
      drink: faMugHot,
      travel: faMapLocationDot,
      swim: faPersonSwimming,
      fishing: faFish,
    };
    return icons[activity] || faExclamation;
  };

  const [deleteNotice, setDeleteNotice] = useState(false);

  const navigate = useNavigate();

  const handleRowClick = () => {
    navigate(`${data.name}`);
  };

  return (
    <div className={cx("wrapper")}>
      {content && (
        <div className={cx("container", { manage })}>
          <img src={content.img} className={cx({ manage })} />
          <div className={cx("content")}>
            <div className={cx("header")}>
              <div className={cx("name", { manage })}>{content.name}</div>
              <div
                className={cx("reviews", { manage })}
              >{`${content.reviews} reviews`}</div>
            </div>
            <div className={cx("star")}>
              <StarRating rating={content.star} />
            </div>
            <div className={cx("description", { manage })}>
              {content.description}
            </div>
            {content.activities && (
              <div className={cx("activities-container")}>
                {defaultActivities.map(
                  (activity) =>
                    content.activities.includes(activity) && (
                      <FontAwesomeIcon
                        key={activity}
                        icon={getIcon(activity)}
                        className={cx('icon',{manage})}
                      />
                    )
                )}
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
