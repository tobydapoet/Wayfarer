import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Flag from "react-world-flags";
import getCountryCode from "../../utils/countryUtils/countryUtils";
import Button from "../Button";
import styles from './ClientItem.module.scss'
import Modal from "../Modal";



const cx = classNames.bind(styles)

function ClientItem({ data }) {

    const navigate = useNavigate();
  
    const [deleteNotice, setDeleteNotice] = useState(false);
  
  
    const handleRowClick = () => {
      navigate(`${data.name}`);
    };
  
    return (
      <>
        <tr
          className={cx("wrapper")}
          onClick={handleRowClick}
          style={{ cursor: "pointer" }}
        >
          <td className={cx("info")}>
            <div className={cx("img")}>
              <img src={data.avatar} alt={data.name} />
            </div>
            <div className={cx("name")}>{data.name}</div>
          </td>
          <td className={cx("country")}>
            <Flag className={cx("flag")} code={getCountryCode(data.location)} />
          </td>
          <td className={cx('email')}>{data.email}</td>
          <td className={cx('phone')}>{data.phone}</td>
          <td className={cx("delete")}>
            <FontAwesomeIcon
              icon={faXmark}
              className={cx("delete-icon")}
              onClick={(e) => {
                e.stopPropagation();
                setDeleteNotice(true);
              }}
            />
          </td>
          </tr>
          <Modal open={deleteNotice} onClose={() => setDeleteNotice(false)}>
            <div className={cx('notice-container')}>
              <div className={cx("notice-content")}>
                Do you want to delete this client ?
              </div>
              <div className={cx('btn-container')}>
                <Button large>Yes</Button>
                <Button large onClick={()=>setDeleteNotice(false)}>Cancel</Button>
              </div>
            </div>  
          </Modal>
      </>
      
    );
  }

export default ClientItem;