import React, { useContext, useState } from "react";
import { ethers } from "ethers";
import { useToken } from "../../context/TokenContext";
import Button from "../smallComponents/button/Button";
import { useWallet } from "../../context/WalletContext";

const TokenTransfer = () => {
  const {
    provider,
    transferTokens,
    fetchBalance,
    tokenBalance,
    transferDetails,
    setTransferDetails,
  } = useToken();
  const { isConnected, connectWallet } = useWallet();
  const { tokenAddress, toAddress, amount, chainId } = transferDetails;

  const handleChange = (e) => {
    setTransferDetails({ ...transferDetails, [e.target.name]: e.target.value });
  };

  const handleTransferToken = () => {
    transferTokens(contractAddress, recipient, amount, provider);
  };

  return (
    <>
      <div className="bg-gray-900 rounded-lg p-4">
        <p>you're sending</p>
        <div className="flex justify-between items-center">
          <input
            type="text"
            placeholder="select token"
            className="bg-transparent"
            value={amount}
            name="tokenAddress"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="number"
            placeholder="$0"
            value={tokenAddress}
            onChange={(e) => handleChange(e)}
            className=" rounded-lg text-3xl bg-transparent outline-none placeholder:text-end text-end w-full"
          />
        </div>
        <p>Ether</p>
      </div>
      <div className="bg-gray-900 rounded-lg p-4">
        <p>to</p>
        <input
          type="text"
          placeholder="Recipient Address"
          value={toAddress}
          name="toAddress"
          onChange={(e) => handleChange(e)}
          className="rounded-lg  bg-transparent outline-none w-full"
        />
      </div>
      {isConnected ? (
        <Button classes="py-2 rounded-lg" onClick={handleTransferToken}>
          Transfer
        </Button>
      ) : (
        <Button classes="py-2 rounded-lg" onClick={connectWallet}>
          Connect Wallet
        </Button>
      )}
    </>
  );
};

export default TokenTransfer;
