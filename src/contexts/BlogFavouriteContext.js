import axios from "axios";
import { Children, createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCurrentUser } from "../utils/currentUser";

export const BlogFavouriteContext = createContext({
  allBlogFavourite: [],
  handleToggleFavourite: () => {},
});

export const BlogFavouriteProvider = ({ children }) => {
  const [allBlogFavourite, setAllBlogFavourite] = useState([]);
  const user = getCurrentUser();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/blog-favourites`)
      .then((res) => setAllBlogFavourite(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleToggleFavourite = async (blogId) => {
    const matchedFavourite = allBlogFavourite.find((fav) => {
      const favBlogId =
        typeof fav.blogId === "string" ? fav.blogId : fav.blogId?._id;
      const favClientId =
        typeof fav.clientId === "string" ? fav.clientId : fav.clientId?._id;
      return favBlogId === blogId && favClientId === user._id;
    });

    if (matchedFavourite) {
      const res = await axios.delete(
        `http://localhost:3000/blog-favourites/${matchedFavourite._id}`
      );
      if (res.data.success) {
        setAllBlogFavourite((prev) =>
          prev.filter((fav) => fav._id !== matchedFavourite._id)
        );
      }
    } else {
      const res = await axios.post(
        `http://localhost:3000/blog-favourites/create_blog-favourite`,
        { clientId: user._id, blogId }
      );
      if (res.data.success) {
        setAllBlogFavourite((prev) => [...prev, res.data.data]);
      }
    }
  };
  console.log(allBlogFavourite);

  return (
    <BlogFavouriteContext.Provider
      value={{
        allBlogFavourite,
        handleToggleFavourite,
      }}
    >
      {children}
    </BlogFavouriteContext.Provider>
  );
};
