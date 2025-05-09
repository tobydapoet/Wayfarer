import classNames from "classnames/bind";
import styles from "./Vouchers.module.scss";
import { VoucherContext } from "../../../../contexts/VoucherContext";
import { useContext, useState } from "react";
import VoucherItem from "../../../../components/VoucherItem/VoucherItem";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "../../../../components/Modal/Modal";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";

const cx = classNames.bind(styles);

function Vouchers() {
  const {
    allVouchers,
    selectedVoucher,
    errors,
    openForm,
    setOpenForm,
    handleSelectedVoucher,
    handleReset,
    handleInputChange,
    handleCreateVoucher,
    handleUpdateVoucher,
    handleDeleteVoucher,
  } = useContext(VoucherContext);
  console.log(selectedVoucher);
  console.log(errors);
  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("header")}>
          <div
            className={cx("add")}
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleReset();
              setOpenForm(true);
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
          </div>
        </div>
        <div className={cx("body")}>
          {allVouchers.map((voucher) => (
            <VoucherItem
              key={voucher._id}
              data={voucher}
              onClick={() => {
                handleSelectedVoucher(voucher);
              }}
            />
          ))}
        </div>
      </div>
      <Modal form open={openForm} onClose={() => setOpenForm(false)}>
        <div className={cx("form-container")}>
          <div className={cx("name-container")}>
            <Input
              dark
              name="name"
              value={selectedVoucher?.name}
              frame="Name"
              onChange={handleInputChange}
              error={errors.name}
            />
          </div>
          <div className={cx("row")}>
            <div className={cx("discount-container")}>
              <Input
                dark
                name="discountValue"
                value={selectedVoucher?.discountValue}
                frame={"Discount($)"}
                onChange={handleInputChange}
                error={errors.discountValue}
              />
            </div>
            <div className={cx("min-container")}>
              <Input
                dark
                name="minCost"
                value={selectedVoucher?.minCost}
                frame={"Min($)"}
                onChange={handleInputChange}
                error={errors.minCost}
              />
            </div>
          </div>
          <div className={cx("description-container")}>
            <Input
              dark
              name="description"
              textarea
              value={selectedVoucher?.description}
              frame="Description"
              onChange={handleInputChange}
              error={errors.description}
              maxLength={200}
            />
          </div>
          <div className={cx("btn-container")}>
            {!selectedVoucher._id ? (
              <Button
                rounded
                onClick={() => {
                  handleCreateVoucher();
                }}
              >
                Add
              </Button>
            ) : (
              <>
                <Button
                  rounded
                  onClick={() => {
                    handleUpdateVoucher();
                  }}
                >
                  Save
                </Button>
                <Button
                  rounded
                  onClick={() => {
                    handleDeleteVoucher();
                  }}
                >
                  Delete
                </Button>
              </>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Vouchers;
