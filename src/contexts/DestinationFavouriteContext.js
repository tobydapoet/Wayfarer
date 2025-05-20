import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCurrentUser } from "../utils/currentUser";

export const DestinationFavouriteContext = createContext({
  allDestinationFavourite: [],
  handleToggleDestinationFavourite: () => {},
  isFavourite: () => {},
});

export const DestinationFavouriteProvider = ({ children }) => {
  const [allDestinationFavourite, setAllDestinationFavourite] = useState([]);
  const user = getCurrentUser();

  const { id } = useParams();

  const isFavourite = (destinationId) => {
    return allDestinationFavourite.some((fav) => {
      const favDestinationId =
        typeof fav.destinationId === "string"
          ? fav.destinationId
          : fav.destinationId?._id;
      const favClientId =
        typeof fav.clientId === "string" ? fav.clientId : fav.clientId?._id;
      return favDestinationId === destinationId && favClientId === user?._id;
    });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/destination-favourites`)
      .then((res) => setAllDestinationFavourite(res.data))
      .catch((err) => console.log(err));
  }, []);
  console.log(allDestinationFavourite);

  const handleToggleDestinationFavourite = async (destinationId) => {
    const matchedFavourite = allDestinationFavourite.find((fav) => {
      const favDestinationId =
        typeof fav.destinationId === "string"
          ? fav.destinationId
          : fav.destinationId?._id;
      const favClientId =
        typeof fav.clientId === "string" ? fav.clientId : fav.clientId?._id;
      return favDestinationId === destinationId && favClientId === user._id;
    });
    if (matchedFavourite) {
      const res = await axios.delete(
        `http://localhost:3000/destination-favourites/${matchedFavourite._id}`
      );
      if (res.data.success) {
        setAllDestinationFavourite((prev) =>
          prev.filter(
            (destinationFavourite) =>
              destinationFavourite._id !== matchedFavourite._id
          )
        );
      }
    } else {
      const res = await axios.post(
        `http://localhost:3000/destination-favourites/create_destination-favourite`,
        { clientId: user._id, destinationId: id }
      );
      if (res.data.success) {
        setAllDestinationFavourite((prev) => [...prev, res.data.data]);
      }
    }
  };

  return (
    <DestinationFavouriteContext.Provider
      value={{
        allDestinationFavourite,
        handleToggleDestinationFavourite,
        isFavourite,
      }}
    >
      {children}
    </DestinationFavouriteContext.Provider>
  );
};
