import classNames from "classnames/bind";
import styles from "./Destinations.module.scss";
import Locations from "../../components/Locations";
import { useContext } from "react";
import { CityContext } from "../../contexts/CityContext";
import { DestinationContext } from "../../contexts/DestinationContext";

const cx = classNames.bind(styles);
function Destinations() {
  const { allCities } = useContext(CityContext);
  const { allDestinations } = useContext(DestinationContext);
  return (
    <div className={cx("wrapper")}>
      {allCities
        .filter((cities) => cities.isDeleted === false)
        .map((city) => (
          <Locations
            data={city}
            key={city._id}
            client
            count={
              allDestinations?.filter((dest) => dest.cityId._id === city._id)
                .length || 0
            }
          />
        ))}
    </div>
  );
}

export default Destinations;
