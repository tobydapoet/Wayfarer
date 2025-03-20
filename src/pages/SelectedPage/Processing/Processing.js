import classNames from "classnames/bind";
import styles from "./Processing.module.scss";
import ProcessingItem from "../../../components/ProcessingItem/ProcessingItem";
import { useState } from "react";
import DetailItem from "../../../components/DetailItem/DetailItem";

const cx = classNames.bind(styles);

function Processing() {
  const [selectedItem, setSelectedItem] = useState(null);
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
  ];
  return (
    <div className={cx("wrapper")}>
      <div className={cx("summary", { collapsed: selectedItem !== null })}>
        {TourItems.map((TourItem, index) => (
          <ProcessingItem
            key={index}
            data={TourItem}
            onClick={() => setSelectedItem(TourItem)}
          />
        ))}
      </div>
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
    </div>
  );
}

export default Processing;
