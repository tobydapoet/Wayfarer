import classNames from "classnames/bind";
import styles from "./BlogHomeItem.module.scss";

const cx = classNames.bind(styles);

function BlogHomeItem({ data, onClick }) {
  const dataTime = new Date(data.createdAt);
  return (
    <div className={cx("wrapper")} onClick={onClick}>
      <img src={data.image} />
      <div className={cx("txt-content")}>
        <div className={cx("author")}>{data?.clientId?.name}</div>
        <div className={cx("title")}>{data.title}</div>
        <div className={cx("time")}>{dataTime.toLocaleDateString()}</div>
      </div>
    </div>
  );
}

export default BlogHomeItem;
