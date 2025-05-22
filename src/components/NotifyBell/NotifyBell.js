import classNames from "classnames/bind";
import styles from "./NotifyBell.module.scss";
import { useContext, useState } from "react";
import { NotifyContext } from "../../contexts/NotifyContext";
import HeadlessTippy from "@tippyjs/react/headless";
import Popper from "../Popper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { getCurrentUser } from "../../utils/currentUser";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

const user = getCurrentUser();

function NotifyBell() {
  const { allNotifications, handleReadNotifications } =
    useContext(NotifyContext);
  const [isResultVisible, setIsResultVisible] = useState(false);
  const navigate = useNavigate();
  console.log(allNotifications);
  const handleOnCloseResult = () => {
    setIsResultVisible(false);
    if (
      allNotifications.some(
        (notification) =>
          notification?.clientId?._id === user?._id &&
          notification.isRead === false
      )
    ) {
      handleReadNotifications();
    }
  };
  const renderResult = (data) => {
    switch (data.relatedType) {
      case "Blog":
        return (
          <div
            className={cx("blog-container")}
            onClick={() => navigate(`/blogs/${data.relatedId._id}`)}
          >
            <div className={cx("left-side")}>
              <div className={cx("title")}>
                {data.relatedType}: {data.relatedId.title}
              </div>
              <div className={cx("message")}>{data.message}</div>
            </div>
            <div className={cx("right-side")}>
              <img src={data.relatedId.image} />
            </div>
          </div>
        );
      case "Bill":
        return (
          <div
            className={cx("bill-container")}
            onClick={() => navigate(`/${data.clientId.email}/processing`)}
          >
            <div className={cx("left-side")}>
              <div className={cx("title")}>
                {data.relatedType}:{" "}
                {data?.relatedId?.scheduleId?.destinationId?.name}
              </div>
              <div className={cx("message")}>{data.message}</div>
            </div>
            <div className={cx("right-side")}>
              <img src={data?.relatedId?.scheduleId?.destinationId?.image} />
            </div>
          </div>
        );
      case "Contact":
        return (
          <div
            className={cx("contact-container")}
            onClick={() => navigate(`/contact/${data.relatedId._id}`)}
          >
            <div className={cx("title")}>
              {data.relatedType}: {data.relatedId.title}
            </div>
            <div className={cx("message")}>{data.message}</div>
          </div>
        );
    }
  };

  return (
    <div className={cx("wrapper")}>
      <HeadlessTippy
        interactive
        visible={
          isResultVisible &&
          allNotifications.filter(
            (notifications) => notifications?.clientId?._id === user._id
          ).length > 0
        }
        appendTo={() => document.body}
        placement="bottom"
        onClickOutside={() => {
          handleOnCloseResult();
        }}
        render={(attrs) => (
          <div
            className={cx("search-result-container")}
            tabIndex="-1"
            {...attrs}
          >
            <Popper className={cx("search-result")}>
              {allNotifications
                .filter(
                  (notifications) => notifications?.clientId?._id === user._id
                )
                .map((item) => (
                  <div
                    key={item._id}
                    className={cx("result-item", { isNew: !item.isRead })}
                    onClick={() => handleOnCloseResult()}
                  >
                    <div>{renderResult(item)}</div>
                  </div>
                ))}
            </Popper>
          </div>
        )}
      >
        <div className={cx("bell-container")}>
          {allNotifications.some(
            (notification) =>
              notification?.clientId?._id === user?._id &&
              notification.isRead === false
          ) && (
            <div className={cx("notify-notread")}>
              {
                allNotifications.filter(
                  (notification) =>
                    notification?.clientId?._id === user?._id &&
                    notification.isRead === false
                ).length
              }
            </div>
          )}
          <div
            className={cx("notify")}
            onClick={() => {
              if (isResultVisible === true) {
                handleOnCloseResult();
              } else {
                setIsResultVisible(true);
              }
            }}
          >
            <FontAwesomeIcon icon={faBell} />
          </div>
        </div>
      </HeadlessTippy>
    </div>
  );
}

export default NotifyBell;
