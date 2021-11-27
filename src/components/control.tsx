import React, { useContext } from "react";
import Button from "@mui/material/Button";
import { RootContext } from "../contexts/root_context";
import * as blockchain from "../apis/blockchain";
import { useAsync } from "react-async";

const Control = () => {
  const { isMetamaskConnected, provider, setProvider } =
    useContext(RootContext);

  const connect_wallet_onclick = async () => {
    const provider = await blockchain.getMetamaskProvider();
    if (provider) {
      blockchain.connectToMetamask(provider);
      setProvider(provider);
    } else {
      alert("Could not find window.etherum");
    }
  };
  connect_wallet_onclick();

  console.log({ isMetamaskConnected, provider });
  return (
    <Button
      variant="contained"
      disabled={provider !== undefined}
      onClick={connect_wallet_onclick}
    >
      Connect Wallet
    </Button>
  );
};

export { Control };
