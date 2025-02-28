import { useParams } from "react-router-dom";
import Processing from "./Processing";
import Favourite from "./Favourite";
import History from "./History";

function SelectedPage() {
  const { selected } = useParams();
  const renderComponent = () => {
    switch (selected) {
      case 'processing':
        return <Processing />;
      case 'favourite':
        return <Favourite />;
      case 'history':
        return <History />;
      default:
        return <div>Không tìm thấy trang</div>;
    }
  };
  return <div>{renderComponent()}</div>;
}

export default SelectedPage;
