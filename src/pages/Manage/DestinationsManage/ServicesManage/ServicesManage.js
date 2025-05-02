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
  } = useContext(DestinationContext);
  const navigate = useNavigate();
  const { placement, type } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!allDestinations?.length) return;

    const validType = type && type !== ":type" ? type : "trips";
    if (!type || type === ":type") {
      navigate(`/manage/destinations/${placement}/${validType}`, {
        replace: true,
      });
      return;
    }

    // Chỉ cập nhật nếu dữ liệu thực sự thay đổi
    setData((prev) => {
      const newData = allDestinations.filter(
        (item) => item.type === type && item.city?.name === placement
      );
      return JSON.stringify(prev) === JSON.stringify(newData) ? prev : newData;
    });
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
          />
        ))}
    </div>
  );
}

export default ServicesManage;
