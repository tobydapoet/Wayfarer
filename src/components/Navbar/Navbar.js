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
import { useRef, useState } from 'react';
import Input from '../Input';
import useForm from '../../hooks/useForm';
import AccountItem from '../AccountItem/AccountItem';

const cx = classNames.bind(styles)

function Navbar() {
    const [isOpenLogin,setIsOpenLogin] = useState(false)
    const [isOpenRegister,setIsOpenRegister] = useState(false)
    const [errors,setErrors] = useState({})
    const currentUser = false

    const [dataLogin,setDataLogin,resetDataLogin] = useForm({
        email : '',
        password : '',
    })

    const [dataRegister,setDataRegister,resetDataRegister] = useForm({
        email : '',
        password : '',
        repassword: '',
    })

    const handleChangeLogin = (e) => {
        setDataLogin(e);
        console.log(`${e.target.name} : ${ e.target.value}`)
    }

    const handleChangeRegister = (e) => {
        setDataRegister(e);
        console.log(`${e.target.name} : ${ e.target.value}`)
    }

    const handleValidate = () => {
        let newErrors = {}
        if(!dataRegister.email) {
            newErrors.email = 'Yêu cầu nhập email'
        }
        else if(!/\S+@\S+\.\S+/.test(dataRegister.email)){
            newErrors.email = 'Sai định dạng email'
        }

        if(!dataRegister.password) {
            newErrors.password = 'Yêu cầu nhập mật khẩu'
        }
        else if (dataRegister.password.length < 8) {
            newErrors.password = 'Mật khẩu tối thiểu 8 ký tự'
        }
        else if (dataRegister.password != dataRegister.repassword) {
            newErrors.repassword = 'Mật khẩu nhập lại không đúng'
        }

        if(!dataRegister.repassword) {
            newErrors.repassword = 'Yêu cầu nhập lại mật khẩu'
        }
        
        return newErrors
    }

    const handleCheckRegister = (e) => {
        e.preventDefault();
        const validationErrors = handleValidate()
        setErrors(validationErrors)
        if(Object.keys(validationErrors).length === 0 ) {
            console.log('Đăng ký thành công')
        }
    }

    const handleCloseRegister = () => {
        setErrors({})
        setIsOpenRegister(false)
        resetDataRegister()
    }
    return ( 
        <header className={cx('wrapper')}>
            <Link to={'/'} className={cx('logo-link')}><img src={images.logoDark} alt="Logo" /></Link>
            <div className={cx('inner')}> 
                {publicRoutes.map((route,index) => {
                    if(!route.layout && route.layout !== null && route.topic) 
                   return <Link key={index} className={cx('middle-btn')} to={route.path}>{route.topic}</Link>
                })}
            </div>

            {currentUser ? 
            <AccountItem 
                email = 'tnkoko123@gmail.com'
                avatar= 'https://cdn4.iconfinder.com/data/icons/occupation-and-people-avatar-vol-3-1/128/person_beach_male_people_avatar_tourist_glasses-512.png'
            /> :
                <div className={cx('to-user')}> 
                    <Button rounded onClick={() => setIsOpenLogin(true)} >Login</Button>
                    <Modal open={isOpenLogin} onClose={() => setIsOpenLogin(false)}>
                        <div className={cx('modal-title')}>Login</div>
                        <FontAwesomeIcon className={cx('xmark')} icon={faXmark} onClick={() => setIsOpenLogin(false)}/>
                        <Input placeholder='Email' name='email' value={dataLogin.email} onChange={handleChangeLogin} email/>
                        
                        <Input placeholder='Password' name='password' value={dataLogin.password} onChange={handleChangeLogin}/>
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
                    <Modal open={isOpenRegister} onClose={handleCloseRegister}>
                        <div className={cx('modal-title')}>Register</div>

                        <FontAwesomeIcon className={cx('xmark')} icon={faXmark} onClick={handleCloseRegister}/>

                        <Input placeholder='Email' name='email' value={dataRegister.email} onChange={handleChangeRegister} error = {errors.email}/>
                        <Input placeholder='Password' name='password' value={dataRegister.password} onChange={handleChangeRegister} error = {errors.password} />
                        <Input placeholder='Enter your password' name='repassword' value={dataRegister.repassword} onChange={handleChangeRegister} error={errors.repassword} />

                        <div className={cx('policy-wrapper')}>
                            <input type='checkbox' className={cx('policy')}/>
                            <a href=''>Accept our privacy policy</a>
                        </div>
    
                        <div className={cx('btn-wrapper')}>
                            <Button large className={cx('register-btn')} onClick={handleCheckRegister}>Register</Button>
                            <div className={cx('space-middle')}>
                                <span>Or</span> 
                            </div>
                            <div className={cx('social-register')}>
                                <Button large email leftIcon={<FontAwesomeIcon icon={faGoogle} />} className={cx('email-btn')}>Email</Button>
                                <Button facebook large leftIcon={<FontAwesomeIcon icon={faFacebook}/>}  className={cx('facebook-btn')}>Facebook</Button>      
                            </div>  
                        </div>
                        
                        
                    </Modal>
                    
                </div>
            }

        </header> 
    );
}

export default Navbar;