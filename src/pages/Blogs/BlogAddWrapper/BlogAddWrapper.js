import BlogAdd from "../../../components/BlogAdd";
import { BlogProvider } from "../../../contexts/BlogContext";

function BlogAddWraper() {
  return (
    <BlogProvider>
      <BlogAdd />
    </BlogProvider>
  );
}
export default BlogAddWraper;
