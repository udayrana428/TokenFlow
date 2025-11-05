import axios from "axios";

export const fetchTokenPrice = async (tokenSymbol) => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${tokenSymbol}&vs_currencies=usd`;

  try {
    const response = await axios.get(url);
    return response.data[tokenSymbol].usd;
  } catch (error) {
    console.error("Error fetching token price:", error);
    return null;
  }
};
