import classNames from "classnames/bind";
import style from "./ClientInfo.module.scss";
import ClientProfile from "../../../../../components/UserProfile/UserProfile";
import { useEffect, useState } from "react";
import DetailItem from "../../../../../components/DetailItem/DetailItem";
import ProcessingItem from "../../../../../components/ProcessingItem/ProcessingItem";
import { ClientProvider } from "../../../../../contexts/ClientContext";

const cx = classNames.bind(style);

const CLIENT = {
  name: "Nguyen Viet Tung",
  email: "Cat@gmail.com",
  password: "1234567",
  avatar:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFAz7TV79RYxtJu5RScxRax-OljYqpIKqPxw&s",
  position: "admin",

  birth: "2004-10-29",
  phone: "0348349754",
  site: "Непское сельское поселение, Katangsky Rayon, Irkutsk Oblast, Siberian Federal District, Russia",
};

const TourItems = [
  {
    name: "Temple of Literature1",
    city: "Ha Noi",
    address: "58 P. Quốc Tử Giám, Văn Miếu, Đống Đa, Hà Nội",
    img: "https://www.indochinavoyages.com/wp-content/uploads/2019/09/temple_of_literature.jpg",
    cost: 500,
    guest: 11,
    start: "15:40 2025-2-27",
    finish: "17:40 2025-2-27",
    status: "2",
    type: "0",
  },
  {
    name: "Temple of Literature2",
    city: "Ha Noi",
    address: "58 P. Quốc Tử Giám, Văn Miếu, Đống Đa, Hà Nội",
    img: "https://www.indochinavoyages.com/wp-content/uploads/2019/09/temple_of_literature.jpg",
    cost: 500,
    guest: 10,
    start: "15:40 2025-2-27",
    finish: "17:40 2025-2-27",
    status: "4",
    type: "1",
  },
  {
    name: "Temple of Literature3",
    city: "Ha Noi",
    address: "58 P. Quốc Tử Giám, Văn Miếu, Đống Đa, Hà Nội",
    img: "https://www.indochinavoyages.com/wp-content/uploads/2019/09/temple_of_literature.jpg",
    cost: 500,
    guest: 12,
    start: "15:40 2025-2-27",
    finish: "17:40 2025-2-27",
    status: "3",
    type: "2",
  },
  {
    name: "Temple of Literature2",
    city: "Ha Noi",
    address: "58 P. Quốc Tử Giám, Văn Miếu, Đống Đa, Hà Nội",
    img: "https://www.indochinavoyages.com/wp-content/uploads/2019/09/temple_of_literature.jpg",
    cost: 500,
    guest: 10,
    start: "15:40 2025-2-27",
    finish: "17:40 2025-2-27",
    status: "4",
    type: "1",
  },
  {
    name: "Temple of Literature3",
    city: "Ha Noi",
    address: "58 P. Quốc Tử Giám, Văn Miếu, Đống Đa, Hà Nội",
    img: "https://www.indochinavoyages.com/wp-content/uploads/2019/09/temple_of_literature.jpg",
    cost: 500,
    guest: 12,
    start: "15:40 2025-2-27",
    finish: "17:40 2025-2-27",
    status: "3",
    type: "2",
  },
  {
    name: "Temple of Literature2",
    city: "Ha Noi",
    address: "58 P. Quốc Tử Giám, Văn Miếu, Đống Đa, Hà Nội",
    img: "https://www.indochinavoyages.com/wp-content/uploads/2019/09/temple_of_literature.jpg",
    cost: 500,
    guest: 10,
    start: "15:40 2025-2-27",
    finish: "17:40 2025-2-27",
    status: "4",
    type: "1",
  },
  {
    name: "Temple of Literature3",
    city: "Ha Noi",
    address: "58 P. Quốc Tử Giám, Văn Miếu, Đống Đa, Hà Nội",
    img: "https://www.indochinavoyages.com/wp-content/uploads/2019/09/temple_of_literature.jpg",
    cost: 500,
    guest: 12,
    start: "15:40 2025-2-27",
    finish: "17:40 2025-2-27",
    status: "3",
    type: "2",
  },
  {
    name: "Temple of Literature3",
    city: "Ha Noi",
    address: "58 P. Quốc Tử Giám, Văn Miếu, Đống Đa, Hà Nội",
    img: "https://www.indochinavoyages.com/wp-content/uploads/2019/09/temple_of_literature.jpg",
    cost: 500,
    guest: 12,
    start: "15:40 2025-2-27",
    finish: "17:40 2025-2-27",
    status: "3",
    type: "2",
  },
  {
    name: "Temple of Literature3",
    city: "Ha Noi",
    address: "58 P. Quốc Tử Giám, Văn Miếu, Đống Đa, Hà Nội",
    img: "https://www.indochinavoyages.com/wp-content/uploads/2019/09/temple_of_literature.jpg",
    cost: 500,
    guest: 12,
    start: "15:40 2025-2-27",
    finish: "17:40 2025-2-27",
    status: "3",
    type: "2",
  },
];
function ClientInfo() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800);
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("summary", { collapsed: selectedItem !== null })}>
        {TourItems.map((TourItem, key) => (
          <ProcessingItem
            key={key}
            data={TourItem}
            onClick={() => setSelectedItem(TourItem)}
          />
        ))}
      </div>
      {selectedItem ? (
        <div className={cx("details", { expanded: selectedItem !== null })}>
          {selectedItem && (
            <DetailItem
              data={selectedItem}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedItem(null);
              }}
            />
          )}
        </div>
      ) : null}

      {(isMobile || !selectedItem) && (
        <div className={cx("client-info")}>
          <ClientProvider data={CLIENT}>
            <ClientProfile />
          </ClientProvider>
        </div>
      )}
    </div>
  );
}

export default ClientInfo;
