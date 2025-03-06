import classNames from "classnames/bind";
import Tippy from "@tippyjs/react/headless";

import styles from './Destinations.module.scss'
import Locations from "../../components/Locations";

const cx = classNames.bind(styles)
function Destinations() {
    const LOCATIONS = [
        {
            name: 'Ha Noi',
            image : 'https://media.istockphoto.com/id/510206305/photo/city-lights.jpg?s=612x612&w=0&k=20&c=AZJfxbE8pLqwDLzA-x5jrikAauYVY5L-LxGz88cNQbk=',
            to : '/HaNoi',
            trips : 200,
            hotel : 124,
            transport : 500,
        },
        {
            name : 'Hai Phong',
            image : 'https://cdn.haiphong.gov.vn/gov-hpg/SiteFolders/Root/1/thuvienanh/8403.jpg',
            to : '/HaiPhong',
            trips : 200,
            hotel : 124,
            transport : 500,
        },
        {
            name: 'Quang Ninh',
            image : 'https://upload.wikimedia.org/wikipedia/commons/d/d3/A_view_of_Ha_Long_Bay_from_the_high_point_of_Sun_Sot_cave_%2831520203451%29.jpg',
            to : '/QuangNinh',
            trips : 200,
            hotel : 124,
            transport : 500,
        },
        {
            name : 'Ha Giang',
            image : 'https://vitracotour.com/wp-content/uploads/2023/12/ha-giang-2.jpg',
            to : '/HaGiang',
            trips : 200,
            hotel : 124,
            transport : 500,
        },
        {
            name: 'Hoa Binh',
            image : 'https://images.vietnamtourism.gov.vn/en/images/2021/hoabinhvna1.jpg',
            to : '/HoaBinh',
            trips : 200,
            hotel : 124,
            transport : 500,
        },
        {
            name : 'Ha Nam',
            image : 'https://cafefcdn.com/thumb_w/640//203337114487263232/2024/1/3/photo1704247889382-17042478895516275449-1704271252143833717266.jpg',
            to : '/HaNam',
            trips : 200,
            hotel : 124,
            transport : 500,
        },
        {
            name: 'Ha Noi',
            image : 'https://media.istockphoto.com/id/510206305/photo/city-lights.jpg?s=612x612&w=0&k=20&c=AZJfxbE8pLqwDLzA-x5jrikAauYVY5L-LxGz88cNQbk=',
            to : '/HaNoi',
            trips : 200,
            hotel : 124,
            transport : 500,
        },
        {
            name : 'Hai Phong',
            image : 'https://cdn.haiphong.gov.vn/gov-hpg/SiteFolders/Root/1/thuvienanh/8403.jpg',
            to : '/HaGiang',
            trips : 200,
            hotel : 124,
            transport : 500,
        },
        {
            name: 'Quang Ninh',
            image : 'https://upload.wikimedia.org/wikipedia/commons/d/d3/A_view_of_Ha_Long_Bay_from_the_high_point_of_Sun_Sot_cave_%2831520203451%29.jpg',
            to : '/QuanNinh',
            trips : 200,
            hotel : 124,
            transport : 500,
        },
        {
            name : 'Ha Giang',
            image : 'https://vitracotour.com/wp-content/uploads/2023/12/ha-giang-2.jpg',
            to : '/HaGiang',
            trips : 200,
            hotel : 124,
            transport : 500,
        },
        {
            name: 'Hoa Binh',
            image : 'https://images.vietnamtourism.gov.vn/en/images/2021/hoabinhvna1.jpg',
            to : '/HoaBinh',
            trips : 200,
            hotel : 124,
            transport : 500,
        },
        {
            name : 'Ha Nam',
            image : 'https://cafefcdn.com/thumb_w/640//203337114487263232/2024/1/3/photo1704247889382-17042478895516275449-1704271252143833717266.jpg',
            to : '/HaNam',
            trips : 200,
            hotel : 124,
            transport : 500,
        }
    ]
    return (
        <div className={cx('wrapper')}>
            {LOCATIONS.map((location,index) => (
                <Locations key={index}
                    name={location.name}
                    img={location.image}
                    trips = {location.trips}
                    hotel={location.hotel}
                    transport={location.transport}
                    to = {location.to}
                />
            ))
        }
        </div>
            
       
    );
}

export default Destinations;