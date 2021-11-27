import React, { useContext } from "react";
import Button from "@mui/material/Button";
import { RootContext } from "../contexts/root_context";
import * as blockchain from "../apis/blockchain";

const reload_window = () => {
  window.location.reload();
};

const Control = () => {
  const {
    setMetamaskProvider,
    setProvider,
    address,
    setAddress,
    metamaskConnected,
  } = useContext(RootContext);

  const connect_wallet = async () => {
    const metamaskProvider = await blockchain.getMetamaskProvider();
    if (metamaskProvider) {
      setMetamaskProvider(metamaskProvider);
      blockchain.addAccountsChangedListener(metamaskProvider, reload_window);
      blockchain.connectMetamask(metamaskProvider);

      const provider = blockchain.getWeb3Provider(metamaskProvider);
      setProvider(provider);
      const [address] = await provider.listAccounts();
      setAddress(address);
    } else {
      alert("Could not find window.etherum");
    }
  };

  return (
    <>
      <Button
        variant="contained"
        disabled={metamaskConnected}
        onClick={connect_wallet}
      >
        {metamaskConnected ? address : "Connect Wallet"}
      </Button>
    </>
  );
};

export { Control };
