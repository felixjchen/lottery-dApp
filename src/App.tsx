import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import { RootContextProvider } from "./contexts/root_context";
import { Control } from "./components/control";
import "./App.css";
import { useAsync } from "react-async";
import * as blockchain from "./apis/blockchain";

const App = () => {
  const initialProvider = useAsync({
    promiseFn: blockchain.getMetamaskProvider,
  }).data;

  const [provider, setProvider] = useState(initialProvider);
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (provider) {
      (async () => {
        const [address] = await blockchain.getAddresses(provider);
        setAddress(address);
      })();
    }
  }, [provider, setAddress]);
  useEffect(() => {
    setProvider(initialProvider);
  }, [initialProvider]);

  const value = {
    provider,
    setProvider,
    address,
    setAddress,
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
