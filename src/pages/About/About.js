import classNames from "classnames/bind";
import Tablet from "../../components/Tablet";
import styles from "./About.module.scss";
import Chart from "../../components/Chart/Chart";
import { useEffect, useState } from "react";
import RowFormat from "../../components/RowFormat/RowFormat";
import Member from "../../components/Member/Member";

const cx = classNames.bind(styles);

function About() {
  const CONTENTS = [
    {
      title: "WE HAVE THE BEST TOURS",
      describe:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis vulputate eros, iaculis consequat nisl. Nunc et suscipit urna. Integer elementum orci eu vehicula pretium. Donec bibendum tristique condimentum. Aenean in lacus ligula. Phasellus euismod gravida eros. Aenean nec ipsum aliquet, pharetra magna id, interdum sapien. Etiam id lorem eu nisl pellentesque semper. Nullam tincidunt metus placerat, suscipit leo ut, tempus nulla. Fusce at eleifend tellus. Ut eleifend dui nunc, non fermentum quam placerat non. Etiam venenatis nibh augue, sed eleifend justo tristique eu",
      image:
        "https://img.freepik.com/free-vector/night-landscape-with-lake-mountains-trees-coast-vector-cartoon-illustration-nature-scene-with-coniferous-forest-river-shore-rocks-moon-stars-dark-sky_107791-8253.jpg",
    },
    {
      title: "WE HAVE THE BEST TOURS",
      describe:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis vulputate eros, iaculis consequat nisl. Nunc et suscipit urna. Integer elementum orci eu vehicula pretium. Donec bibendum tristique condimentum. Aenean in lacus ligula. Phasellus euismod gravida eros. Aenean nec ipsum aliquet, pharetra magna id, interdum sapien. Etiam id lorem eu nisl pellentesque semper. Nullam tincidunt metus placerat, suscipit leo ut, tempus nulla. Fusce at eleifend tellus. Ut eleifend dui nunc, non fermentum quam placerat non. Etiam venenatis nibh augue, sed eleifend justo tristique eu",
      image:
        "https://www.incredibleasiajourneys.com/uploads/galleries/vietnam-travel-guide-map-QoZ7.jpg",
    },
    {
      title: "YOU WANT TO JOIN OUR TEAM?",
      describe:
        "If you are interested in joining our team. Please e-mail yourr CV to us. We'll will add you to ourr database and contact you should vacancies arise.",
    },
  ];
  const MEMBERS = [
    {
      name: "Nguyen Tung",
      avatar:
        "https://www.incredibleasiajourneys.com/uploads/galleries/vietnam-travel-guide-map-QoZ7.jpg",
    },
    {
      name: "Nguyen Viet Tung 124e1242343",
      avatar:
        "https://www.incredibleasiajourneys.com/uploads/galleries/vietnam-travel-guide-map-QoZ7.jpg",
    },
  ];

  const [size, setSize] = useState({ width: 0, height: 0 });

  const handleImgLoad = (e, index) => {
    console.log(e.target.naturalWidth, e.target.naturalHeight);
    setSize((prev) => ({
      ...prev,
      [index]: { width: e.target.naturalWidth, height: e.target.naturalHeight },
    }));
  };

  useEffect(() => {
    console.log("Size updated:", size);
  }, [size]);
  return (
    <div className={cx("wrapper")}>
      {CONTENTS.map((content, index) => (
        <div className={cx("container")} key={index}>
          {!content.image ||
          content.image.length === 0 ||
          size[index]?.height > size[index]?.width ? (
            <Tablet data={content} />
          ) : (
            <RowFormat data={content} />
          )}
          {content.image && content.image.length > 0 && (
            <img
              src={content.image}
              alt="hidden"
              onLoad={(e) => handleImgLoad(e, index)}
              style={{ display: "none" }}
            />
          )}
        </div>
      ))}
      <div className={cx("members-wrapper")}>
        <div className={cx("members-title")}>Our team</div>
        <div className={cx("members-container")}>
          {MEMBERS.map((member, index) => (
            <Member data={member} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
