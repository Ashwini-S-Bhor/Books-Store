const getBaseUrl = () => {
    console.log("🔍 Netlify Env Value:", process.env.REACT_APP_API_URL); // Debug log
    return process.env.REACT_APP_API_URL;
};

export default getBaseUrl;
