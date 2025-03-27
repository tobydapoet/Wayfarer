import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { ToIcon } from "../../components/Icons";
import CinematicVideo from "../../components/CinematicVideo/CinematicVideo";
import styles from "./Home.module.scss";
import Tablet from "../../components/Tablet/Tablet";
import { useState } from "react";

const cx = classNames.bind(styles);

function Home() {
  const PARTNERS = [
    {
      name: "Vietnam Airlines",
      logo: "https://icolor.vn/wp-content/uploads/2023/08/logo-vietnam-airlines-2.png",
    },
    {
      name: "VietTravel",
      logo: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Vietravel_Logo.png",
    },
    {
      name: "Bamboo Airways",
      logo: "https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-Bamboo-Airways-V.png",
    },
    {
      name: "FLC",
      logo: "https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-FLC-Group-V.png",
    },
    {
      name: "AZERAI",
      logo: "https://owa.bestprice.vn/images/brands/uploads/azerai-60a5d7eae4847.png",
    },
    {
      name: "VINPEARL",
      logo: "https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-Vinpearl-Te.png",
    },
    {
      name: "Emirates",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/725px-Emirates_logo.svg.png",
    },
  ];
  const CONTENTS = [
    {
      title: "Magical memories,Bespoke experiences",
      describe:
        "Once you have travelled the voyage never ends. Natalie & Charlie will open a world of wonders and create magical memories that will stay with you far beyond your travels. Diverge from the typical tourist destinations in favour of unique, authentic experiences. Experiences designed in the most inspiring surroundings that will be yours, and yours only. Journeys that create memorable moments and Natalie & Charlie’s bespoke itineraries will make this happen. The wonders of the world are within your reach.",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9bW-uF_gmJVRZoODKb_K7w-EfW-VgL9GIxw&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyL9AV1PxTd5uQ4w1RjckwmAknM-AdizrsYA&s",
        "https://wallpapers-all.com/uploads/posts/2016-11/1_vietnam.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS70QgcSGEc89LYeatd0gT0NNiNolHIEFiOoA&s",
        "https://vietnam.travel/sites/default/files/inline-images/Wallpaper_Con%20Dao_Vietnam%20Tourism_0.jpg",
        "https://i.ex-cdn.com/nongnghiep.vn/files/bao_in/2022/12/08/te-rau-4-1622_20221206_592-152934.jpeg",
        "https://wallpaper.forfun.com/fetch/d3/d3935bc5002ba8663d358186b8b0bbe9.jpeg",
        "https://getwallpapers.com/wallpaper/full/4/4/4/722353-beautiful-vietnam-wallpapers-1920x1080-for-tablet.jpg",
        "https://image.vietnam.travel/sites/default/files/styles/large/public/2022-05/shutterstock_1303493764_1.jpg?itok=AhlENvUY",
        "https://vietnam.travel/sites/default/files/inline-images/Wallpaper_Sapa_Vietnam%20Tourism.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS89RvVD-3cbi2OXOEp94wT8dwlEUW4U-zpYA&s",
        "https://i.natgeofe.com/k/d2701667-c426-4a1b-8d75-d01bdc387fdc/vietnam-ha-long-bay_16x9.jpg?w=1200",
      ],
    },

    {
      title: "Tailor Made Journeys",
      describe:
        "N&C design itineraries for our clients that others simply cannot, whether around a theme or a private experience. Our team of highly experienced consultants listen, understand and then create a tailor-made journey for you. We believe that travel should not only enrich your perception, understanding, and appreciation of the World, but that it should also allow you to support the local communities you visit. We enable you to explore with purpose, enthusiasm, and a new-found appreciation for the art of travel. Experience diverse cultures; immerse yourself in authentic experiences; take back the moment and reconnect with a joyous attitude towards life.",
    },

    {
      title: "We are Experience Designers",
      describe:
        "Our team of highly experienced travel designers will guide you from beginning to end as you embark on a tailor-made journey of distinction, enjoying truly exclusive and authentic cultural experiences. We can fulfil your bucket-list dreams.",
      images: [
        "https://image.vietnam.travel/sites/default/files/styles/large/public/2022-05/shutterstock_1303493764_1.jpg?itok=AhlENvUY",
        "https://i.natgeofe.com/k/d2701667-c426-4a1b-8d75-d01bdc387fdc/vietnam-ha-long-bay_16x9.jpg?w=1200",
      ],
    },
  ];


  return (
    <>
      <div className={cx("page-header")}>
        <CinematicVideo />
        <div className={cx("content")}>
          <div className={cx("brand")}>
            <div className={cx("brand-name")}>Farwayer</div>
            <div className={cx("brand-title")}>Farer and Lover</div>
          </div>
          <div className={cx("list")}>
            <Link to="/destinations" className={cx("item-container")}>
              <div className={cx("booking")}>Plan your journey</div>
              <span className={cx("icon-container")}>
                <ToIcon className={cx("icon")} />
              </span>
            </Link>
          </div>
          <div className={cx("affiliate")}>
            {PARTNERS.map((partner, index) => (
              <img key={index} src={partner.logo} alt={partner.name} />
            ))}
          </div>
        </div>
      </div>

      <div className={cx("main-infor")}>
        {CONTENTS.map((content, index) => (
          <Tablet data={content} key={index} />
        ))}
      </div>
    </>
  );
}

export default Home;
