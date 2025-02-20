import classNames from "classnames/bind";
import styles from './PlacementItem.module.scss'
import { Link } from "react-router-dom";
import Button from "../Button";

const cx = classNames.bind(styles)

function PlacementItem({type, data}) {
    const contentMap = {
        trips: {
            name : data.name,
            city : data.city,
            star : data.star,
            reviews : data.reviews,
            img : data.img,
            description : data.description,
        },

        hotels: {
            name : data.name,
            img : data.img,
            description : data.description,
            reviews : data.reviews
        },

        transports: {
            name : data.name,
            img : data.img,
            description : data.description,
            reviews : data.reviews
        }
    }
    const content = contentMap[type] || {}
    return ( 
        <div className={cx('wrapper')}>
            {content && 
            <div className={cx('container')}>
                <img src={content.img}  />
                <div className={cx('content')}>
                    <div className={cx('header')}>
                        <div className={cx('name')}>{content.name}</div>
                        <div className={cx('reviews')}>{`${content.reviews} reviews`}</div>
                    </div>
                    <div className={cx('star')}>{content.star}</div>
                    <div className={cx('description')}>{content.description}</div>
                    <Link className={cx('view-more')}><Button large>Show more</Button></Link>
                </div>
            </div>}
        </div>
        
     );
}

export default PlacementItem;