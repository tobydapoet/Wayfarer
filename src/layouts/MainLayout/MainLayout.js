import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar";
import { useLocation } from "react-router-dom";
import styles from "./MainLayout.module.scss";
import classNames from "classnames/bind";
import { AccountProvider } from "../../contexts/AccountContext";
import ScrollHeader from "../../components/ScrollHeader";

const cx = classNames.bind(styles);

function MainLayout({ children }) {
  const location = useLocation();
  const isManagementPage = location.pathname.startsWith("/manage");
  return (
    <div className={cx("container")}>
      <AccountProvider>
        <Navbar />
      </AccountProvider>
      <div className={cx("content")}>{children}</div>
      {!isManagementPage && <Footer />}
      <ScrollHeader />
    </div>
  );
}

export default MainLayout;
