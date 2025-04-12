import { StaffProvider } from "../../../../../contexts/StaffContext";
import StaffInfo from "../../../../../components/StaffInfo/StaffInfo";
import { useParams } from "react-router-dom";
const INFO = {
  avatar:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFAz7TV79RYxtJu5RScxRax-OljYqpIKqPxw&s",
  name: "Davis Astee",
  status: 1,
  site: "Bắc Sơn, Thị trấn Chúc Sơn, Chương Mỹ District, Hà Nội, 13400, VietNam",
  salary: "1500",
  name: "Nguyen Viet Tung",
  email: "Cat@gmail.com",
  birth: "2004-10-29",
  phone: "0348349754",
  password: "12345678",
};
function StaffLayout() {
  const param = useParams();
  console.log(param);
  return (
    <StaffProvider
      data={
        param.info === "add_content"
          ? {
              name: "",
              status: "off duty",
              site: "",
              salary: "",
              email: "",
              birth: "",
              phone: "",
              password: "",
              avatar: "",
            }
          : { ...INFO }
      }
    >
      <StaffInfo />
    </StaffProvider>
  );
}

export default StaffLayout;
