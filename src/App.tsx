import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import { RootContextProvider } from "./contexts/root_context";
import { Control } from "./components/control";
import "./App.css";
import { useAsync } from "react-async";
import * as blockchain from "./apis/blockchain";
import { ethers } from "ethers";

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
      })();
    }
  }, [initialMetamaskProvider]);

  console.log({
    metamaskConnected,
    metamaskProvider,
  });

  const value = {
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
          <Control></Control>
          <img src={logo} className="App-logo" alt="logo" />
        </header>
      </div>
    </RootContextProvider>
  );
};

export default App;
