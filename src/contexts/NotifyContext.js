import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { getCurrentUser } from "../utils/currentUser";

export const NotifyContext = createContext({
  allNotifications: [],
  handleReadNotifications: () => {},
});

export const NotifyProvider = ({ children }) => {
  const user = getCurrentUser();

  const [allNotifications, setAllNotifications] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/notifications`)
      .then((res) => {
        const sortedData = res.data.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setAllNotifications(sortedData);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleReadNotifications = () => {
    axios
      .post(`http://localhost:3000/notifications/is_read`, {
        clientId: user._id,
      })
      .then((res) => {
        setAllNotifications((prev) =>
          prev.map((item) =>
            item.clientId._id === user._id ? { ...item, isRead: true } : item
          )
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <NotifyContext.Provider
      value={{ allNotifications, handleReadNotifications }}
    >
      {children}
    </NotifyContext.Provider>
  );
};
