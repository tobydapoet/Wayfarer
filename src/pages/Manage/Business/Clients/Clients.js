import classNames from "classnames/bind";
import styles from "./Clients.module.scss";
import SearchBar from "../../../../components/SearchBar";
import ClientItem from "../../../../components/ClientItem/ClientItem";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ClientContext } from "../../../../contexts/ClientContext";
import ClientPopper from "../../../../components/ClientPopper/ClientPopper";

const cx = classNames.bind(styles);

function Clients() {
  const navigate = useNavigate();
  const {
    allClientsData,
    handleDeleteClient,
    searchResult,
    handleSearchClient,
  } = useContext(ClientContext);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <div className={cx("search-container")}>
          <SearchBar
            onSearch={handleSearchClient}
            results={searchResult}
            renderResult={(client) => (
              <ClientPopper
                data={client}
                onClick={() =>
                  navigate(`/manage/business/clients/${client.email}`)
                }
              />
            )}
          />
        </div>
        <div
          className={cx("add")}
          style={{ cursor: "pointer" }}
          onClick={() => navigate("add_content")}
        >
          <FontAwesomeIcon icon={faPlus} />
        </div>
      </div>
      <table className={cx("guests-list")}>
        <thead>
          <tr>
            <th className={cx("name-header")}>Name</th>
            <th className={cx("location")}>Site</th>
            <th className={cx("email")}>Email</th>
            <th className={cx("phone")}>Phone</th>
            {/* <th></th> */}
          </tr>
        </thead>
        <tbody>
          {allClientsData.map((data) => (
            <ClientItem
              data={data}
              key={data._id}
              onClick={() => navigate(data.email)}
              onDelete={() => handleDeleteClient(data._id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Clients;
