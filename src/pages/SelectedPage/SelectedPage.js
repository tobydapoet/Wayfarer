import { useParams } from "react-router-dom";
import Processing from "./Processing";
import Favourite from "./Favourite";
import BonusPoint from "./BonusPoint/BonusPoint";


function SelectedPage() {
  const { selected } = useParams();
  const renderComponent = () => {
    switch (selected) {
      case 'processing':
        return <Processing />;
      case 'favourite':
        return <Favourite />;
      case 'bonus':
        return <BonusPoint />
      default:
        return <div>Không tìm thấy trang</div>;
    }
  };
  return <div>{renderComponent()}</div>;
}

export default SelectedPage;
