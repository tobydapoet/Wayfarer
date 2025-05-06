import classNames from "classnames/bind";
import styles from "./Services.module.scss";
import PlacementItem from "../../../../components/PlacementItem";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { DestinationContext } from "../../../../contexts/DestinationContext";
import SearchBar from "../../../../components/SearchBar";
import ServicesPopper from "../../../../components/ServicesPopper";

const cx = classNames.bind(styles);

function Services() {
  const { placement, type } = useParams();
  const navigate = useNavigate();
  const {
    allDestinations,
    handleSelectedDestination,
    searchResult,
    handleSearchHotels,
    handleSearchTrips,
    handleSearchTransports,
  } = useContext(DestinationContext);

  const [data, setData] = useState([]);

  useEffect(() => {
    if (!allDestinations || allDestinations.length === 0) return;

    if (!type || type === ":type") {
      navigate(`/destinations/${placement}/trips`, { replace: true });
      return;
    }

    const filtered = allDestinations.filter((item) => item.type === type);
    setData(filtered);
  }, [allDestinations, placement, type, navigate]);

  console.log(data);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("search-container")}>
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
              data={service}
              onClick={() => handleSelectedDestination(service)}
            />
          )}
        />
      </div>
      {data
        .filter((item) => item.cityId?.name === placement)
        .map((destination) => (
          <PlacementItem
            key={destination._id}
            data={destination}
            client
            onClick={() => handleSelectedDestination(destination)}
          />
        ))}
    </div>
  );
}

export default Services;
