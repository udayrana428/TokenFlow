import React, { createContext, useContext, useState } from "react";
import { ethers } from "ethers";
import ERC20_ABI from "../utils/abi/erc20.json"; // Import the ERC20 ABI JSON

const TokenContext = createContext();

const TokenProvider = ({ children }) => {
  // const {provider, account} = useContext(WalletContext);

  const [allTokens, setAllTokens] = useState([]);
  const [allChains, setAllChains] = useState([]);
  const [selectedToken, setSelectedToken] = useState(null);
  const [selectedChainId, setSelectedChainId] = useState(null);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [prices, setPrices] = useState({});
  const [swapDetails, setSwapDetails] = useState({
    fromToken: "",
    toToken: "",
    amount: undefined,
    estimatedAmount: undefined,
    fromChainId: null,
    toChainId: null,
  });
  const [transferDetails, setTransferDetails] = useState({
    tokenAddress: "",
    toAddress: "",
    amount: null,
    chainId: null,
  });
  // const [fromTokenBalance, setFromTokenBalance] = useState(0);

  // Fetch token balance
  const fetchBalance = async (tokenAddress, account, provider) => {
    if (!tokenAddress || !account || !provider) {
      console.error("Missing parameters for fetching balance.");
      return;
    }

    try {
      const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
      const balance = await contract.balanceOf(account);
      const decimals = await contract.decimals();
      setTokenBalance(ethers.utils.formatUnits(balance, decimals));
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  // Fetch token balance for the selected from token
  const checkTokenBalance = async (provider, account) => {
    if (fromToken !== "ethereum") {
      const tokenAddress = getTokenAddress(fromToken);
      const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
      const balance = await contract.balanceOf(account);
      const decimals = await contract.decimals();
      setFromTokenBalance(ethers.utils.formatUnits(balance, decimals));
    } else {
      // For ETH, use the provider to get balance
      const balance = await provider.getBalance(account);
      setFromTokenBalance(ethers.utils.formatEther(balance));
    }
  };

  // Transfer tokens
  const transferTokens = async (tokenAddress, toAddress, amount, provider) => {
    if (!tokenAddress || !toAddress || !amount || !provider) {
      console.error("Missing parameters for transferring tokens.");
      return { success: false, error: "Invalid input parameters." };
    }

    try {
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
      const decimals = await contract.decimals();
      const tx = await contract.transfer(
        toAddress,
        ethers.utils.parseUnits(amount.toString(), decimals)
      );
      await tx.wait();
      console.log("Transfer successful", tx);
      return { success: true, tx };
    } catch (error) {
      console.error("Transfer failed:", error);
      return { success: false, error };
    }
  };

  // Perform token swap
  const swapTokens = async ({ fromToken, toToken, amount, provider }) => {
    console.log("swap token clicked");
    if (!fromToken || !toToken || !amount || !provider) {
      console.error("Missing parameters for swapping tokens.");
      return { success: false, error: "Invalid input parameters." };
    }

    try {
      // Example: Call a smart contract to perform the swap
      const signer = provider.getSigner();
      const swapContract = new ethers.Contract(
        SWAP_CONTRACT_ADDRESS,
        SWAP_ABI,
        signer
      );
      const decimals = await swapContract.decimals(); // Assuming uniform decimals
      const tx = await swapContract.swap(
        fromToken,
        toToken,
        ethers.utils.parseUnits(amount.toString(), decimals)
      );
      await tx.wait();
      console.log("Swap successful", tx);

      // Update balances after the swap
      const account = await signer.getAddress();
      await fetchBalance(fromToken, account, provider);
      await fetchBalance(toToken, account, provider);

      return { success: true, tx };
    } catch (error) {
      console.error("Swap failed:", error);
      return { success: false, error };
    }
  };

  return (
    <TokenContext.Provider
      value={{
        allTokens,
        setAllTokens,
        selectedToken,
        setSelectedToken,
        tokenBalance,
        setTokenBalance,
        fetchBalance,
        transferTokens,
        swapTokens,
        prices,
        setPrices,
        swapDetails,
        setSwapDetails,
        transferDetails,
        setTransferDetails,
        selectedChainId,
        setSelectedChainId,
        allChains,
        setAllChains,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};

const useToken = () => useContext(TokenContext);

export { useToken, TokenProvider };
