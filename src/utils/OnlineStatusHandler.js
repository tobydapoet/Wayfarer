import { useEffect } from "react";

const OnlineStatusHandler = () => {
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?._id) return;

    // Gửi heartbeat mỗi 30s
    const heartbeatInterval = setInterval(() => {
      fetch(`http://localhost:3000/staffs/${user._id}/heartbeat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lastActive: new Date().toISOString() }),
      }).catch(console.error);
    }, 30000); // 30s

    const setOffline = () => {
      const url = `http://localhost:3000/staffs/${user._id}/online`;
      const data = JSON.stringify({ isOnline: false });

      // Gửi bằng POST với sendBeacon
      navigator.sendBeacon(url, new Blob([data], { type: "application/json" }));
    };

    window.addEventListener("pagehide", setOffline);
    window.addEventListener("beforeunload", setOffline); // fallback

    return () => {
      clearInterval(heartbeatInterval);
      window.removeEventListener("pagehide", setOffline);
      window.removeEventListener("beforeunload", setOffline);
    };
  }, []);

  return null;
};

export default OnlineStatusHandler;
