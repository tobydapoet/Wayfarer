import classNames from "classnames/bind";
import styles from "./ServiceIntroduce.module.scss";
import Itinenary from "../../../../../components/Itinerary";
import { useParams } from "react-router-dom";
import ItineraryAdd from "../../../../../components/ItineraryAdd/ItineraryAdd";

const cx = classNames.bind(styles);

const CONTENT = {
  name: "Temple of Literature1",
  city: "Ha Noi",
  star: 3.5,
  price: 20,
  img: "https://www.indochinavoyages.com/wp-content/uploads/2019/09/temple_of_literature.jpg",
  description:
    "Văn Miếu (Vietnamese: Văn Miếu, chữ Hán: 文廟[1][2]), literally translated as Temple of Literature (although a more accurate name should be Temple of Confucius, as Văn refers to Confucius), is a temple dedicated to Confucius in Hanoi, northern Vietnam. The temple was founded and first built in 1070 at the time of Emperor Lý Thánh Tông, and it hosted the Imperial Academy (Quốc Tử Giám, 國子監), Vietnam's first national university, from 1076 to 1779. In 1803, The academy was moved to the new capital of Nguyen dynasty in Hue.",
  activities:
    "visit,souvenir,visit,souvenir,visit,souvenir,visit,souvenir,visit,souvenir,visit,souvenir,visit,souvenir,visit,souvenir,visit,souvenir,visit,souvenir,visit,souvenir,visit,souvenir,visit,souvenir",
  type : 0,
};

function ServiceIntroduce() {
  const param = useParams();

  return (
    <div className={cx("wrapper")}>
      {param.name !== "add_content" ? (
        <Itinenary manage data={CONTENT} />
      ) : param.type === "transports" ? (
        <ItineraryAdd transports/>
      ) : (
        <ItineraryAdd />
      )}
    </div>
  );
}

export default ServiceIntroduce;
