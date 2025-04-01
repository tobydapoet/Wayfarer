import classNames from "classnames/bind";
import styles from "./EditDestinationManage.module.scss";
import Input from "../Input";
import Button from "../Button";
import Modal from "../Modal";
import images from "../../assets/images";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles);

function EditDestinationManage({ data, onClose, open, onSave }) {
  const [dataForm, setDataForm] = useState(
    data
      ? { ...data }
      : {
          name: "",
          image: "",
        }
  );
  const [tempDataForm, setTempDataForm] = useState({ ...dataForm });
  const [errors, setErrors] = useState({});

  
useEffect(() => {
  setDataForm(
    data
      ? { ...data }
      : {
          name: "",
          image: "",
        }
  );
  setTempDataForm(
    data
      ? { ...data }
      : {
          name: "",
          image: "",
        }
  );
  setErrors({});
}, [data, open]);

  const validateInput = (name, value) => {
    const newErrors = {};
    switch (name) {
      case "name": {
        if (!value.trim()) {
          newErrors.name = "City name cannot be empty!";
        }
        break;
      }
      case "image": {
        if (!value) {
          newErrors.image = "Please select image!";
        }
        break;
      }
    }
    return newErrors;
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newErrors = validateInput(name, value);
    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors, ...newErrors };
      if (!newErrors[name]) {
        delete updatedErrors[name];
      }
      return updatedErrors;
    });
    setTempDataForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImgChange = (e) => {
    if (!e.target.files || e.target.value.length === 0) {
      return;
    }
    const file = e.target.files[0];
    const newErrors = validateInput("image", file);
    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors, ...newErrors };
      if (!newErrors.image) {
        delete updatedErrors.image;
      }
      return updatedErrors;
    });
    if (newErrors.image) {
      return;
    }
    const imgURL = URL.createObjectURL(file);
    setTempDataForm((prev) => ({ ...prev, image: imgURL }));
  };

  const handleSaveData = () => {
    let newErrors = {};

    Object.entries(tempDataForm).forEach(([name, value]) => {
      const fieldErrors = validateInput(name, value);
      newErrors = { ...newErrors, ...fieldErrors }; // Merge tất cả lỗi
    });

    setErrors(newErrors);
    console.log(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }
    setDataForm(tempDataForm);
    onSave(tempDataForm);
    onClose();

    if (!data) {
      setDataForm({});
      setTempDataForm({});
    }
  };
  console.log(errors);

  return (
    <Modal
      form
      open={open}
      onClose={() => {
        setTempDataForm(dataForm);
        onSave(dataForm);
        setErrors({});
        onClose();
      }}
    >
      <div className={cx("edit-wrapper")}>
        <div className={cx("edit-content")}>
          <Input
            dark
            placeholder="City..."
            frame="City"
            name="name"
            value={tempDataForm.name}
            onChange={handleInputChange}
            error={errors.name}
          />
          <div className={cx("file-container")}>
            <input
              type="file"
              placeholder="City..."
              name="image"
              onChange={handleImgChange}
            />
          </div>
          <img src={tempDataForm.image || images.noImg} />
          {errors.image && <p className={cx("error-text")}>{errors.image}</p>}
        </div>
        <div className={cx("btn-container")}>
          <Button large onClick={handleSaveData}>
            Save
          </Button>
          <Button
            large
            onClick={() => {
              setTempDataForm(dataForm);
              setErrors({});
              onClose();
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
