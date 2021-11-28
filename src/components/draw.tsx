import React, { useContext, useState } from "react";
import { RootContext } from "../contexts/root_context";
import { Button } from "@mui/material";

const Draw = () => {
  const { lotteryContract, provider } = useContext(RootContext);

  const [txhash, setTxhash] = useState("");

  const drawOnClick = async () => {
    const { hash } = await lotteryContract?.draw();
    setTxhash(hash);
    await provider?.waitForTransaction(hash);
    window.location.reload();
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={drawOnClick}
        disabled={txhash !== ""}
      >
        {txhash !== "" ? txhash : "Draw"}
      </Button>{" "}
    </>
  );
};

export { Draw };
