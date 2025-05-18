import classNames from "classnames/bind";
import styles from "./PlacementInfo.module.scss";
import Itinerary from "../../../components/Itinerary";
import Button from "../../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useMemo } from "react";
import { DestinationContext } from "../../../contexts/DestinationContext";
import { FeedBackContext } from "../../../contexts/FeedbackContext";
import ReviewItem from "../../../components/ReviewItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

const {} = useContext;
function PlacementInfo() {
  const navigate = useNavigate();
  const { content } = useContext(DestinationContext);
  const { id } = useParams();
  const handleBook = () => {
    const encodedName = encodeURIComponent(content._id);
    navigate(`/bill?destinationId=${encodedName}`);
  };
  const { allFeedbacks, handleDeleteFeedback, handleCalculateRating } =
    useContext(FeedBackContext);

  return (
    <div className={cx("wrapper")}>
      <Itinerary />

      <div className={cx("btn-wrapper")}>
        <Button large onClick={handleBook}>
          Book now!
        </Button>
      </div>
      <hr className={cx("gap-line")} />
      <div className={cx("review-title")}>
        <span>Review</span>{" "}
        <span>
          {`${handleCalculateRating(id)}`}
          <FontAwesomeIcon icon={faStar} color="#FFD700" />
        </span>
      </div>
      <div className={cx("review-container")}>
        {allFeedbacks
          .filter((feedbacks) => feedbacks.destinationId._id === id)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((feedback) => (
            <>
              <ReviewItem
                key={feedback._id}
                data={feedback}
                onDelete={() => handleDeleteFeedback(feedback._id)}
              />
            </>
          ))}
      </div>
    </div>
  );
}

export default PlacementInfo;
