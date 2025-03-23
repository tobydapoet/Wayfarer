import classNames from "classnames/bind";
import styles from "./ServicesManage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBar from "../../../../components/SearchBar";
import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PlacementItem from "../../../../components/PlacementItem/PlacementItem";

const cx = classNames.bind(styles);

const SERVICES = [
  {
    name: "Temple of Literature1",
    city: "Ha Noi",
    star: 3.5,
    price: 20,
    img: "https://www.indochinavoyages.com/wp-content/uploads/2019/09/temple_of_literature.jpg",
    description:
      "Văn Miếu (Vietnamese: Văn Miếu, chữ Hán: 文廟[1][2]), literally translated as Temple of Literature (although a more accurate name should be Temple of Confucius, as Văn refers to Confucius), is a temple dedicated to Confucius in Hanoi, northern Vietnam. The temple was founded and first built in 1070 at the time of Emperor Lý Thánh Tông, and it hosted the Imperial Academy (Quốc Tử Giám, 國子監), Vietnam's first national university, from 1076 to 1779. In 1803, The academy was moved to the new capital of Nguyen dynasty in Hue.",
    activities:
      "visit,souvenir,visit,souvenir,visit,souvenir,visit,souvenir,visit,souvenir,visit,souvenir,visit,souvenir,visit,souvenir",
    type: 0,
  },
  {
    name: "Temple of Literature",
    city: "Ha Nam",
    star: 4,
    price: 20,
    img: "https://www.indochinavoyages.com/wp-content/uploads/2019/09/temple_of_literature.jpg",
    description:
      "Văn Miếu (Vietnamese: Văn Miếu, chữ Hán: 文廟[1][2]), literally translated as Temple of Literature (although a more accurate name should be Temple of Confucius, as Văn refers to Confucius), is a temple dedicated to Confucius in Hanoi, northern Vietnam. The temple was founded and first built in 1070 at the time of Emperor Lý Thánh Tông, and it hosted the Imperial Academy (Quốc Tử Giám, 國子監), Vietnam's first national university, from 1076 to 1779. In 1803, The academy was moved to the new capital of Nguyen dynasty in Hue.",
    type: 0,
  },
  {
    name: "Temple of Literature",
    city: "Ha Noi",
    star: 4,
    price: 20,
    img: "https://www.indochinavoyages.com/wp-content/uploads/2019/09/temple_of_literature.jpg",
    description:
      "Văn Miếu (Vietnamese: Văn Miếu, chữ Hán: 文廟[1][2]), literally translated as Temple of Literature (although a more accurate name should be Temple of Confucius, as Văn refers to Confucius), is a temple dedicated to Confucius in Hanoi, northern Vietnam. The temple was founded and first built in 1070 at the time of Emperor Lý Thánh Tông, and it hosted the Imperial Academy (Quốc Tử Giám, 國子監), Vietnam's first national university, from 1076 to 1779. In 1803, The academy was moved to the new capital of Nguyen dynasty in Hue.",
    activities: "fishing,campfire",
    type: 0,
  },
  {
    name: "Temple of Literature",
    city: "Ha Nam",
    star: 4,
    price: 20,
    img: "https://www.indochinavoyages.com/wp-content/uploads/2019/09/temple_of_literature.jpg",
    description:
      "Văn Miếu (Vietnamese: Văn Miếu, chữ Hán: 文廟[1][2]), literally translated as Temple of Literature (although a more accurate name should be Temple of Confucius, as Văn refers to Confucius), is a temple dedicated to Confucius in Hanoi, northern Vietnam. The temple was founded and first built in 1070 at the time of Emperor Lý Thánh Tông, and it hosted the Imperial Academy (Quốc Tử Giám, 國子監), Vietnam's first national university, from 1076 to 1779. In 1803, The academy was moved to the new capital of Nguyen dynasty in Hue.",
    type: 0,
  },
  {
    name: "Temple of Literature",
    city: "Ha Giang",
    star: 4,
    price: 20,
    img: "https://www.indochinavoyages.com/wp-content/uploads/2019/09/temple_of_literature.jpg",
    description:
      "Văn Miếu (Vietnamese: Văn Miếu, chữ Hán: 文廟[1][2]), literally translated as Temple of Literature (although a more accurate name should be Temple of Confucius, as Văn refers to Confucius), is a temple dedicated to Confucius in Hanoi, northern Vietnam. The temple was founded and first built in 1070 at the time of Emperor Lý Thánh Tông, and it hosted the Imperial Academy (Quốc Tử Giám, 國子監), Vietnam's first national university, from 1076 to 1779. In 1803, The academy was moved to the new capital of Nguyen dynasty in Hue.",
    type: 0,
  },

  {
    name: "Temple of Literature3",
    city: "Ha Noi",
    star: 3.5,
    price: 20,
    img: "https://www.indochinavoyages.com/wp-content/uploads/2019/09/temple_of_literature.jpg",
    description:
      "Văn Miếu (Vietnamese: Văn Miếu, chữ Hán: 文廟[1][2]), literally translated as Temple of Literature (although a more accurate name should be Temple of Confucius, as Văn refers to Confucius), is a temple dedicated to Confucius in Hanoi, northern Vietnam. The temple was founded and first built in 1070 at the time of Emperor Lý Thánh Tông, and it hosted the Imperial Academy (Quốc Tử Giám, 國子監), Vietnam's first national university, from 1076 to 1779. In 1803, The academy was moved to the new capital of Nguyen dynasty in Hue.",
    type: 2,
  },
  {
    name: "Temple of Literature",
    city: "Ha Nam",
    star: 4,
    price: 20,
    img: "https://www.indochinavoyages.com/wp-content/uploads/2019/09/temple_of_literature.jpg",
    description:
      "Văn Miếu (Vietnamese: Văn Miếu, chữ Hán: 文廟[1][2]), literally translated as Temple of Literature (although a more accurate name should be Temple of Confucius, as Văn refers to Confucius), is a temple dedicated to Confucius in Hanoi, northern Vietnam. The temple was founded and first built in 1070 at the time of Emperor Lý Thánh Tông, and it hosted the Imperial Academy (Quốc Tử Giám, 國子監), Vietnam's first national university, from 1076 to 1779. In 1803, The academy was moved to the new capital of Nguyen dynasty in Hue.",
    type: 2,
  },
  {
    name: "Temple of Literature",
    city: "Ha Noi",
    star: 4,
    price: 20,
    img: "https://www.indochinavoyages.com/wp-content/uploads/2019/09/temple_of_literature.jpg",
    description:
      "Văn Miếu (Vietnamese: Văn Miếu, chữ Hán: 文廟[1][2]), literally translated as Temple of Literature (although a more accurate name should be Temple of Confucius, as Văn refers to Confucius), is a temple dedicated to Confucius in Hanoi, northern Vietnam. The temple was founded and first built in 1070 at the time of Emperor Lý Thánh Tông, and it hosted the Imperial Academy (Quốc Tử Giám, 國子監), Vietnam's first national university, from 1076 to 1779. In 1803, The academy was moved to the new capital of Nguyen dynasty in Hue.",
    type: 2,
  },
  {
    name: "Temple of Literature",
    city: "Ha Nam",
    star: 4,
    price: 20,
    img: "https://www.indochinavoyages.com/wp-content/uploads/2019/09/temple_of_literature.jpg",
    description:
      "Văn Miếu (Vietnamese: Văn Miếu, chữ Hán: 文廟[1][2]), literally translated as Temple of Literature (although a more accurate name should be Temple of Confucius, as Văn refers to Confucius), is a temple dedicated to Confucius in Hanoi, northern Vietnam. The temple was founded and first built in 1070 at the time of Emperor Lý Thánh Tông, and it hosted the Imperial Academy (Quốc Tử Giám, 國子監), Vietnam's first national university, from 1076 to 1779. In 1803, The academy was moved to the new capital of Nguyen dynasty in Hue.",
    type: 2,
  },
  {
    name: "Temple of Literature",
    city: "Ha Giang",
    star: 4,
    price: 20,
    img: "https://www.indochinavoyages.com/wp-content/uploads/2019/09/temple_of_literature.jpg",
    description:
      "Văn Miếu (Vietnamese: Văn Miếu, chữ Hán: 文廟[1][2]), literally translated as Temple of Literature (although a more accurate name should be Temple of Confucius, as Văn refers to Confucius), is a temple dedicated to Confucius in Hanoi, northern Vietnam. The temple was founded and first built in 1070 at the time of Emperor Lý Thánh Tông, and it hosted the Imperial Academy (Quốc Tử Giám, 國子監), Vietnam's first national university, from 1076 to 1779. In 1803, The academy was moved to the new capital of Nguyen dynasty in Hue.",
    type: 2,
  },

  {
    name: "Temple of Literature2",
    city: "Ha Noi",
    star: 5,
    price: 20,
    img: "https://www.indochinavoyages.com/wp-content/uploads/2019/09/temple_of_literature.jpg",
    description:
      "Văn Miếu (Vietnamese: Văn Miếu, chữ Hán: 文廟[1][2]), literally translated as Temple of Literature (although a more accurate name should be Temple of Confucius, as Văn refers to Confucius), is a temple dedicated to Confucius in Hanoi, northern Vietnam. The temple was founded and first built in 1070 at the time of Emperor Lý Thánh Tông, and it hosted the Imperial Academy (Quốc Tử Giám, 國子監), Vietnam's first national university, from 1076 to 1779. In 1803, The academy was moved to the new capital of Nguyen dynasty in Hue.",
    activities: "visit,souvenir",
    type: 1,
  },
  {
    name: "Temple of Literature",
    city: "Ha Nam",
    star: 4,
    price: 20,
    img: "https://www.indochinavoyages.com/wp-content/uploads/2019/09/temple_of_literature.jpg",
    description:
      "Văn Miếu (Vietnamese: Văn Miếu, chữ Hán: 文廟[1][2]), literally translated as Temple of Literature (although a more accurate name should be Temple of Confucius, as Văn refers to Confucius), is a temple dedicated to Confucius in Hanoi, northern Vietnam. The temple was founded and first built in 1070 at the time of Emperor Lý Thánh Tông, and it hosted the Imperial Academy (Quốc Tử Giám, 國子監), Vietnam's first national university, from 1076 to 1779. In 1803, The academy was moved to the new capital of Nguyen dynasty in Hue.",
    type: 1,
  },
  {
    name: "Temple of Literature",
    city: "Ha Noi",
    star: 4,
    price: 20,
    img: "https://www.indochinavoyages.com/wp-content/uploads/2019/09/temple_of_literature.jpg",
    description:
      "Văn Miếu (Vietnamese: Văn Miếu, chữ Hán: 文廟[1][2]), literally translated as Temple of Literature (although a more accurate name should be Temple of Confucius, as Văn refers to Confucius), is a temple dedicated to Confucius in Hanoi, northern Vietnam. The temple was founded and first built in 1070 at the time of Emperor Lý Thánh Tông, and it hosted the Imperial Academy (Quốc Tử Giám, 國子監), Vietnam's first national university, from 1076 to 1779. In 1803, The academy was moved to the new capital of Nguyen dynasty in Hue.",
    type: 1,
  },
  {
    name: "Temple of Literature",
    city: "Ha Nam",
    star: 4,
    price: 20,
    img: "https://www.indochinavoyages.com/wp-content/uploads/2019/09/temple_of_literature.jpg",
    description:
      "Văn Miếu (Vietnamese: Văn Miếu, chữ Hán: 文廟[1][2]), literally translated as Temple of Literature (although a more accurate name should be Temple of Confucius, as Văn refers to Confucius), is a temple dedicated to Confucius in Hanoi, northern Vietnam. The temple was founded and first built in 1070 at the time of Emperor Lý Thánh Tông, and it hosted the Imperial Academy (Quốc Tử Giám, 國子監), Vietnam's first national university, from 1076 to 1779. In 1803, The academy was moved to the new capital of Nguyen dynasty in Hue.",
    type: 1,
  },
  {
    name: "Temple of Literature",
    city: "Ha Giang",
    star: 4,
    price: 20,
    img: "https://www.indochinavoyages.com/wp-content/uploads/2019/09/temple_of_literature.jpg",
    description:
      "Văn Miếu (Vietnamese: Văn Miếu, chữ Hán: 文廟[1][2]), literally translated as Temple of Literature (although a more accurate name should be Temple of Confucius, as Văn refers to Confucius), is a temple dedicated to Confucius in Hanoi, northern Vietnam. The temple was founded and first built in 1070 at the time of Emperor Lý Thánh Tông, and it hosted the Imperial Academy (Quốc Tử Giám, 國子監), Vietnam's first national university, from 1076 to 1779. In 1803, The academy was moved to the new capital of Nguyen dynasty in Hue.",
    type: 1,
  },
];

function ServicesManage() {
  const navigate = useNavigate();
  const param = useParams();
  console.log(param.type);
  const [data, setData] = useState([]);
  useEffect(() => {
    const dataMap = {
      trips: SERVICES.filter(service => service.type === 0),
      hotels: SERVICES.filter(service => service.type === 1),
      transports: SERVICES.filter(service => service.type === 2),
    };

    if (!param.type || param.type === ":type") {
      navigate(`/manage/destinations/${param.info}/trips`, { replace: true });
      return;
    }

    const newData = dataMap[param.type];
    setData(newData);
  }, [param.type, param.info]);
  console.log(param.type);
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
        <SearchBar />

        <div
          className={cx("add")}
          style={{ cursor: "pointer" }}
          onClick={() => navigate("add_content")}
        >
          <FontAwesomeIcon icon={faPlus} />
        </div>
      </div>

      {data
        .filter(
          (data) => param.info.replace(/([a-z])([A-Z])/g, "$1 $2") === data.city
        )
        .map((item, index) => (
          <PlacementItem manage type={param.type} data={item} key={index} />
        ))}
    </div>
  );
}

export default ServicesManage;
