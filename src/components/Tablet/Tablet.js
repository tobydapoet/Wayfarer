import classNames from "classnames/bind";
import styles from "./Tablet.module.scss";
import { Link } from "react-router-dom";
import Pin from "./Pin";

const cx = classNames.bind(styles);

function Tablet({ data }) {
  const images = data.images || [];
  const title = data.title || "";
  const describe = data.describe || "";
  return (
    <div className={cx("wrapper")}>
      {images.length > 0 && (
        <div className={cx("imgs-container")}>
          <div className={cx("imgs")}>
            {images.length <= 2 ? (
              <>
                {images.length == 1 ? (
                  <>
                    <div className={cx("img-container")}>
                      <img src={images[0]} className={cx("img")} />
                    </div>
                  </>
                ) : (
                  <>
                    <div className={cx("vertical-img-container")}>
                      <img src={images[0]} className={cx("vertical-img")} />
                    </div>
                    <div className={cx("horizontal-img-container")}>
                      <img src={[images[1]]} className={cx("horizontal-img")} />
                    </div>
                  </>
                )}
              </>
            ) : (
              images.map((image, index) => (
                <Pin key={index} imgSrc={image} type="piece" />
              ))
            )}
          </div>
        </div>
      )}
      <div
        className={cx("content", {
          "full-width": images.length === 0,
        })}
      >
        {title && <div className={cx("title")}> {title} </div>}
        {describe && <div className={cx("describe")}> {describe} </div>}
        
      </div>
    </div>
  );
}

export default Tablet;
