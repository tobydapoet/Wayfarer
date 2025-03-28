import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar";
import { useLocation } from "react-router-dom";
import styles from "./MainLayout.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);



function MainLayout({ children }) {
  const location = useLocation();
  const isManagementPage = location.pathname.startsWith("/manage");
  return (
    <div className={cx("container")}>
      <Navbar />
      <div className={cx("content")}>{children}</div>
      {!isManagementPage && <Footer />}
    </div>
  );
}

export default MainLayout;