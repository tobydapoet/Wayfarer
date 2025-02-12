import classNames from 'classnames/bind';
import styles from './Navbar.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import {publicRoutes} from '../../routes/routes'
import Button from '../Button'
import images from '../../assets/images'
import Modal from '../Modal'
import { useState } from 'react';
import Input from '../Input';

const cx = classNames.bind(styles)

function Navbar() {
    const [isOpen,setIsOpen] = useState(false)
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
                <Button rounded onClick={() => setIsOpen(true)} >Login</Button>
                <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                    <div className={cx('modal-title')}>Login</div>
                    <FontAwesomeIcon className={cx('xmark')} icon={faXmark} onClick={() => setIsOpen(false)}/>
                    <Input placeholder='Email'/>
                    <Input placeholder='Password'/>
                    <div className={cx('btn-wrapper')}>
                        <Button medium className={cx('login-btn')}>Login</Button>
                    </div>
                </Modal>
                <Button rounded>Register</Button>
            </div>

        </header> 
    );
}

export default Navbar;