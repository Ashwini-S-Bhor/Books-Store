const getBaseUrl = () => {
  if (import.meta.env.VITE_NODE_ENV === "production") {
    return "https://books-store-vxr6.onrender.com";
  }
  return "http://localhost:5000";
};
