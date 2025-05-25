import classNames from "classnames/bind";
import styles from "./DestinationsManage.module.scss";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../../../components/SearchBar";
import Locations from "../../../components/Locations";
import { useContext } from "react";
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
    handleUpdateStatus,
  } = useContext(CityContext);
  const { allDestinations } = useContext(DestinationContext);

  const navigate = useNavigate();

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
        {allCities
          .filter((cities) => cities.isDeleted === false)
          .map((selectedCity) => (
            <Locations
              manage
              key={selectedCity._id}
              data={selectedCity}
              onEdit={() => {
                setOpenEditForm(true);
                setCity(selectedCity);
              }}
              count={
                allDestinations?.filter(
                  (dest) => dest.cityId._id === selectedCity._id
                ).length || 0
              }
              onDelete={() => handleUpdateStatus(selectedCity)}
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
