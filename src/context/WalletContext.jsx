import { createContext, useContext, useState } from "react";

import { ethers, BrowserProvider } from "ethers";

const WalletContext = createContext();

const WalletProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false); // Connection status
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask not detected. Please install it!");
      return;
    }

    try {
      // Create a new provider instance
      const providerInstance = new BrowserProvider(window.ethereum);
      console.log("provider: ", providerInstance);

      // Request the user's account
      const signer = await providerInstance.getSigner();
      console.log(signer);
      const account = await signer.getAddress();

      // Set account and provider in the state
      setAccount(account);
      setProvider(providerInstance);
      setIsConnected(true);

      console.log("Connected account:", account);
    } catch (error) {
      console.error("Wallet connection failed:", error);
    }
  };
  return (
    <>
      <WalletContext.Provider
        value={{ isConnected, account, provider, connectWallet }}
      >
        {children}
      </WalletContext.Provider>
    </>
  );
};

const useWallet = () => useContext(WalletContext);

export { WalletProvider, useWallet };
