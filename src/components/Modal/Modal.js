import { Fragment, useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Modal.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function Modal({ children, open, onClose, test, form, style }) {
  const [isVisibale, setIsVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [open]);

  if (!open && !isVisibale) {
    return null;
  }

  return (
    <div className={cx("modal-overlay")} onClick={onClose}>
      <div
        className={cx("modal-container", { "modal-show": open, test, form })}
        style={style}
        onClick={(e) => e.stopPropagation()}
      >
        {form && (
          <FontAwesomeIcon
            className={cx("xmark")}
            icon={faXmark}
            onClick={onClose}
          />
        )}
        <div
          className={cx("modal-content")}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
