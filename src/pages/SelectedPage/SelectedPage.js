import { useParams } from "react-router-dom";
import Processing from "./Processing";
import Favourite from "./Favourite";
import BonusPoint from "./BonusPoint/BonusPoint";
import MyBlogs from "./MyBlogs";
import { BlogProvider } from "../../contexts/BlogContext";

function SelectedPage() {
  const { selected } = useParams();
  const user =
    JSON.parse(localStorage.getItem("user")) ||
    JSON.parse(sessionStorage.getItem("user"));
  const renderComponent = () => {
    switch (selected) {
      case "processing":
        return <Processing />;
      case "my_blogs":
        return (
          !user?.position && (
            <BlogProvider>
              <MyBlogs />
            </BlogProvider>
          )
        );
      case "favourite":
        return <Favourite />;
      case "bonus":
        return <BonusPoint />;
      default:
        return <div>Không tìm thấy trang</div>;
    }
  };
  return <div>{renderComponent()}</div>;
}

export default SelectedPage;
