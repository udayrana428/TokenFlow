import React, { useEffect, useState } from "react";
import Button from "../components/smallComponents/button/Button";

const Test = () => {
  const [list, setList] = useState([]);
  const [name, setName] = useState("");
  const [coinData, setCoinData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/list?include_platform=true"
      );
      const data = await response.json();
      console.log("Fetched Data:", data);
      setList(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrorMessage("Failed to fetch data. Please try again later.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setErrorMessage("Please enter a valid token name.");
      setCoinData(null);
      return;
    }

    const foundCoin = list.find(
      (coin) => coin.name.toLowerCase() === name.toLowerCase()
    );

    console.log("Found Coin:", foundCoin);

    if (foundCoin) {
      setCoinData(foundCoin);
      setErrorMessage(""); // Clear any previous error message
    } else {
      setCoinData(null);
      setErrorMessage("Token not found. Please check the name and try again.");
    }
  };

  return (
    <div className="h-screen max-w-2xl mx-auto pt-32">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
        <label htmlFor="tokenName">Token Name</label>
        <input
          type="text"
          id="tokenName"
          value={name}
          className="rounded-full px-4 py-2"
          placeholder="Enter token name"
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" classes="px-3 py-2 rounded-full w-fit">
          Get Data
        </button>
      </form>

      <div className="mt-6">
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {coinData && (
          <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Token Details:</h3>
            <p>
              <strong>ID:</strong> {coinData.id}
            </p>
            <p>
              <strong>Symbol:</strong> {coinData.symbol}
            </p>
            <p>
              <strong>Name:</strong> {coinData.name}
            </p>
            <p>
              <strong>Platforms:</strong>
            </p>
            <ul className="list-disc pl-4">
              {Object.entries(coinData.platforms).map(([platform, address]) => (
                <li key={platform}>
                  <strong>{platform}:</strong> {address}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Test;
