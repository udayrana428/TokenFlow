import React, { useState } from "react";

const WalletConnector = () => {
  
  const { isConnected, connectWallet } = useContext(WalletContext);
  const handleConnectWallet = ()=>{
    connectWallet()
  }
  return (
    <button onClick={handleConnectWallet}>
      {isConnected ? "Wallet Connected" : "Connect Wallet"}
    </button>
  );
};

export default WalletConnector;
