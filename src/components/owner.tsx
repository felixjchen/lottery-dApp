import React, { useContext, useState, useRef } from "react";
import { RootContext } from "../contexts/root_context";
import Async from "react-async";
import * as blockchain from "../apis/blockchain";
import { Button, Input } from "@mui/material";

const Owner = () => {
  const { lotteryContract, provider } = useContext(RootContext);

  const ticketPriceRef = useRef<HTMLInputElement>(null);
  const managerAddressRef = useRef<HTMLInputElement>(null);
  const walletAddressRef = useRef<HTMLInputElement>(null);
  const [txnPending, setTxnPending] = useState("");

  const getOwnerData = async () => {
    const managers = await lotteryContract?.getManagers();
    const feeTotal = blockchain.weiToEth(await lotteryContract?.getFeeTotal());
    return { managers, feeTotal };
  };

  const setTicketPriceOnClick = async () => {
    const ticketPrice = ticketPriceRef.current?.value;
    if (ticketPrice) {
      const ticketPriceMantissa = blockchain.ethToWei(ticketPrice);
      const { hash } = await lotteryContract?.setTicketPrice(
        ticketPriceMantissa
      );
      setTxnPending(hash);
      await provider?.waitForTransaction(hash);
      window.location.reload();
    }
  };

  const addManagerOnClick = async () => {
    const managerAddress = managerAddressRef.current?.value;
    if (managerAddress) {
      const { hash } = await lotteryContract?.addManager(managerAddress);
      setTxnPending(hash);
      await provider?.waitForTransaction(hash);
      window.location.reload();
    }
  };

  const deleteManagerOnClick = async () => {
    const managerAddress = managerAddressRef.current?.value;
    if (managerAddress) {
      const { hash } = await lotteryContract?.ownerWithdraw(managerAddress);
      setTxnPending(hash);
      await provider?.waitForTransaction(hash);
      window.location.reload();
    }
  };

  const withdrawOnClick = async () => {
    const walletAddress = walletAddressRef.current?.value;
    if (walletAddress) {
      const { hash } = await lotteryContract?.ownerWithdraw(walletAddress);
      setTxnPending(hash);
      await provider?.waitForTransaction(hash);
      window.location.reload();
    }
  };

  return (
    <Async promiseFn={getOwnerData}>
      <Async.Pending>Loading...</Async.Pending>
      <Async.Fulfilled>
        {(data) => (
          <div>
            <h3>Owner</h3>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <Input
              placeholder="Ticket Price (in ether)"
              inputRef={ticketPriceRef}
            />
            <Button
              disabled={txnPending !== ""}
              variant="contained"
              onClick={setTicketPriceOnClick}
            >
              Set Ticket Price
            </Button>
            <Input placeholder="Manager Address" inputRef={managerAddressRef} />
            <Button
              disabled={txnPending !== ""}
              variant="contained"
              onClick={addManagerOnClick}
            >
              Add Manager
            </Button>
            <Button
              disabled={txnPending !== ""}
              variant="contained"
              onClick={deleteManagerOnClick}
            >
              Delete Manager
            </Button>
            <Input placeholder="Wallet Address" inputRef={walletAddressRef} />
            <Button
              disabled={txnPending !== ""}
              variant="contained"
              onClick={withdrawOnClick}
            >
              Withdraw
            </Button>
          </div>
        )}
      </Async.Fulfilled>
      <Async.Rejected>
        {(error) => `Something went wrong: ${error.message}`}
      </Async.Rejected>
    </Async>
  );
};

export { Owner };
