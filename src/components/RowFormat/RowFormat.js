import classNames from "classnames/bind";
import styles from "./RowFormat.module.scss";

const cx = classNames.bind(styles);

function RowFormat({ data }) {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("content-container")}>
        {data.title && <div className={cx("title")}> {data.title} </div>}
        {data.describe && (
          <div className={cx("describe")}> {data.describe} </div>
        )}
      </div>
      {data.image && (
        <div className={cx("img-container")}>
          <img src={data.image} className={cx("img")} />
        </div>
      )}
    </div>
  );
}

export default RowFormat;
