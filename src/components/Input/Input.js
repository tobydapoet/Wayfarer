import classNames from "classnames/bind";
import styles from './Input.module.scss'

const cx = classNames.bind(styles)

function Input({placeholder,className}) {
    return ( <div className={cx('wrapper')}>
        <input placeholder={placeholder} className={className}/>
    </div>);
}

export default Input;