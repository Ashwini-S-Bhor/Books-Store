const getBaseUrl = () => {
  console.log("🔍 API URL:", import.meta.env.VITE_API_URL);
  return import.meta.env.VITE_API_URL;
};

export default getBaseUrl;
