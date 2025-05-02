import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StarRating = ({ rating }) => {
  const stars = [];
  const roundedRating = Math.round(rating * 2) / 2;

  for (let i = 0; i < 5; i++) {
    if (i < Math.floor(roundedRating)) {
      stars.push(<FontAwesomeIcon key={i} icon={faStar} color="#FFD700" />);
    } else if (i + 0.5 === roundedRating) {
      stars.push(
        <FontAwesomeIcon key={i} icon={faStarHalfStroke} color="#FFD700" />
      );
    } else {
      stars.push(<FontAwesomeIcon key={i} icon={emptyStar} color="#FFD700" />);
    }
  }

  return <div>{stars}</div>;
};

export default StarRating;
