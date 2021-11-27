import React, { useContext } from "react";
import Button from "@mui/material/Button";
import { RootContext } from "../contexts/root_context";
import * as blockchain from "../apis/blockchain";

const Control = () => {
  const { setMetamaskProvider, address, setAddress, metamaskConnected } =
    useContext(RootContext);
  const connect_wallet = async () => {
    const metamaskProvider = await blockchain.getMetamaskProvider();
    if (metamaskProvider) {
      blockchain.addAccountsChangedListener(metamaskProvider, () => {
        "Addresses changed, reloading";
        window.location.reload();
      });
      blockchain.connectMetamask(metamaskProvider);
      const [address] = await blockchain.getAddresses(metamaskProvider);
      setAddress(address);
      setMetamaskProvider(metamaskProvider);
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
