import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import { RootContextProvider } from "./contexts/root_context";
import { Control } from "./components/control";
import "./App.css";
import { useAsync } from "react-async";
import * as blockchain from "./apis/blockchain";

const App = () => {
  const initialMetamaskProvider = useAsync({
    promiseFn: blockchain.getMetamaskProvider,
  }).data;
  const initialMetamaskConnected =
    useAsync({
      promiseFn: blockchain.isMetamaskConnected,
      provider: initialMetamaskProvider,
    }).data || false;

  const [metamaskProvider, setMetamaskProvider] = useState(
    initialMetamaskProvider
  );
  const [metamaskConnected, setMetamaskConnected] = useState(
    initialMetamaskConnected
  );
  const [address, setAddress] = useState("");

  useEffect(() => {
    setMetamaskProvider(initialMetamaskProvider);
    (async () => {
      if (initialMetamaskProvider) {
        const metamaskConnected = await blockchain.isMetamaskConnected(
          initialMetamaskProvider
        );
        setMetamaskConnected(metamaskConnected);
      }
    })();
  }, [initialMetamaskProvider]);

  useEffect(() => {
    if (metamaskProvider) {
      (async () => {
        const [address] = await blockchain.getAddresses(metamaskProvider);
        setAddress(address);
      })();
    }
  }, [metamaskProvider, setAddress]);

  console.log({
    initialMetamaskConnected,
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
