import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faCar, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import styles from './Locations.module.scss'
import Button from '../Button'


const cx = classNames.bind(styles)
function Locations({img, name, to, trips, hotel, transport}) {

    return ( 
    <div className={cx('wrapper')} >
            <img className ={cx('img')} src={img} />
            <div className={cx('overlay')}>
                <div className={cx('location')}>
                    <div className ={cx('name')}>{name}</div>
                </div>
                <div className={cx('info')}>
                    {trips && 
                    <div className={cx('trips-container')}>
                        <FontAwesomeIcon icon={faLocationDot} />
                        <div> {trips}</div>
                    </div>}
                    {hotel && 
                    <div className={cx('hotel-container')}>
                        <FontAwesomeIcon icon={faBed} />
                        <div> {hotel}</div>
                    </div>}
                    {transport && 
                    <div className={cx('transport-container')}>
                        <FontAwesomeIcon icon={faCar} />
                        <div> {transport}</div>
                    </div>}
                </div>
               
            </div>
            <Link className={cx('view')} to={`/destinations/${to.replace(/^\//, '')}`}> View more </Link>
    </div>);
}

export default Locations;