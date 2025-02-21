import classNames from "classnames/bind";
import styles from './PlacementItem.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as emptyStar} from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import Button from "../Button";
import { faStarHalfStroke,faStar,faPersonChalkboard,faShop,faMapLocationDot,faGuitar,faBurger,faMugHot, faCampground, faExclamation, faPersonSwimming, faFish } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";


const cx = classNames.bind(styles)

function PlacementItem({type, data}) {
    useEffect(() => {
    console.log("Data received:", data);
}, [data]);
    const defaultActivities = ["souvenir", "visit", "campfire","music","food","drink","travel",'swim','fishing'];

    const contentMap = {
        trips: {
            name : data.name,
            city : data.city,
            star : data.star,
            reviews : data.reviews,
            img : data.img,
            description : data.description,
            activities : data.activities ? data.activities.split(',') : []
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
    
    const StarRating = ({rating}) => {
        const stars = []
        const roundedRating = Math.round(rating * 2) / 2 
        for(let i=0;i<5;i++){
            if(i < Math.floor(roundedRating)){
                stars.push(<FontAwesomeIcon icon={faStar} color="#FFD700" />)
            }
            else if(i + 0.5 === roundedRating) {
                stars.push(<FontAwesomeIcon icon={faStarHalfStroke} color="#FFD700"/>)
            }
            else {
                stars.push(<FontAwesomeIcon icon={emptyStar} color="#FFD700" />)
            }
        }
        return <div>{stars}</div>
    }

    const getIcon = (activity) => {
        const icons = {
            souvenir : faShop,
            visit : faPersonChalkboard,
            campfire : faCampground,
            music : faGuitar,
            food: faBurger,
            drink : faMugHot,
            travel : faMapLocationDot,
            swim : faPersonSwimming,
            fishing : faFish,
        }
        return icons[activity] || faExclamation
    }

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
                    <div className={cx('star')}><StarRating rating={content.star} /></div>
                    <div className={cx('description')}>{content.description}</div>
                    <Link className={cx('view-more')}><Button large>Show more</Button></Link>
                    {
                        content.activities && 
                        <div className={cx('activities-container')}>
                        {defaultActivities.map(activity => 
                            content.activities.includes(activity) && (
                                <FontAwesomeIcon key={activity} icon={getIcon(activity)} />
                            )
                        )}
                    </div>
                    }
                </div>
            </div>}
        </div>
        
     );
}

export default PlacementItem;