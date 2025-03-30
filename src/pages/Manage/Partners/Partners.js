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
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const handleOpenAddForm = () => {
    navigate('add_partner');
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <SearchBar />
        <div className={cx("add")} style={{ cursor: "pointer" }} onClick={handleOpenAddForm}>
          <FontAwesomeIcon icon={faPlus} />
        </div>
      </div>

      <div className={cx("container")}>
        <div className={cx("summary", { collapsed: selectedItem !== null })}>
          {PARTNERS.map((partner, index) => (
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
  );
}

export default Partners;
