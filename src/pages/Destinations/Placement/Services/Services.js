import classNames from "classnames/bind";
import styles from "./Services.module.scss";
import PlacementItem from "../../../../components/PlacementItem";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles);
function Services() {
  let { placement } = useParams();
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
        "visit,souvenir,visit,souvenir,visit,souvenir,visit,souvenir,visit,souvenir,visit,souvenir,visit,souvenir,visit,souvenir,souvenir,visit,souvenir,souvenir,visit,souvenir",
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
  
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const param = useParams();
  useEffect(() => {
    const dataMap = {
      trips: SERVICES.filter(services => services.type === 0),
      hotels: SERVICES.filter(services => services.type === 1),
      transports: SERVICES.filter(services => services.type === 2),
    };
    if (!param.type || param.type === ":type") {
      navigate(`/destinations/${param.placement}/trips`, { replace: true });
      return;
    }

    const newData = dataMap[param.type];
    setData(newData);
  }, [param.type, param.placement]);
  return (
    <div className={cx("wrapper")}>
      {data.filter(
        (trips) => placement.replace(/([a-z])([A-Z])/g, "$1 $2") === trips.city
      ).map((trip, index) => {
        console.log(trip);
        return (
          <div className={cx("trips-wrapper")} key={index}>
            <PlacementItem client type={param.type} data={trip} />
          </div>
        );
      })}
    </div>
  );
}

export default Services;
