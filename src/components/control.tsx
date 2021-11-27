import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { RootContext } from "../contexts/root_context";
import * as blockchain from "../apis/blockchain";

const Control = () => {
  const { provider, setProvider, address, setAddress } =
    useContext(RootContext);

  const connect_wallet = async () => {
    const provider: any = await blockchain.getMetamaskProvider();
    if (provider) {
      const [address] = await blockchain.getAddresses(provider);
      setAddress(address);
      setProvider(provider);
    } else {
      alert("Could not find window.etherum");
    }
  };

  return (
    <>
      <Button
        variant="contained"
        disabled={provider !== undefined}
        onClick={connect_wallet}
      >
        {provider !== undefined ? address : "Connect Wallet"}
      </Button>
    </>
  );
};

export { Control };
