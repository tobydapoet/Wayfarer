import classNames from 'classnames/bind';
import styles from './Tablet.module.scss';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Pin({ imgSrc }) {
    const [size,setSize] = useState('')

    const checkImageSize = (img) => {
        console.log('Width:', img.naturalWidth, 'Height:', img.naturalHeight);
        if (img.naturalHeight < img.naturalWidth) {
            setSize('small');
        } else if (img.naturalHeight === img.naturalWidth) {
            setSize('medium');
        } else {
            setSize('large');
        }
    };

    useEffect(() => {
        const img = new Image();
        img.src = imgSrc;
        img.onload = () => checkImageSize(img);
    }, [imgSrc]);


    return (
        <div className={cx('pin', size)}>
            <img src={imgSrc} alt="Pin" onLoad={checkImageSize}/> 
        </div>
    );
}
// onLoad được chạy trước khi ảnh được render vào nên phải dùng useEffect

export default Pin;
