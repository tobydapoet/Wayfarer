import classNames from "classnames/bind";
import Tablet from "../../components/Tablet";
import styles from "./About.module.scss";
import Chart from "../../components/Chart/Chart";

const cx = classNames.bind(styles);

function About() {
  const infor = {
    title: "WE HAVE THE BEST TOURS",
    describe:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis vulputate eros, iaculis consequat nisl. Nunc et suscipit urna. Integer elementum orci eu vehicula pretium. Donec bibendum tristique condimentum. Aenean in lacus ligula. Phasellus euismod gravida eros. Aenean nec ipsum aliquet, pharetra magna id, interdum sapien. Etiam id lorem eu nisl pellentesque semper. Nullam tincidunt metus placerat, suscipit leo ut, tempus nulla. Fusce at eleifend tellus. Ut eleifend dui nunc, non fermentum quam placerat non. Etiam venenatis nibh augue, sed eleifend justo tristique eu",
    images: [
      "https://www.incredibleasiajourneys.com/uploads/galleries/vietnam-travel-guide-map-QoZ7.jpg",
    ],
  };
  const growth = {
    lastYear: {
      year: 2024,
      clients: 1642,
      profit: 100,
      sales : 500,
    },
    thisYear: {
      year: 2025,
      clients: 9000,
      profit: 120,
      sales : 200,
    },
  };

  const commonKeys = Object.keys(growth.lastYear).filter(
    (key) => key in growth.thisYear
  );

  return (
    <div className={cx("wrapper")}>
      <Tablet data={infor} />
      <div className={cx("year-static")}>
        <div className={cx("content")}>
          <div className={cx("title")}>YEAR STATICS</div>
          <div className={cx("description")}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            quis vulputate eros, iaculis consequat nisl. Nunc et suscipit urna.
            Integer elementum orci eu vehicula pretium. Donec bibendum tristique
            condimentum. Aenean in lacus ligula.
          </div>
        </div>
        {commonKeys.length > 1 && (
          <div className={cx("chart")}>
            <Chart last={growth.lastYear} current={growth.thisYear} />
          </div>
        )}
      </div>
    </div>
  );
}

export default About;
