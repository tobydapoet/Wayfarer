import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faTelegram } from '@fortawesome/free-brands-svg-icons';
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';

import styles from './Footer.module.scss';
import images from '../../assets/images';

const cx = classNames.bind(styles)
function Footer() {
    const PARTNERS = [
        {
            name: 'Vietnam Airlines',
            logo : 'https://icolor.vn/wp-content/uploads/2023/08/logo-vietnam-airlines-2.png',
        },
        {
            name: 'VietTravel',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Vietravel_Logo.png'
        },
        {
            name : 'Bamboo Airways',
            logo : 'https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-Bamboo-Airways-V.png',
        },
        {
            name : 'FLC',
            logo : 'https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-FLC-Group-V.png',
        },
        {
            name : 'AZERAI',
            logo : 'https://owa.bestprice.vn/images/brands/uploads/azerai-60a5d7eae4847.png',
        },
        {
            name : 'VINPEARL',
            logo : 'https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-Vinpearl-Te.png',
        },
        {
            name : 'Emirates',
            logo : 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/725px-Emirates_logo.svg.png',
        }
    ]

    const [changeItem, setChangeItem] = useState(PARTNERS.slice(0,5))
    const [currentIndex, setCurrentIndex] = useState(4)

    useEffect(() => {
        const interval = setInterval(() => {
            setChangeItem((prev) => {
                const nextIndex = (currentIndex + 1) % PARTNERS.length;
                setCurrentIndex(nextIndex);
                return [...prev.slice(1), PARTNERS[nextIndex]];
            });
        }, 5000);
    
        return () => clearInterval(interval);
    }, [currentIndex]);
    

    return ( <div className={cx('wrapper')}>
        <div className={cx('partners')}>
            {changeItem.map((partner,index) => (
                <img key={index} src={partner.logo} alt={partner.name}  className={cx('partner-image')} 
                />
            ))}
        
        </div>
        <div className={cx('content')}>
            <div className={cx('info')}>
                <div>Address: 53 P. Nguyen Dinh Chieu, Le Dai Hanh, Hoan Kiem, Ha Noi</div>
                <div>tnkoko123@gmail.com</div>
                <div>Phone: *-***-***-***</div>
                <div className={cx('media')}>
                    <a href=''><FontAwesomeIcon className={cx('icon')} icon={faFacebook} /></a>
                    <a href=''><FontAwesomeIcon className={cx('icon')} icon={faInstagram} /></a>
                    <a href=''><FontAwesomeIcon className={cx('icon')} icon={faTelegram} /></a>
                </div>
            </div>
            <Link to={'/'} className={cx('logo-link')}><img src={images.logoLight} alt="Logo" /></Link>
        </div>
       
    </div> );
}

export default Footer;