import { Fragment, useEffect, useState } from "react";
import ReactDOM from 'react-dom'
import classNames from "classnames/bind";
import styles from './Modal.module.scss'

const cx = classNames.bind(styles)

function Modal({children,open,onClose}) {
    const [isVisibale, setIsVisible] = useState(false)
    
    useEffect(() => {
        if(open) 
            {
                setIsVisible(true)
            }
            else {
                setIsVisible(false)
            }
    },[open])
    
    if(!open && !isVisibale) {
        return null
    }

    return (
        <div className={cx('modal-overlay')} onClick={onClose}>
            <div className={cx('modal-content', {'modal-show': isVisibale})} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}

export default Modal;