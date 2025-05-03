import classNames from "classnames/bind";
import styles from "./ServicesManage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBar from "../../../../components/SearchBar";
import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import PlacementItem from "../../../../components/PlacementItem/PlacementItem";
import { DestinationContext } from "../../../../contexts/DestinationContext";
import ServicesPopper from "../../../../components/ServicesPopper";

const cx = classNames.bind(styles);

function ServicesManage() {
  const {
    searchResult,
    allDestinations,
    handleSelectedDestination,
    handleSearchTrips,
    handleSearchHotels,
    handleSearchTransports,
    handleDeleteDestination,
  } = useContext(DestinationContext);
  const navigate = useNavigate();
  const { placement, type } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!allDestinations || allDestinations.length === 0) return;

    if (!type || type === ":type") {
      navigate(`/manage/destinations/${placement}/trips`, {
        replace: true,
      });
      return;
    }

    const filtered = allDestinations.filter((item) => item.type === type);
    setData(filtered);
  }, [allDestinations, placement, type, navigate]);
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
          onSearch={(e) => {
            switch (type) {
              case "trips":
                handleSearchTrips(e);
                break;
              case "hotels":
                handleSearchHotels(e);
                break;
              case "transports":
                handleSearchTransports(e);
                break;
              default:
                break;
            }
          }}
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

      {data
        .filter((item) => item.city?.name === placement)
        .map((destination) => (
          <PlacementItem
            manage
            key={destination._id}
            data={destination}
            onClick={() => handleSelectedDestination(destination)}
            onDelete={() => handleDeleteDestination(destination._id)}
          />
        ))}
    </div>
  );
}

export default ServicesManage;
