import classNames from "classnames/bind";
import styles from "./DestinationsManage.module.scss";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../../../components/SearchBar";
import Locations from "../../../components/Locations";
import { useContext, useEffect, useState } from "react";
import EditDestinationManage from "../../../components/EditDestinationManage/EditDestinationManage";
import { CityContext, CityProvider } from "../../../contexts/CityContext";
import { DestinationContext } from "../../../contexts/DestinationContext";

const cx = classNames.bind(styles);

function DestinationsManage() {
  const {
    allCities,
    citiesSearchResult,
    setCity,
    openEditForm,
    setOpenEditForm,
    handleSearchCity,
    handleDeleteCity,
  } = useContext(CityContext);

  const { counts } = useContext(DestinationContext);

  const navigate = useNavigate();
  console.log(counts);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <div className={cx("search-container")}>
          <SearchBar
            onSearch={handleSearchCity}
            results={citiesSearchResult}
            renderResult={(searchResult) => (
              <div
                className={cx("cities-search")}
                onClick={() => {
                  navigate(searchResult.name);
                }}
              >
                {searchResult.name}
              </div>
            )}
          />
        </div>
        <div
          className={cx("add")}
          style={{ cursor: "pointer" }}
          onClick={() => setOpenEditForm(true)}
        >
          <FontAwesomeIcon icon={faPlus} />
        </div>
      </div>
      <div className={cx("content")}>
        {allCities.map((selectedCity) => (
          <Locations
            manage
            key={selectedCity._id}
            data={selectedCity}
            onEdit={() => {
              setOpenEditForm(true);
              setCity(selectedCity);
            }}
            tripsCount={counts[selectedCity._id]?.trips || 0}
            hotelsCount={counts[selectedCity._id]?.hotels || 0}
            transportsCount={counts[selectedCity._id]?.transports || 0}
            onDelete={() => handleDeleteCity(selectedCity._id)}
          />
        ))}
      </div>

      <EditDestinationManage
        open={openEditForm}
        onClose={() => setOpenEditForm(false)}
      />
    </div>
  );
}

export default DestinationsManage;
