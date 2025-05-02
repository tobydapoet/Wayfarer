import classNames from "classnames/bind";
import styles from "./ServicesPopper.module.scss";
import StarRating from "../../utils/StartRating";

const cx = classNames.bind(styles);

function ServicesPopper({ data, onClick, manage }) {
  return (
    <div className={cx("wrapper", { isManage: manage })} onClick={onClick}>
      <div className={cx("left-side")}>
        <img src={data.image} />
        <div className={cx("txt-content")}>
          <div>{data.name}</div>
          <StarRating rating={data.star} />
        </div>
      </div>
      <div className={cx("right-side")}>
        {data.price}$/{data.unit}
      </div>
    </div>
  );
}

export default ServicesPopper;
