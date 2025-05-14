import classNames from "classnames/bind";
import styles from "./PlacementInfo.module.scss";
import Itinerary from "../../../components/Itinerary";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DestinationContext } from "../../../contexts/DestinationContext";

const cx = classNames.bind(styles);

const {} = useContext;
function PlacementInfo() {
  const navigate = useNavigate();
  const { content } = useContext(DestinationContext);
  const handleBook = () => {
    const encodedName = encodeURIComponent(content._id);
    navigate(`/bill?destinationId=${encodedName}`);
  };
  return (
    <div className={cx("wrapper")}>
      <Itinerary />

      <div className={cx("btn-wrapper")}>
        <Button large onClick={handleBook}>
          Book now!
        </Button>
      </div>
    </div>
  );
}

export default PlacementInfo;
