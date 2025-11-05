import axios from "axios";
import React, { useEffect, useState } from "react";
import TokenCardSkeleton from "../skeletons/TokenCardSkeleton";

const TokenCard = ({ tokenId, networkName, onClickHandler }) => {
  const [tokenData, setTokenData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchtokenData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${tokenId}`
        );
        setTokenData(response.data);
      } catch (err) {
        setError("Failed to fetch coin data.");
      } finally {
        setLoading(false);
      }
    };

    if (tokenId) {
      fetchtokenData();
    }
  }, [tokenId]);

  if (loading) {
    return (
      <div>
        <TokenCardSkeleton />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!tokenData) {
    return <div>No data available.</div>;
  }

  return (
    <>
      <div
        className="flex space-x-3 items-center p-2 rounded-md cursor-pointer hover:bg-gray-800"
        onClick={() => onClickHandler()}
      >
        <div className="relative">
          <img
            src={tokenData.image.thumb}
            className="w-9 rounded-full"
            alt={`${tokenData.web_slug} primary`}
          />
          <img
            src={tokenData.image.thumb}
            className="w-5 absolute bottom-[-3px] left-[-3px] rounded-full border-2 border-white"
            alt={`${networkName} secondary`}
          />
        </div>
        <div>
          <div className="flex space-x-1 items-center">
            <h4 className="uppercase">{tokenId}</h4>
            <span>
              <i className="fa-solid fa-chevron-right"></i>
            </span>
          </div>
          <p className="text-sm capitalize">{networkName}</p>
        </div>
      </div>
    </>
  );
};

export default TokenCard;
