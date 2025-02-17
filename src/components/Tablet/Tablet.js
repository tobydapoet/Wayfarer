import classNames from "classnames/bind";
import styles from './Tablet.module.scss'
import { Link } from "react-router-dom";
import Pin from "./Pin";

const cx = classNames.bind(styles)

function Tablet({data}) {
    const images = data.images || [];
    const title = data.title || '';
    const describe = data.describe || '';
    const viewMore = data.viewMore || '';
    return ( 
        <div className={cx('wrapper')}>
            {images.length >0 &&
            <div className={cx('imgs-container')}>
                <div className={cx('imgs')}>
                    {images.length <= 2 ? (
                        <>
                            <div className={cx('vertical-img-container')}>
                                <img src= {images[0]} className={cx('vertical-img')}/> 
                            </div>
                            {images[1] && 
                                <div className={cx('horizontal-img-container')}>
                                    <img src= {[images[1]]} className={cx('horizontal-img')} />  
                                </div>   
                            }
                        </>
                    ) : (
                        images.map((image,index) => <Pin key={index} imgSrc={image}/>)
                    )
                }
                </div>
            </div>
            }
            <div className={cx('content', {
                'full-width':  images.length === 0
            })}>
                {title && <div className={cx('title')}> {title} </div>}
                {describe && <div className={cx('describe')} > {describe} </div>}
                {viewMore && <Link to={viewMore} className={cx('view-more')}> View more</Link>}
            </ div>     
        </div>);
}

export default Tablet;