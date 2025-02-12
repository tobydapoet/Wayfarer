import classNames from 'classnames/bind';
import styles from './Navbar.module.scss'
import { Link } from 'react-router-dom';
import {publicRoutes} from '../../routes/routes'
import Button from '../Button'
import images from '../../assets/images'

const cx = classNames.bind(styles)

function Navbar() {
    return ( 
        <header className={cx('wrapper')}>
            <img  className={cx('logo-link')} src={images.logoDark} alt="Logo" />
            <div className={cx('inner')}> 
                {publicRoutes.map((route,index) => {
                    if(!route.layout && route.layout !== null)
                   return <Link key={index} className={cx('middle-btn')} to={route.path}>{route.topic}</Link>
                })}
            </div>
            <div className={cx('to-user')}> 
                <Button rounded>Login</Button>
                <Button rounded>Register</Button>
            </div>

        </header> 
    );
}

export default Navbar;