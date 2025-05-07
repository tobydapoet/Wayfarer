import classNames from "classnames/bind";
import styles from "./BlogFormat.module.scss";

const cx = classNames.bind(styles);

function BlogFormat({ data, vertical }) {
  return (
    <div className={cx("wrapper", { isVertical: vertical })}>
      <div className={cx("content-container", { isVertical: vertical })}>
        {data.title && (
          <div className={cx("title", { isVertical: vertical })}>
            {" "}
            {data.title}{" "}
          </div>
        )}
        {data.describe && (
          <div className={cx("describe")}> {data.describe} </div>
        )}
      </div>
      {data.image && (
        <div className={cx("img-container", { isVertical: vertical })}>
          <img
            src={data.image}
            className={cx("img", { isVertical: vertical })}
          />
        </div>
      )}
    </div>
  );
}

export default BlogFormat;
