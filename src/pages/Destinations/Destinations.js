import classNames from "classnames/bind";
import styles from "./Destinations.module.scss";
import Locations from "../../components/Locations";
import { useContext } from "react";
import { CityContext } from "../../contexts/CityContext";

const cx = classNames.bind(styles);
function Destinations() {
  const { allCities } = useContext(CityContext);
  return (
    <div className={cx("wrapper")}>
      {allCities.map((city) => (
        <Locations data={city} key={city._id} client />
      ))}
    </div>
  );
}

export default Destinations;
