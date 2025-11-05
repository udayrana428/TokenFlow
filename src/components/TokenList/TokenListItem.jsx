import React, { useEffect, useState } from "react";
import { useToken } from "../../context/TokenContext";
import { useNavigate, useSearchParams } from "react-router-dom";

const TokenListItem = ({ token, handleSelectedToken, showChains }) => {
  const { id, symbol, name, platforms } = token;

  const {
    selectedChainId,
    setSelectedChainId,
    setSwapDetails,
    swapDetails,
    selectedToken,
  } = useToken();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const swapType = searchParams.get("swapType");

  // useEffect(() => {}, [showChains]);

  const handleSelectChainWithToken = (chainId) => {
    setSelectedChainId(chainId);
    // const updatedParams = new URLSearchParams(searchParams);
    // updatedParams.set(
    //   swapType === "from" ? "fromToken" : "toToken",
    //   selectedToken
    // );
    // updatedParams.set(
    //   swapType === "from" ? "fromChainId" : "toChainId",
    //   chainId
    // );
    // updatedParams.delete("swapType");
    setSwapDetails({
      ...swapDetails,
      [swapType === "from" ? "fromChainId" : "toChainId"]: chainId,
      [swapType === "from" ? "fromToken" : "toToken"]: selectedToken,
    });
    navigate(`/trade/token-swap`);
    // setSwapDetails({ ...swapDetails });
    // navigate("/trade/token-swap");
  };

  return (
    <>
      <div
        className="token-item flex justify-between p-2 hover:bg-gray-900 cursor-pointer"
        onClick={() => handleSelectedToken(token.id)}
      >
        <div className="flex">
          <img src="" alt="" />
          <div className="">
            <h3>{name}</h3>
            <p>
              {symbol} <span>{Object.keys(platforms).length} network</span>
            </p>
          </div>
        </div>
        <div className="">$0</div>
      </div>
      {showChains && (
        <div
          className={`flex space-x-2 p-2 transform ${
            showChains ? "translate-y-0" : "-translate-y-16"
          } transition-transform duration-300 ease-in`}
        >
          <i className="fa-solid fa-arrow-right"></i>
          <div className="grid grid-cols-3 gap-3">
            {Object.keys(platforms).map((platform) => (
              <div
                className="flex space-x-2 justify-between bg-gray-900 px-2 py-1 rounded-md items-center w-full cursor-pointer"
                onClick={() => handleSelectChainWithToken(platform)}
                key={platform}
              >
                <p>{platform}</p>
                <img
                  src="https://tokens-data.1inch.io/images/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png"
                  alt=""
                  className="w-5 h-5"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default TokenListItem;
