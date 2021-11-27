import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { RootContext } from "../contexts/root_context";
import * as blockchain from "../apis/blockchain";

const Control = () => {
  const { metamaskProvider, setMetamaskProvider, address, setAddress } =
    useContext(RootContext);

  const connect_wallet = async () => {
    const metamaskProvider: any = await blockchain.getMetamaskProvider();
    if (metamaskProvider) {
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
        disabled={metamaskProvider !== undefined}
        onClick={connect_wallet}
      >
        {metamaskProvider !== undefined ? address : "Connect Wallet"}
      </Button>
    </>
  );
};

export { Control };
