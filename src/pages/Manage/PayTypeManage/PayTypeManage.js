import classNames from "classnames/bind";
import styles from "./PayTypeManage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { PayTypeContext } from "../../../contexts/PayTypeContext";
import PayTypeItem from "../../../components/PayTypeItem";
import Modal from "../../../components/Modal";
import Input from "../../../components/Input";
import images from "../../../assets/images";
import Button from "../../../components/Button";

const cx = classNames.bind(styles);

function PayTypeManage() {
  const {
    allPayTypes,
    payTypeSelected,
    openEditForm,
    setOpenEditForm,
    errors,
    handleSelectedPaytype,
    handleCloseSelectedPayType,
    handleInputChange,
    handleImgChange,
    handleCreatePaytype,
    handleUpdatePayType,
    handleDeletePayType,
  } = useContext(PayTypeContext);
  console.log(payTypeSelected);
  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("header")}>
          <div className={cx("add")} onClick={() => setOpenEditForm(true)}>
            <FontAwesomeIcon icon={faPlus} />
          </div>
        </div>
        <div className={cx("content")}>
          {allPayTypes.map((paytype) => (
            <PayTypeItem
              key={paytype._id}
              data={paytype}
              onClick={() => handleSelectedPaytype(paytype)}
            />
          ))}
        </div>
      </div>
      <Modal
        form
        open={openEditForm}
        onClose={() => handleCloseSelectedPayType()}
      >
        <Input
          name="name"
          dark
          frame="Method name"
          value={payTypeSelected.name}
          onChange={handleInputChange}
          error={errors?.name}
        />
        <div className={cx("file-container")}>
          <img src={payTypeSelected.image || images.noImg} />
          <div className={cx("input-container")}>
            <input type="file" name="image" onChange={handleImgChange} />
          </div>
        </div>
        {errors?.image && <p className={cx("error-text")}>{errors?.image}</p>}
        <div className={cx("btn-container")}>
          {!payTypeSelected._id ? (
            <Button rounded onClick={() => handleCreatePaytype()}>
              Add
            </Button>
          ) : (
            <Button rounded onClick={() => handleUpdatePayType()}>
              Save
            </Button>
          )}
        </div>
      </Modal>
    </>
  );
}

export default PayTypeManage;
