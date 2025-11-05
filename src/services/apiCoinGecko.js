import axios from "axios";

// API to fetch the TokensListData
const fetchTokensList = async () => {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/list?include_platform=true"
    );
    const data = await response.json();
    // console.log("Fetched Data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// API to fetch the Token Data
const fetchTokenData = async (tokenId) => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${tokenId}`
    );
    return response.data;
  } catch (err) {
    console.error("Error fetching token data:", err);
  }
};

export { fetchTokensList, fetchTokenData };
