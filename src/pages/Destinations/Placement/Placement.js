import classNames from "classnames/bind";
import styles from "./Placement.module.scss";
import PlacementItem from "../../../components/PlacementItem";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { DestinationContext } from "../../../contexts/DestinationContext";
import SearchBar from "../../../components/SearchBar";
import ServicesPopper from "../../../components/ServicesPopper";

const cx = classNames.bind(styles);

function Placement() {
  const { placement } = useParams();
  const {
    allDestinations,
    handleSelectedDestination,
    searchResult,
    handleSearchDestinations,
  } = useContext(DestinationContext);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("search-container")}>
        <SearchBar
          onSearch={handleSearchDestinations}
          results={searchResult}
          renderResult={(service) => (
            <ServicesPopper
              data={service}
              onClick={() => handleSelectedDestination(service)}
            />
          )}
        />
      </div>
      {allDestinations
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

export default Placement;
