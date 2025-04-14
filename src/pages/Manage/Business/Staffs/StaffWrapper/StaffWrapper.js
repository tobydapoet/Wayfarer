import { StaffProvider } from "../../../../../contexts/StaffContext";
import StaffInfo from "../../../../../components/StaffInfo/StaffInfo";

function StaffLayout() {
  return (
    <StaffProvider>
      <StaffInfo />
    </StaffProvider>
  );
}

export default StaffLayout;
