import classNames from "classnames/bind";
import styles from "./Staffs.module.scss";
import StaffItem from "../../../../components/StaffItem";
import SearchBar from "../../../../components/SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { StaffContext } from "../../../../contexts/StaffContext";

const cx = classNames.bind(styles);
function Staffs() {
  const navigate = useNavigate();
  const { allStaffsData, handleDeleteStaff } = useContext(StaffContext);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <SearchBar />
        <div
          className={cx("add")}
          style={{ cursor: "pointer" }}
          onClick={() => navigate("add_content")}
        >
          <FontAwesomeIcon icon={faPlus} />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th className={cx("name-header")}>Name</th>
            <th className={cx("location")}>Site</th>
            <th className={cx("salary")}>Salary</th>
            <th className={cx("start")}>Start</th>
            <th className={cx("status")}>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {allStaffsData.map((data) => (
            <StaffItem
              key={data._id}
              data={data}
              onClick={() => {
                navigate(`${data.email}`);
              }}
              onDelete={() => handleDeleteStaff(data._id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Staffs;
