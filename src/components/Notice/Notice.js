import classNames from "classnames/bind";
import styles from "./Notice.module.scss";
import Modal from "../Modal";
import Button from "../Button";

const cx = classNames.bind(styles);

function Notice({ open, onClose, content, onConfirm, warn }) {
  return (
    <Modal open={open} onClose={onClose}>
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
    </Modal>
  );
}

export default Notice;
