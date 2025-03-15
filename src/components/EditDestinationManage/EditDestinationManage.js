import classNames from "classnames/bind";
import styles from "./EditDestinationManage.module.scss";
import Input from "../Input";
import Button from "../Button";
import Modal from "../Modal";
import images from '../../assets/images'
import { useState } from "react";

const cx = classNames.bind(styles);

function EditDestinationManage({ data, onClose, open , onSave}) {
  const [dataForm, setDataForm] = useState(data ? { ...data } : {});
  const [tempDataForm, setTempDataForm] = useState(data ? { ...data }: {});

  const handleInputChange = (e) => {
    setTempDataForm((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleImgChange = (e) => {
    if (!e.target.files || e.target.value.length === 0) {
      return;
    }
    const file = e.target.files[0];
    const imgURL = URL.createObjectURL(file);
    setTempDataForm((prev) => ({ ...prev, image: imgURL }));
  };

  const handleSaveData = () => {
    setDataForm(tempDataForm); 
    onSave(tempDataForm); 
    onClose();

    if (!data) {
      setDataForm({});
      setTempDataForm({});
    }
  };

  console.log(dataForm)
  return (
    <Modal
      open={open}
      onClose={() => {
        setTempDataForm(dataForm);
        onSave(dataForm);
        onClose();
      }}
    >
      <div className={cx("edit-wrapper")}>
        <div className={cx("edit-content")}>
          <Input
            light
            placeholder="City..."
            frame="City"
            name={dataForm.name}
            value={dataForm.name}
            onChange={handleInputChange}
          />
          <div className={cx("file-container")}>
            <input
              type="file"
              placeholder="City..."
              name={dataForm.city}
              onChange={handleImgChange}
            />
          </div>
          <img src={tempDataForm.image || images.noImg} />
        </div>
        <div className={cx("btn-container")}>
          <Button large onClick={handleSaveData}>
            Save
          </Button>
          <Button
            large
            onClick={() => {
              setTempDataForm(dataForm);
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
