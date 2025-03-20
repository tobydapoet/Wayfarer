import classNames from "classnames/bind";
import styles from "./Partners.module.scss";
import PartnerItem from "../../../components/PartnerItem/PartnerItem";
import { useState } from "react";
import Contract from "../../../components/Contract/Contract";
import SearchBar from "../../../components/SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Input from "../../../components/Input";
import Modal from "../../../components/Modal";
import PhoneInput from "react-phone-input-2";
import Button from "../../../components/Button";
import images from "../../../assets/images";

const cx = classNames.bind(styles);

const PARTNERS = [
  {
    name: "VietNam Airlines",
    status: "0",
    startDate: "5/5/2025",
    endDate: "1/2/2020",
    logo: "https://icolor.vn/wp-content/uploads/2023/08/logo-vietnam-airlines-2.png",
    tax: "xxxxx",
    position: "CEO",
    represent: "Nguyen Van A",
    phone: "0215888821",
    email: "Airline@gmail.com",
  },
  {
    name: "Bamboo Airways",
    status: "1",
    startDate: "5/5/2025",
    endDate: "3/30/2025",
    logo: "https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-Bamboo-Airways-V.png",
    tax: "xxxxx",
    position: "CEO",
    represent: "Nguyen Van A",
    phone: "0215888821",
    email: "Airline@gmail.com",
  },
  {
    name: "Emirates",
    status: "3",
    startDate: "5/5/2025",
    endDate: "3/20/2025",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/725px-Emirates_logo.svg.png",
    tax: "xxxxx",
    position: "CEO",
    represent: "Nguyen Van A",
    phone: "0215888821",
    email: "Airline@gmail.com",
  },
  {
    name: "VietTravel",
    status: "0",
    startDate: "5/5/2025",
    endDate: "1/2/2027",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Vietravel_Logo.png",
    tax: "xxxxx",
    position: "CEO",
    represent: "Nguyen Van A",
    phone: "0215888821",
    email: "Airline@gmail.com",
    content:
      "Phạm vi hợp tác: (Mô tả ngắn gọn về hình thức hợp tác, ví dụ: cung cấp sản phẩm, tích hợp phần mềm, phân phối hàng hóa, v.v.) Trách nhiệm của Bên A: (Nêu rõ nghĩa vụ của bên quản lý trang web, như hỗ trợ kỹ thuật, đảm bảo nền tảng hoạt động ổn định, v.v.) Trách nhiệm của Bên B: (Nêu rõ trách nhiệm của đối tác, như cung cấp hàng hóa đúng thời hạn, đảm bảo chất lượng, v.v.) Phương thức thanh toán: (Chuyển khoản, tiền mặt, thời hạn thanh toán, v.v.) Thời hạn hợp đồng: (Ví dụ: Hợp đồng có hiệu lực từ ngày … đến ngày …)",
    policy:
      "Hai bên cam kết bảo mật thông tin liên quan đến hợp tác. Trường hợp có tranh chấp, hai bên ưu tiên giải quyết bằng thương lượng, nếu không thành công sẽ giải quyết tại tòa án có thẩm quyền.",
    address: "HaNoi",
  },
];

function Partners() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [addPartnerForm, setAddPartnerForm] = useState(false);
  const [partners, setPartners] = useState(PARTNERS);
  const [tempPartnerValue, setTempPartnerValue] = useState({});

  const handlePartnerChange = (e) => {
    setTempPartnerValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChangePhone = (value) => {
    if (tempPartnerValue.phone !== value) {
      tempPartnerValue.phone = value;
    }
  };

  const handleOnSave = (e) => {
    if (Object.keys(tempPartnerValue).length === 0) {
      setAddPartnerForm(false);
      return;
    }
    setAddPartnerForm(false);
    setPartners((prev) => [...prev, tempPartnerValue]);
    setTempPartnerValue({});
  };

  const handleChangeImg = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    const file = e.target.files[0];
    const newFile = URL.createObjectURL(file);
    setTempPartnerValue((prev) => ({ ...prev, logo: newFile }));
  };

  console.log(partners);

  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("header")}>
          <SearchBar />
          <div
            className={cx("add")}
            style={{ cursor: "pointer" }}
            onClick={() => setAddPartnerForm(true)}
          >
            <FontAwesomeIcon icon={faPlus} />
          </div>
        </div>

        <div className={cx("container")}>
          <div className={cx("summary", { collapsed: selectedItem !== null })}>
            {partners.map((partner, index) => (
              <PartnerItem
                data={partner}
                key={index}
                onClick={() => setSelectedItem(partner)}
              />
            ))}
          </div>
          <div className={cx("details", { expanded: selectedItem !== null })}>
            {selectedItem && (
              <Contract
                data={selectedItem}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedItem(null);
                }}
              />
            )}
          </div>
        </div>
      </div>
      <Modal
        bigedit
        open={addPartnerForm}
        onClose={() => setAddPartnerForm(false)}
      >
        <div className={cx("add-form")}>
          <div className={cx("brand-wrapper")}>
            <div className={cx("brand-container")}>
              <Input
                light
                placeholder="Brand name..."
                name="name"
                frame="Brand"
                onChange={handlePartnerChange}
              />
            </div>
            <div className={cx("tax-container")}>
              <Input
                light
                placeholder="Tax code..."
                name="tax"
                frame="Tax code"
                onChange={handlePartnerChange}
              />
            </div>
            <div className={cx("img-container")}>
              <img src={tempPartnerValue?.logo || images.noImg} />
              <div className={cx("file-container")}>
                <input type="file" name="logo" onChange={handleChangeImg} />
              </div>
            </div>
          </div>

          <div className={cx("time")}>
            <div className={cx("start-container")}>
              <Input
                light
                placeholder="Start date..."
                name="startDate"
                frame="Start date"
                type="date"
                className={cx("start")}
                onChange={handlePartnerChange}
              />
            </div>
            <div className={cx("end-container")}>
              <Input
                light
                placeholder="End date..."
                name="endDate"
                frame="End date"
                type="date"
                className={cx("end")}
                onChange={handlePartnerChange}
              />
            </div>
          </div>
          <div className={cx("representative-container")}>
            <div className={cx("represent-container")}>
              <Input
                light
                placeholder="Representative..."
                name="represent"
                frame="Representative"
                onChange={handlePartnerChange}
              />
            </div>
            <div className={cx("position-container")}>
              <Input
                light
                placeholder="Position..."
                name="position"
                frame="Position"
                onChange={handlePartnerChange}
              />
            </div>
          </div>
          <div className={cx("contact")}>
            <div className={cx("email-container")}>
              <Input
                light
                placeholder="Email..."
                name="email"
                frame="Email"
                onChange={handlePartnerChange}
              />
            </div>
            <div className={cx("phone-container")}>
              <Input light frame="Phone">
                <PhoneInput
                  className={cx("phone")}
                  enableSearch
                  name="phone"
                  onChange={handleChangePhone}
                />
              </Input>
            </div>
          </div>
          <div className={cx("address-container")}>
            <Input
              light
              placeholder="Address..."
              name="address"
              frame="Address"
              onChange={handlePartnerChange}
            />
          </div>
          <div className={cx("content-container")}>
            <Input
              light
              placeholder="Content..."
              name="content"
              frame="Collaborative Content"
              textarea
              onChange={handlePartnerChange}
            />
          </div>
          <div className={cx("policy-container")}>
            <Input
              light
              placeholder="Privacy & Policy..."
              name="policy"
              textarea
              frame="Privacy & Policy"
              onChange={handlePartnerChange}
            />
          </div>
          <div className={cx("btn-container")}>
            <Button large onClick={handleOnSave}>
              Save
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Partners;
