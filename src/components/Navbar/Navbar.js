import classNames from 'classnames/bind';
import styles from './Navbar.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import {publicRoutes} from '../../routes/routes'
import Button from '../Button'
import images from '../../assets/images'
import Modal from '../Modal'
import { useState } from 'react';
import Input from '../Input';

const cx = classNames.bind(styles)

function Navbar() {
    const [isOpenLogin,setIsOpenLogin] = useState(false)
    const [isOpenRegister,setIsOpenRegister] = useState(false)
    return ( 
        <header className={cx('wrapper')}>
            <Link to={'/'} className={cx('logo-link')}><img src={images.logoDark} alt="Logo" /></Link>
            <div className={cx('inner')}> 
                {publicRoutes.map((route,index) => {
                    if(!route.layout && route.layout !== null)
                   return <Link key={index} className={cx('middle-btn')} to={route.path}>{route.topic}</Link>
                })}
            </div>
            <div className={cx('to-user')}> 
                <Button rounded onClick={() => setIsOpenLogin(true)} >Login</Button>
                <Modal open={isOpenLogin} onClose={() => setIsOpenLogin(false)}>
                    <div className={cx('modal-title')}>Login</div>
                    <FontAwesomeIcon className={cx('xmark')} icon={faXmark} onClick={() => setIsOpenLogin(false)}/>
                    <Input placeholder='Email'/>
                    <Input placeholder='Password'/>
                    <div className={cx('save-forgot-wrapper')}>
                        <div className={cx('save-pass')}>
                            <input type='checkbox' className={cx('save-btn')}/>
                            <div>Save your password</div>
                        </div>
                        <a className={cx('forgot-pass')} href=''>Forgot password?</a>
                    </div>
                    <div className={cx('btn-wrapper')}>
                        <Button large className={cx('login-btn')}>Login</Button>
                    </div>
                </Modal>
                <Button rounded onClick={() => setIsOpenRegister(true)}>Register</Button>
                <Modal open={isOpenRegister} onClose={() => setIsOpenRegister(false)}>
                    <div className={cx('modal-title')}>Register</div>
                    <FontAwesomeIcon className={cx('xmark')} icon={faXmark} onClick={() => setIsOpenRegister(false)}/>
                    <Input placeholder='Email'/>
                    <Input placeholder='Password'/>
                    <Input placeholder='Enter your password'/>
                    <div className={cx('policy-wrapper')}>
                        <input type='checkbox' className={cx('policy')}/>
                        <a href=''>Accept our privacy policy</a>
                    </div>
   
                    <div className={cx('btn-wrapper')}>
                        <Button large className={cx('register-btn')}>Register</Button>
                        <div className={cx('space-middle')}>
                            <span>Or</span> 
                        </div>
                        <div className={cx('social-register')}>
                            <Button large email leftIcon={<FontAwesomeIcon icon={faGoogle} />} className={cx('email-btn')}>Register with email</Button>
                            <Button facebook large leftIcon={<FontAwesomeIcon icon={faFacebook}/>}  className={cx('facebook-btn')}>Register with facebook</Button>      
                        </div>  
                    </div>
                    
                    
                </Modal>
                
            </div>

        </header> 
    );
}

export default Navbar;