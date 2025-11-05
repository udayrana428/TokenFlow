import { useState, useEffect } from "react";
import axios from "axios";

/**
 * Custom hook to fetch and update token prices at regular intervals.
 * @param {Array<string>} tokens - List of token IDs to fetch prices for.
 * @param {number} interval - Fetch interval in milliseconds (default: 5000 ms).
 */
const UseTokenPrices = (tokens, interval = 5000) => {
  const [prices, setPrices] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    let intervalId;

    const fetchPrices = async () => {
      if (!tokens || tokens.length === 0) return;
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/simple/price`,
          {
            params: {
              ids: tokens.join(","),
              vs_currencies: "usd",
            },
          }
        );
        setPrices(response.data);
      } catch (err) {
        setError(err);
        console.error("Error fetching token prices:", err);
      }
    };

    fetchPrices(); // Fetch immediately on mount
    intervalId = setInterval(fetchPrices, interval); // Fetch at regular intervals

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, [tokens, interval]);

  return { prices, error };
};

export default UseTokenPrices;
