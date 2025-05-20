export const getCurrentUser = () => {
  return (
    JSON.parse(localStorage.getItem("user")) ||
    JSON.parse(sessionStorage.getItem("user")) ||
    null
  );
};
