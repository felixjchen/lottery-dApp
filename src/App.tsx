import React, { useState, useEffect } from "react";
import { RootContextProvider } from "./contexts/root_context";
import { Wallet } from "./components/wallet";
import "./App.css";
import { useAsync } from "react-async";
import * as blockchain from "./apis/blockchain";
import { ethers } from "ethers";
import { Lottery } from "./components/lottery";

const App = () => {
  const initialMetamaskProvider = useAsync({
    promiseFn: blockchain.getMetamaskProvider,
  }).data;

  const [metamaskProvider, setMetamaskProvider] = useState(
    initialMetamaskProvider
  );
  const [metamaskConnected, setMetamaskConnected] = useState(false);
  const [provider, setProvider] = useState<
    ethers.providers.Web3Provider | undefined
  >(undefined);
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");

  useEffect(() => {
    if (initialMetamaskProvider) {
      setMetamaskProvider(initialMetamaskProvider);
      const provider = blockchain.getWeb3Provider(initialMetamaskProvider);
      setProvider(provider);
      (async () => {
        const metamaskConnected = await blockchain.isMetamaskConnected(
          provider
        );
        setMetamaskConnected(metamaskConnected);
        const [address] = await provider.listAccounts();
        setAddress(address);

        if (address) {
          const { lottery_contract, mock_token_contract } =
            await blockchain.getContracts(provider);
          const balance = await mock_token_contract.balanceOf(address);
          setBalance(blockchain.weiToEth(balance));
        }
      })();
    }
  }, [initialMetamaskProvider]);

  const value = {
    balance,
    setBalance,
    metamaskProvider,
    setMetamaskProvider,
    address,
    setAddress,
    metamaskConnected,
    setMetamaskConnected,
    provider,
    setProvider,
  };

  return (
    <RootContextProvider value={value}>
      <div className="App">
        <header className="App-header">
          <Wallet></Wallet>
          {metamaskConnected && <Lottery></Lottery>}
        </header>
      </div>
    </RootContextProvider>
  );
};

export default App;
