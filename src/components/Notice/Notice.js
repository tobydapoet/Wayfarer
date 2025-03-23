import classNames from "classnames/bind";
import styles from "./Notice.module.scss";
import Button from "../Button";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles);

function Notice({ open, onClose, content, onConfirm, warn }) {
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
    <div className={cx("notice-overlay")} onClick={onClose}>
      <div
        className={cx("notice-container-content", {
          "notice-show": open,
        })}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={cx("notice-container")}>
          <div className={cx("notice-content")}>{content}</div>
          <div className={cx("btn-container")}>
            {!warn && (
              <Button large onClick={onConfirm}>
                Yes
              </Button>
            )}

            <Button large onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notice;
