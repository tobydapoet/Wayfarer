import { Fragment } from "react";
import ReactDOM from 'react-dom'
import classNames from "classnames/bind";
import styles from './Modal.module.scss'

const cx = classNames.bind(styles)

function Modal({children,open,onClose}) {
    if(!open) 
    {
        return null
    }
    return (
        <div className={cx('modal-overlay')} onClick={onClose}>
            <div className={cx('modal-content')} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}

export default Modal;