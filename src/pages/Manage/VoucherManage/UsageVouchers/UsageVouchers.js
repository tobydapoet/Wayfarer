import classNames from "classnames/bind";
import styles from "./UsageVouchers.module.scss";
import { useContext } from "react";
import { UsageVoucherContext } from "../../../../contexts/UsageVoucherContext";
import UsageVoucherItem from "../../../../components/UsageVoucherItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faShare, faTrash } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../../../components/Modal";
import SearchBar from "../../../../components/SearchBar";
import ClientPopper from "../../../../components/ClientPopper/ClientPopper";
import { ClientContext } from "../../../../contexts/ClientContext";
import { VoucherContext } from "../../../../contexts/VoucherContext";
import VoucherItem from "../../../../components/VoucherItem";
import Button from "../../../../components/Button";

const cx = classNames.bind(styles);

function UsageVouchers() {
  const { searchResult, handleSearchClient, allClientsData } =
    useContext(ClientContext);
  const {
    allUsageVouchers,
    setListVouchersReceived,
    listVouchersReceived,
    setVoucherReceived,
    handleAssignVoucher,
    openForm,
    setOpenForm,
    voucherReceived,
    toggleDelete,
    handleDelete,
    listDelete,
    searchUsageVoucher,
    handleSearchVouchers,
  } = useContext(UsageVoucherContext);
  const { allVouchers } = useContext(VoucherContext);
  console.log(searchUsageVoucher);
  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("header")}>
          <div className={cx("search-container")}>
            <SearchBar
              onSearch={handleSearchVouchers}
              // results={searchUsageVoucher}
              // renderResult={(usage) => (
              //   <UsageVoucherItem key={usage._id} data={usage} />
              // )}
            />
          </div>
          <div className={cx("ffc-area")}>
            <div
              className={cx("add")}
              style={{ cursor: "pointer" }}
              onClick={() => setOpenForm(true)}
            >
              <FontAwesomeIcon icon={faPlus} />
            </div>
            {/* <div
              className={cx("delete", { isNoData: listDelete.length === 0 })}
              style={{ cursor: "pointer" }}
              onClick={() => handleDelete()}
            >
              <FontAwesomeIcon icon={faTrash} />
            </div> */}
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th className={cx("name")}>Name</th>
              <th className={cx("voucher")}>Voucher</th>
              <th className={cx("received")}>Received</th>
              <th className={cx("expired")}>Expired</th>
              <th className={cx("used")}>Used</th>
              {/* <th></th> */}
            </tr>
          </thead>
          <tbody>
            {allUsageVouchers.map((usage) => (
              <UsageVoucherItem
                key={usage._id}
                data={usage}
                checked={listDelete?.some((item) => item._id === usage._id)}
                onCheck={() => toggleDelete(usage)}
              />
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        form
        open={openForm}
        onClose={() => {
          setOpenForm(false);
          setListVouchersReceived([]);
        }}
        style={{ width: "500px" }}
      >
        <div className={cx("client-container")}>
          <SearchBar
            onSearch={handleSearchClient}
            results={searchResult.filter(
              (client) =>
                !listVouchersReceived.some((item) => item._id === client._id)
            )}
            renderResult={(client) => (
              <ClientPopper
                data={client}
                onClick={() =>
                  setListVouchersReceived((prev) => [...prev, client])
                }
              />
            )}
          />

          <div
            className={cx("assign-all")}
            onClick={() => setListVouchersReceived(allClientsData)}
          >
            <FontAwesomeIcon icon={faShare} />
          </div>
        </div>
        <div className={cx("list-container")}>
          <div className={cx("list-client")}>
            {listVouchersReceived?.map((client) => (
              <div key={client._id} className={cx("client-item")}>
                {client.name}
              </div>
            ))}
          </div>
        </div>
        <div className={cx("voucher-list")}>
          {allVouchers.map((voucher) => (
            <VoucherItem
              minimal
              key={voucher._id}
              data={voucher}
              onClick={() => setVoucherReceived(voucher)}
            />
          ))}
        </div>
        <div className={cx("voucher-name")}>
          Voucher choosen: {voucherReceived?.name}
        </div>
        <div className={cx("btn-container")}>
          <Button rounded onClick={() => handleAssignVoucher()}>
            Apply
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default UsageVouchers;
