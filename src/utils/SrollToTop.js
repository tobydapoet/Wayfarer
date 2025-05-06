import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 20, behavior: "auto" }); // hoặc 'auto' nếu không cần hiệu ứng
  }, [pathname]);

  return null;
}

export default ScrollToTop;
