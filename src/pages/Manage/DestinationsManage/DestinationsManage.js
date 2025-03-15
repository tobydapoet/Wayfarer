import classNames from "classnames/bind";
import styles from "./DestinationsManage.module.scss";
import {  useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../../../components/SearchBar";
import Locations from "../../../components/Locations";
import { useState } from "react";
import EditDestinationManage from "../../../components/EditDestinationManage/EditDestinationManage";

const cx = classNames.bind(styles);

function DestinationsManage() {
  const LOCATIONS = [
    {
      name: "Ha Noi",
      image:
        "https://media.istockphoto.com/id/510206305/photo/city-lights.jpg?s=612x612&w=0&k=20&c=AZJfxbE8pLqwDLzA-x5jrikAauYVY5L-LxGz88cNQbk=",
      to: "/HaNoi",
      trips: 200,
      hotel: 124,
      transport: 500,
    },
    {
      name: "Hai Phong",
      image:
        "https://cdn.haiphong.gov.vn/gov-hpg/SiteFolders/Root/1/thuvienanh/8403.jpg",
      to: "/HaiPhong",
      trips: 200,
      hotel: 124,
      transport: 500,
    },
    {
      name: "Quang Ninh",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/d/d3/A_view_of_Ha_Long_Bay_from_the_high_point_of_Sun_Sot_cave_%2831520203451%29.jpg",
      to: "/QuangNinh",
      trips: 200,
      hotel: 124,
      transport: 500,
    },
    {
      name: "Ha Giang",
      image:
        "https://vitracotour.com/wp-content/uploads/2023/12/ha-giang-2.jpg",
      to: "/HaGiang",
      trips: 200,
      hotel: 124,
      transport: 500,
    },
    {
      name: "Hoa Binh",
      image:
        "https://images.vietnamtourism.gov.vn/en/images/2021/hoabinhvna1.jpg",
      to: "/HoaBinh",
      trips: 200,
      hotel: 124,
      transport: 500,
    },
  ];


  const [openEditForm, setOpenEditForm] = useState(false);
  const [locations,setLocations] = useState(LOCATIONS)

  const handleSaveLocation = (newLocation) => {
    setLocations((prev) => [...prev, newLocation])
  }

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <SearchBar />
        <div
          className={cx("add")}
          style={{ cursor: "pointer" }}
          onClick={() => setOpenEditForm(true)}
        >
          <FontAwesomeIcon icon={faPlus} />
        </div>
      </div>
      <div className={cx("content")}>
        {locations.map((location, index) => (
          <Locations manage key={index} data={location} />
        ))}
      </div>

      <EditDestinationManage
        open={openEditForm}
        onClose={() => setOpenEditForm(false)}
        onSave = {handleSaveLocation}
      />
      
    </div>
  );
}

export default DestinationsManage;
