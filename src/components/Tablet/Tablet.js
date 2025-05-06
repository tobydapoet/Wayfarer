import classNames from "classnames/bind";
import styles from "./Tablet.module.scss";
import { useEffect, useState } from "react";
import Pin from "./Pin";

const cx = classNames.bind(styles);

function Tablet({ image, title, content, showMore, author }) {
  const [textContent, setTextContent] = useState("");
  const [displayImages, setDisplayImages] = useState([]);

  useEffect(() => {
    if (content) {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = content;

      // Lấy ảnh từ content
      const imgElements = tempDiv.querySelectorAll("img");
      const contentImages = Array.from(imgElements).map((img) => img.src);

      // Gỡ ảnh khỏi text
      imgElements.forEach((img) => img.remove());
      setTextContent(tempDiv.innerText);

      // Ưu tiên ảnh từ content
      if (contentImages.length > 0) {
        setDisplayImages(contentImages);
      } else if (image) {
        setDisplayImages([image]); // dùng ảnh truyền từ props
      }
    } else if (image) {
      setDisplayImages([image]);
    }
  }, [content, image]);

  return (
    <div className={cx("wrapper")}>
      {displayImages.length > 0 && (
        <div className={cx("imgs-container")}>
          <div className={cx("imgs")}>
            {displayImages.length === 1 ? (
              <div className={cx("img-container")}>
                <img src={displayImages[0]} className={cx("img")} alt="img" />
              </div>
            ) : displayImages.length > 9 ? (
              <div className={cx("pin-container")}>
                {displayImages.map((img, index) => (
                  <Pin key={index} imgSrc={img} type="piece" />
                ))}
              </div>
            ) : (
              <div className={cx("straight-render-container")}>
                {displayImages.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    className={cx("img")}
                    alt={`img-${index}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div
        className={cx("content", { "full-width": displayImages.length === 0 })}
      >
        {author && <div className={cx("author")}>{author}</div>}
        {title && <div className={cx("title")}>{title}</div>}
        {textContent && (
          <>
            <div className={cx("describe")}>{textContent}</div>
            <div className={cx("show-more")} onClick={showMore}>
              Show more
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Tablet;
