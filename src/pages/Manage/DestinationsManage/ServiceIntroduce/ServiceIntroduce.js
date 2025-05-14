import classNames from "classnames/bind";
import styles from "./ServiceIntroduce.module.scss";
import Itinenary from "../../../../components/Itinerary";
import { useParams } from "react-router-dom";
import ItineraryAdd from "../../../../components/ItineraryAdd/ItineraryAdd";
import { DestinationProvider } from "../../../../contexts/DestinationContext";
import { CityProvider } from "../../../../contexts/CityContext";
import { BillProvider } from "../../../../contexts/BillContext";

const cx = classNames.bind(styles);

function ServiceIntroduce() {
  const param = useParams();

  return (
    <div className={cx("wrapper")}>
      {param.id !== "add_content" ? (
        <DestinationProvider>
          <BillProvider>
            <Itinenary manage />
          </BillProvider>
        </DestinationProvider>
      ) : (
        <CityProvider>
          <DestinationProvider>
            <ItineraryAdd />
          </DestinationProvider>
        </CityProvider>
      )}
    </div>
  );
}

export default ServiceIntroduce;
