import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { BrowserProvider, ethers } from "ethers";
import ERC20_ABI from "../../utils/abi/erc20.json";
import { useToken } from "../../context/TokenContext";
import { useWallet } from "../../context/WalletContext";
import Button from "../smallComponents/button/Button";
import TokenCard from "../smallComponents/TokenCard/TokenCard";
import { useNavigate } from "react-router-dom";
import UseTokenPrices from "../../hooks/UseTokenPrices";
import { calculateEstimatedAmount } from "../../utils/calculateEstimatedAmount";

const TokenSwap = () => {
  const { swapTokens, setSwapDetails, swapDetails } = useToken();
  const { isConnected, connectWallet } = useWallet();

  const { fromToken, toToken, amount, estimatedAmount } = swapDetails;

  const navigate = useNavigate();

  const tokens = useMemo(
    () => [fromToken, toToken].filter(Boolean),
    [fromToken, toToken]
  ); // Only include selected tokens

  // Fetch prices using the custom hook
  const { prices, error } = UseTokenPrices(tokens, 10000); // Update every 5 seconds
  console.log("prices: ", prices);

  // Automatically update estimated amount when dependencies change
  useEffect(() => {
    if (fromToken && toToken && amount >= 0) {
      const updatedEstimatedAmount = calculateEstimatedAmount(
        fromToken,
        toToken,
        amount,
        prices
      );
      setSwapDetails((prevDetails) => ({
        ...prevDetails,
        estimatedAmount: updatedEstimatedAmount,
      }));
    }
  }, [fromToken, toToken, amount, prices]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSwapDetails((prevDetails) => ({
      ...prevDetails,
      [name]: Number(value),
    }));
  };

  const handleSwapToken = () => {
    console.log("swap token clicked");
    // swapTokens(swapDetails);
  };

  return (
    <>
      <div className="relative space-y-3">
        <div className="bg-gray-900 rounded-lg p-4 space-y-2">
          <p>you pay</p>
          <div className="flex justify-between items-center">
            {swapDetails.fromToken ? (
              <TokenCard
                tokenId={swapDetails.fromToken}
                networkName={`on ${swapDetails.fromChainId}`}
                onClickHandler={() =>
                  navigate("/trade/tokensList?swapType=from")
                }
              />
            ) : (
              <div
                className="flex space-x-1 items-center bg-gray-800 p-2 rounded-full cursor-pointer hover:bg-primary hover:text-white"
                onClick={() => navigate("/trade/tokensList?swapType=from")}
              >
                <p>Select a token</p>
                <span>
                  <i className="fa-solid fa-chevron-down"></i>
                </span>
              </div>
            )}

            <input
              type="number"
              placeholder="$0"
              value={amount}
              name="amount"
              onChange={(e) => handleChange(e)}
              className="amount rounded-lg text-3xl bg-transparent outline-none placeholder:text-end text-end"
            />
          </div>
          <p>Ether</p>
        </div>
        <i className="fa-solid fa-arrow-down absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-2xl"></i>
        <div className="bg-gray-900 rounded-lg p-4 space-y-2">
          <p>you receive</p>
          <div className="flex justify-between items-center">
            {swapDetails.toToken ? (
              <TokenCard
                primaryImage="https://tokens-data.1inch.io/images/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png"
                secondaryImage="https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png"
                tokenId={swapDetails.toToken}
                networkName={`on ${swapDetails.toChainId}`}
                onClickHandler={() => navigate("/trade/tokensList?swapType=to")}
              />
            ) : (
              <div
                className="flex space-x-1 items-center bg-gray-800 p-2 rounded-full cursor-pointer hover:bg-primary hover:text-white"
                onClick={() => navigate("/trade/tokensList?swapType=to")}
              >
                <p>Select a token</p>
                <span>
                  <i className="fa-solid fa-chevron-down"></i>
                </span>
              </div>
            )}
            <input
              type="number"
              placeholder="$0"
              value={estimatedAmount}
              disabled
              name="estimatedAmount"
              // onChange={(e) => handleChange(e)}
              className="estimatedAmount rounded-lg text-3xl bg-transparent outline-none placeholder:text-end text-end "
            />
          </div>
          <p>Ether</p>
        </div>
      </div>
      {isConnected ? (
        <Button
          classes="py-2 rounded-lg"
          onClick={handleSwapToken}
          isDisabled={
            swapDetails.fromToken &&
            swapDetails.toToken &&
            swapDetails.amount &&
            swapDetails.amount > 0
              ? false
              : true
          }
        >
          Swap
        </Button>
      ) : (
        <Button classes="py-2 rounded-lg" onClick={connectWallet}>
          Connect Wallet
        </Button>
      )}
    </>
  );
};

export default TokenSwap;
