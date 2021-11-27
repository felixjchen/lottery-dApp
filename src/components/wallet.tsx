import React, { useContext } from "react";
import { Button } from "@mui/material";
import { RootContext } from "../contexts/root_context";
import * as blockchain from "../apis/blockchain";

const reload_window = () => {
  window.location.reload();
};

const Wallet = () => {
  const { setMetamaskProvider, address, metamaskConnected } =
    useContext(RootContext);

  const connectWalletOnClick = async () => {
    const metamaskProvider = await blockchain.getMetamaskProvider();
    if (metamaskProvider) {
      setMetamaskProvider(metamaskProvider);
      blockchain.addAccountsChangedListener(metamaskProvider, reload_window);
      blockchain.connectMetamask(metamaskProvider);
    } else {
      alert("Could not find window.etherum");
    }
  };

  return (
    <>
      <Button
        variant="contained"
        disabled={metamaskConnected}
        onClick={connectWalletOnClick}
      >
        {metamaskConnected ? address : "Connect Wallet"}
      </Button>
    </>
  );
};

export { Wallet };
