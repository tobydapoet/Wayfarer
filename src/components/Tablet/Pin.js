import classNames from "classnames/bind";
import styles from "./Tablet.module.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function Pin({ imgSrc, data, type, to, onClick }) {
  const [size, setSize] = useState("");

  const checkImageSize = (img) => {
    if (img.naturalHeight < img.naturalWidth) {
      setSize("small");
    } else if (img.naturalHeight === img.naturalWidth) {
      setSize("medium");
    } else {
      setSize("large");
    }
  };
  useEffect(() => {
    const img = new Image();
    img.src = data && data.image ? data.image : imgSrc || "";
    img.onload = () => checkImageSize(img);
    img.onerror = () => console.error("Failed to load image");
  }, [data, imgSrc]);

  let Comp = "div";
  if (to) {
    Comp = Link;
  }

  return (
    <Comp className={cx("pin", size, type)} onClick={onClick}>
      {data && (
        <div className={cx("content-overlay")}>
          <div className={cx("content-container")}>
            <div className={cx("title-container")}>{data.title}</div>
            {data.clientId && (
              <div className={cx("name-container")}>{data.clientId.name}</div>
            )}
          </div>
        </div>
      )}
      <img
        src={data && data.image ? data.image : imgSrc}
        alt="Pin"
        onLoad={checkImageSize}
      />
    </Comp>
  );
}
// onLoad được chạy trước khi ảnh được render vào nên phải dùng useEffect

export default Pin;
