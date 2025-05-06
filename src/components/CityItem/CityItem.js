import classNames from "classnames/bind";
import styles from "./CityItem.module.scss";

const cx = classNames.bind(styles);

function CityItem({ data, onClick }) {
  return (
    <div className={cx("wrapper")} onClick={onClick}>
      <img src={data.image} />
      <div className={cx("city-name")}>{data.name}</div>
    </div>
  );
}

export default CityItem;
