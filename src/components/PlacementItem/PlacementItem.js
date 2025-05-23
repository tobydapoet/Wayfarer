import classNames from "classnames/bind";
import styles from "./PlacementItem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import {
  faHeart,
  faPersonWalkingArrowRight,
  faStar,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import Notice from "../Notice";
import { FeedBackContext } from "../../contexts/FeedbackContext";
import { BillContext } from "../../contexts/BillContext";
import { DestinationFavouriteContext } from "../../contexts/DestinationFavouriteContext";

const cx = classNames.bind(styles);

function PlacementItem({ data, manage, client, onClick, onDelete }) {
  const [deleteNotice, setDeleteNotice] = useState(false);

  const getRandomPastelColor = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 90%, 50%)`;
  };
  const randomColor = getRandomPastelColor();

  const { handleCalculateRating } = useContext(FeedBackContext);
  const { handleCalculateClient } = useContext(BillContext);
  const { allDestinationFavourite } = useContext(DestinationFavouriteContext);

  const stringHtml = (html) => {
    const tempP = document.createElement("div");
    tempP.innerHTML = html;
    return tempP.innerText;
  };

  return (
    <div className={cx("wrapper")}>
      {data && (
        <div className={cx("container", { manage })}>
          <img src={data.image} className={cx({ manage })} />
          <div className={cx("content")}>
            <div className={cx("header")}>
              <div className={cx("name", { manage })}>{data.name}</div>
              <div
                className={cx("price", { manage })}
              >{`$${data.price}/${data.unit}`}</div>
            </div>
            <div className={cx("calculate")}>
              <div className={cx("star")}>
                <div>{`${handleCalculateRating(data._id)}`}</div>
                <FontAwesomeIcon icon={faStar} color="#FFD700" />
              </div>
              <div className={cx("num")}>
                <div>{`${handleCalculateClient(data._id)}`}</div>
                <FontAwesomeIcon icon={faPersonWalkingArrowRight} />
              </div>

              <div className={cx("favourite")}>
                <div>
                  {
                    allDestinationFavourite.filter((fav) => {
                      const favDestinationId =
                        typeof fav.destinationId === "string"
                          ? fav.destinationId
                          : fav.destinationId?._id;
                      return favDestinationId === data._id;
                    }).length
                  }
                </div>

                <FontAwesomeIcon icon={faHeart} color="red" />
              </div>
            </div>
            <div className={cx("description", { manage })}>
              <div>{stringHtml(data.description)}</div>
            </div>
            {data.activities && (
              <div className={cx("activities-container")}>
                {data.activities &&
                  data.activities.map((activity, index) => (
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
                <Button large className={cx("view-more")} onClick={onClick}>
                  Show more
                </Button>
              )}
              {manage && (
                <>
                  <div className={cx("btn-container")}>
                    <Button large className={cx("view-more")} onClick={onClick}>
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
                  <Notice
                    open={deleteNotice}
                    onClose={() => setDeleteNotice(false)}
                    content="Do you want to delte this destination ?"
                    onConfirm={onDelete}
                  />
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
