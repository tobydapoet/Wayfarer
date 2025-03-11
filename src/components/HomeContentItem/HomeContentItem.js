import classNames from "classnames/bind";
import styles from "./HomeContentItem.module.scss";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function HomeContentItem({ data }) {
  const navigate = useNavigate();

  const handleRowClick = () => {
    navigate(`${data.title}`);
  };

  return (
    <div className={cx("wrapper")} onClick={handleRowClick} style={{ cursor: "pointer" }}>
      <div className={cx("title")}>{data.title}</div>
      <div className={cx("describe")}>{data.describe}</div>
      {data.images && (
        <div className={cx("images-container")}>
          {data.images.map((image, index) => (
            <img className={cx("image")} src={image} key={index} />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomeContentItem;
