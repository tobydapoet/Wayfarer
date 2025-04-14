import { useParams } from "react-router-dom";
import BillForm from "../../../../components/BillForm";
import { BillProvider } from "../../../../contexts/BillContext";

const BILL = {
  id: 4,
  avatar:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFAz7TV79RYxtJu5RScxRax-OljYqpIKqPxw&s",
  client: "Davis Astee3",
  total: "2020",
  service: "Temple of Literature1",
  status: 4,
  payType: "Paypal",
  dateStart: "2025-05-03",
  dateEnd: "2025-05-05",
  number: 3,
  type: 2,
};

function BillEdit() {
  const param = useParams();
  console.log(param);
  return (
    <BillProvider data={BILL}>
      {param.bill !== "add_content" ? <BillForm data={BILL} /> : <BillForm />}
    </BillProvider>
  );
}

export default BillEdit;
