import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import { Link, NavLink, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import {
  faCircleInfo,
  faClock,
  faGift,
  faGripHorizontal,
  faHeart,
  faLocation,
  faMessage,
  faMoneyBills,
  faNewspaper,
  faPen,
  faRightFromBracket,
  faTicket,
} from "@fortawesome/free-solid-svg-icons";
import { AccountContext } from "../../contexts/AccountContext";

const cx = classNames.bind(styles);

const user =
  JSON.parse(localStorage.getItem("user")) ||
  JSON.parse(sessionStorage.getItem("user"));

function Sidebar({ profile, management, dark }) {
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < 800 || window.innerHeight < 650
  );
  const { user, handleLogout } = useContext(AccountContext);
  const { email } = useParams();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800 || window.innerHeight < 650);
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
              <div className={cx("position")}>{user.position}</div>
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
              {!user.position && (
                <div className={cx("my_blogs-container")}>
                  <NavLink
                    to={`/${email}/my_blogs`}
                    className={(nav) =>
                      cx("my_blogs", { active: nav.isActive })
                    }
                  >
                    {isMobile ? <FontAwesomeIcon icon={faPen} /> : "My Blogs"}
                  </NavLink>
                </div>
              )}
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

            <div className={cx("logout")} onClick={handleLogout}>
              <div>
                {isMobile ? (
                  <FontAwesomeIcon icon={faRightFromBracket} />
                ) : (
                  "Log out"
                )}
              </div>
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
                  <FontAwesomeIcon icon={faGripHorizontal} />
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
            <div className={cx("blog-container")}>
              <NavLink
                to={`blog_content`}
                className={(nav) => cx("blog", { active: nav.isActive })}
              >
                {isMobile ? <FontAwesomeIcon icon={faNewspaper} /> : "Blogs"}
              </NavLink>
            </div>
            <div className={cx("aboutus-container")}>
              <NavLink
                to={`about_us_content`}
                className={(nav) => cx("about", { active: nav.isActive })}
              >
                {isMobile ? (
                  <FontAwesomeIcon icon={faCircleInfo} />
                ) : (
                  "About us"
                )}
              </NavLink>
            </div>

            <div className={cx("contact-container")}>
              <NavLink
                to={`contact_manage`}
                className={(nav) =>
                  cx("contactmanage", { active: nav.isActive })
                }
              >
                {isMobile ? <FontAwesomeIcon icon={faMessage} /> : "Contacts"}
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
            <div className={cx("vouchermanage-container")}>
              <NavLink
                to={`vouchermanage`}
                className={(nav) =>
                  cx("vouchermanage", { active: nav.isActive })
                }
              >
                {isMobile ? <FontAwesomeIcon icon={faTicket} /> : "Vouchers"}
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
