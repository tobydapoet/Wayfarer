import classNames from "classnames/bind";
import styles from "./Tablet.module.scss";
import { Link } from "react-router-dom";
import Pin from "./Pin";

const cx = classNames.bind(styles);

function Tablet({ data }) {
  const images = data.images || [];
  const singleImg = data.image || "";
  const title = data.title || "";
  const describe = data.describe || "";
  console.log(data.image);
  return (
    <div className={cx("wrapper")}>
      {images.length > 0 || singleImg ? (
        <div className={cx("imgs-container")}>
          <div className={cx("imgs")}>
            {images.length > 0 ? (
              images.length <= 2 ? (
                <>
                  {images.length === 1 ? (
                    <div className={cx("img-container")}>
                      <img src={images[0]} className={cx("img")} alt="img" />
                    </div>
                  ) : (
                    <>
                      <div className={cx("vertical-img-container")}>
                        <img
                          src={images[0]}
                          className={cx("vertical-img")}
                          alt="img"
                        />
                      </div>
                      <div className={cx("horizontal-img-container")}>
                        <img
                          src={images[1]}
                          className={cx("horizontal-img")}
                          alt="img"
                        />
                      </div>
                    </>
                  )}
                </>
              ) : (
                images.map((image, index) => (
                  <Pin key={index} imgSrc={image} type="piece" />
                ))
              )
            ) : (
              <div className={cx("img-container")}>
                <img src={singleImg} className={cx("img")} alt="img" />
              </div>
            )}
          </div>
        </div>
      ) : null}
      <div
        className={cx("content", {
          "full-width": images.length === 0 && !singleImg,
        })}
      >
        {title && <div className={cx("title")}> {title} </div>}
        {describe && <div className={cx("describe")}> {describe} </div>}
      </div>
    </div>
  );
}

export default Tablet;
