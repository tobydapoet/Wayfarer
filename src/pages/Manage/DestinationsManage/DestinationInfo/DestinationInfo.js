import classNames from "classnames/bind";
import styles from "./DestinationInfo.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBar from "../../../../components/SearchBar";
import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import PlacementItem from "../../../../components/PlacementItem/PlacementItem";
import { DestinationContext } from "../../../../contexts/DestinationContext";
import ServicesPopper from "../../../../components/ServicesPopper";

const cx = classNames.bind(styles);

function DestinationInfo() {
  const {
    searchResult,
    allDestinations,
    handleSelectedDestination,
    handleSearchDestinations,
    handleDeleteDestination,
    handleUpdateStatus,
  } = useContext(DestinationContext);
  const navigate = useNavigate();
  const { placement } = useParams();

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <div
          className={cx("back")}
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/manage/destinations")}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>
        <SearchBar
          onSearch={handleSearchDestinations}
          results={searchResult}
          renderResult={(service) => (
            <ServicesPopper
              manage
              data={service}
              onClick={() => handleSelectedDestination(service)}
            />
          )}
        />

        <div
          className={cx("add")}
          style={{ cursor: "pointer" }}
          onClick={() => navigate("add_content")}
        >
          <FontAwesomeIcon icon={faPlus} />
        </div>
      </div>

      {allDestinations
        .filter((item) => item.cityId?.name === placement)
        .map((destination) => (
          <PlacementItem
            manage
            key={destination._id}
            data={destination}
            onClick={() => handleSelectedDestination(destination)}
            onDelete={() => handleUpdateStatus(destination)}
          />
        ))}
    </div>
  );
}

export default DestinationInfo;
