import React, { useState } from "react";
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
  const initialIsMetamaskConnected = initialProvider
    ? blockchain.isMetamaskConnected(initialProvider)
    : false;

  const [provider, setProvider] = useState(initialProvider);
  const [isMetamaskConnected, setIsMetamaskConnected] = useState(
    initialIsMetamaskConnected
  );

  const value = {
    provider,
    setProvider,
    isMetamaskConnected,
    setIsMetamaskConnected,
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
