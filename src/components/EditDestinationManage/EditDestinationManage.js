import classNames from "classnames/bind";
import styles from "./EditDestinationManage.module.scss";
import Input from "../Input";
import Button from "../Button";
import Modal from "../Modal";
import images from "../../assets/images";
import { useContext } from "react";
import { CityContext } from "../../contexts/CityContext";

const cx = classNames.bind(styles);

function EditDestinationManage({ onClose, open }) {
  const {
    city,
    tempCity,
    errors,
    resetForm,
    handleCreateCity,
    handleSaveCity,
    handleChangeCityImage,
    handleChangeCityInput,
  } = useContext(CityContext);
  console.log(errors);

  const handleSubmit = () => {
    if (city) {
      handleSaveCity(city._id);
    } else {
      handleCreateCity();
    }
  };
  console.log(city._id);

  return (
    <Modal
      form
      open={open}
      onClose={() => {
        onClose();
        resetForm();
      }}
    >
      <div className={cx("edit-wrapper")}>
        <div className={cx("edit-content")}>
          <Input
            dark
            placeholder="City..."
            frame="City"
            name="name"
            value={tempCity?.name || ""}
            onChange={handleChangeCityInput}
            error={errors?.name}
          />
          <div className={cx("file-container")}>
            <img src={tempCity.image || images.noImg} />
            <div className={cx("input-container")}>
              <input
                type="file"
                placeholder="City..."
                name="image"
                onChange={handleChangeCityImage}
              />
            </div>
          </div>
          {errors?.image && <p className={cx("error-text")}>{errors.image}</p>}
        </div>
        <div className={cx("btn-container")}>
          <Button large onClick={handleSubmit}>
            Save
          </Button>
          <Button
            large
            onClick={() => {
              onClose();
              resetForm();
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default EditDestinationManage;
