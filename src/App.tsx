import React, { useState, useEffect } from "react";
import { RootContextProvider } from "./contexts/root_context";
import { Wallet } from "./components/wallet";
import "./App.css";
import { useAsync } from "react-async";
import * as blockchain from "./apis/blockchain";
import { ethers } from "ethers";
import { Owner } from "./components/owner";
import { User } from "./components/user";
import { Draw } from "./components/draw";
import { Card } from "@mui/material";

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
  const [lotteryContract, setLotteryContract] = useState<
    ethers.Contract | undefined
  >(undefined);
  const [mockTokenContract, setMockTokenContract] = useState<
    ethers.Contract | undefined
  >(undefined);
  const [address, setAddress] = useState("");
  const [amIOwner, setAmIOwner] = useState(false);
  const [amIManager, setAmIManager] = useState(false);

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
          const { lotteryContract, mockTokenContract } =
            await blockchain.getContracts(provider);
          setLotteryContract(lotteryContract);
          setMockTokenContract(mockTokenContract);

          const amIOwner = await lotteryContract.amIOwner();
          setAmIOwner(amIOwner);
          const amIManager = await lotteryContract.amIManager();
          setAmIManager(amIManager);
        }
      })();
    }
  }, [initialMetamaskProvider]);

  const value = {
    metamaskProvider,
    setMetamaskProvider,
    address,
    setAddress,
    metamaskConnected,
    setMetamaskConnected,
    provider,
    lotteryContract,
    mockTokenContract,
  };

  return (
    <RootContextProvider value={value}>
      <div className="App">
        <header className="App-header">
          <div>
            {metamaskConnected && (
              <Card variant="outlined">
                <User></User>
              </Card>
            )}

            {metamaskConnected && amIOwner && (
              <Card variant="outlined">
                <Owner></Owner>
              </Card>
            )}
          </div>
          <Wallet></Wallet>

          {metamaskConnected && (amIOwner || amIManager) && <Draw></Draw>}
        </header>
      </div>
    </RootContextProvider>
  );
};

export default App;
