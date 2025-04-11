import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import {
  faCircleInfo,
  faClock,
  faGift,
  faHandshake,
  faHeart,
  faLocation,
  faMoneyBills,
  faNewspaper,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function Sidebar({ profile, management, dark }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
  const user = JSON.parse(localStorage.getItem("user"));

  const positionMap = {
    0: "Manager",
    1: "Staff",
    2: "Client",
  };

  const { email } = useParams();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800);
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={cx("wrapper")}>
      <Link to={`/${user.email}`} className={cx("current-user")}>
        <div className={cx("img-container")}>
          <img src={user.avatar} className={cx("img-avatar")} />
        </div>

        {!isMobile && (
          <div className={cx("info-user", { dark })}>
            <div className={cx("name")}>{user.name}</div>
            <div className={cx("email")}> {user.email}</div>
            {user.position !== "guess" && (
              <div className={cx("position")}>{positionMap[user.position]}</div>
            )}
          </div>
        )}
      </Link>

      {profile && (
        <>
          <div className={cx("menu")}>
            {!isMobile && <hr className={cx("gap-line1")}></hr>}

            <div className={cx("navigate-profile")}>
              <div className={cx("processing-container")}>
                <NavLink
                  to={`/${email}/processing`}
                  className={(nav) =>
                    cx("processing", { active: nav.isActive })
                  }
                >
                  {isMobile ? <FontAwesomeIcon icon={faClock} /> : "Processing"}
                </NavLink>
              </div>
              <div className={cx("favourite-container")}>
                <NavLink
                  to={`/${email}/favourite`}
                  className={(nav) => cx("favourite", { active: nav.isActive })}
                >
                  {isMobile ? <FontAwesomeIcon icon={faHeart} /> : "Favourite"}
                </NavLink>
              </div>
              <div className={cx("bonus-container")}>
                <NavLink
                  to={`/${email}/bonus`}
                  className={(nav) => cx("bonus", { active: nav.isActive })}
                >
                  {isMobile ? <FontAwesomeIcon icon={faGift} /> : "Bonus point"}
                </NavLink>
              </div>
            </div>
            {!isMobile && <hr className={cx("gap-line2")}></hr>}

            <div className={cx("logout")}>
              <Link to="" className="logout">
                {isMobile ? (
                  <FontAwesomeIcon icon={faRightFromBracket} />
                ) : (
                  "Log out"
                )}
              </Link>
            </div>
          </div>
        </>
      )}
      {management && (
        <div className={cx("menu")}>
          <div className={cx("navigate-manage")}>
            <div className={cx("business-container")}>
              <NavLink
                to={`business`}
                className={(nav) => cx("busniness", { active: nav.isActive })}
              >
                {isMobile ? (
                  <FontAwesomeIcon icon={faCircleInfo} />
                ) : (
                  "Business"
                )}
              </NavLink>
            </div>
            <div className={cx("destinations-container")}>
              <NavLink
                to={`destinations`}
                className={(nav) =>
                  cx("destinations", { active: nav.isActive })
                }
              >
                {isMobile ? (
                  <FontAwesomeIcon icon={faLocation} />
                ) : (
                  "Destinations"
                )}
              </NavLink>
            </div>
            <div className={cx("content-container")}>
              <NavLink
                to={`content`}
                className={(nav) => cx("content", { active: nav.isActive })}
              >
                {isMobile ? <FontAwesomeIcon icon={faNewspaper} /> : "Contents"}
              </NavLink>
            </div>
            <div className={cx("contact-container")}>
              <NavLink
                to={`contact_manage`}
                className={(nav) =>
                  cx("contactmanage", { active: nav.isActive })
                }
              >
                {isMobile ? <FontAwesomeIcon icon={faHandshake} /> : "Contacts"}
              </NavLink>
            </div>
            <div className={cx("billsmanage-container")}>
              <NavLink
                to={`billsmanage`}
                className={(nav) => cx("billsmanage", { active: nav.isActive })}
              >
                {isMobile ? <FontAwesomeIcon icon={faMoneyBills} /> : "Bills"}
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
