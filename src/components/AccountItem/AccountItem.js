import classNames from "classnames/bind";
import styles from './AccountItem.module.scss'
import { Link } from "react-router-dom";

const cx = classNames.bind(styles)

function AccountItem({email,avatar}) {
    return ( <Link to={`/${email}`} className={cx('wrapper')}>
        <img src = {avatar} className={cx('avatar')}/>
        <div className={cx('email')}>{email}</div>
    </Link>);
}

export default AccountItem;