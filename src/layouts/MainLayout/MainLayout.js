import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar";
import styles from './MainLayout.module.scss'
import classNames from "classnames/bind";

const cx = classNames.bind(styles)

function MainLayout({children}) {
    return (
        <div className={cx('container')}>
            <Navbar />
            <div className={cx('content')}>
                {children}
            </div>
            <Footer />
        </div>
    );
}

export default MainLayout;