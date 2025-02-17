import classNames from 'classnames/bind'
import videos from '../../assets/videos/index'
import styles from './CinematicVideo.module.scss'

const cx = classNames.bind(styles)
function CinematicVideo() {
    return ( 
        <div className={cx('video-container')}>
            <video className={cx('introduce')} style={{display:'fixed'}} src={videos.videoTheme} autoPlay muted loop></video> 
        </div>);
}

export default CinematicVideo;