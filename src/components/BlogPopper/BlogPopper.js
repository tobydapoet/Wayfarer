import classNames from "classnames/bind";
import styles from "./BlogPopper.module.scss";

const cx = classNames.bind(styles);
function BlogPopper({ manage, noAdd, data, onClick }) {
  return (
    <div
      className={cx("wrapper", {
        isManage: manage,
        isNoAdd: noAdd,
      })}
      onClick={onClick}
    >
      <div className={cx("main-info")}>
        {!manage && <img src={data.image} />}
        <div className={cx("text-info")}>
          <div className={cx("title")}>{data.title}</div>
          <div className={cx("owner")}>{data.client.name}</div>
        </div>
      </div>
      {manage && (
        <div
          className={cx("status", {
            approved: data.status === true,
            notApproved: data.status !== true,
          })}
        >
          {data.status === true ? "Approved" : "Not approve yet"}
        </div>
      )}
    </div>
  );
}

export default BlogPopper;
