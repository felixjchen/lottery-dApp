import React, { useContext, useState } from "react";
import { RootContext } from "../contexts/root_context";
import Async from "react-async";
import * as blockchain from "../apis/blockchain";
import { Button } from "@mui/material";

import { lottery_address } from "../constants/smart_contract_address.json";

const User = () => {
  const { lotteryContract, mockTokenContract, address, provider } =
    useContext(RootContext);

  const [buyPending, setBuyPending] = useState("");
  const [needApprove, setNeedApprove] = useState(true);

  const getUserData = async () => {
    const ticketCount = (await lotteryContract?.getTickets()).toNumber();
    const prizeTotal = blockchain.weiToEth(
      await lotteryContract?.getPrizeTotal()
    );
    const ticketPrice = blockchain.weiToEth(
      await lotteryContract?.getTicketPrice()
    );
    const balance = `${blockchain.weiToEth(
      await mockTokenContract?.balanceOf(address)
    )}`;
    const allowance = await mockTokenContract?.allowance(
      address,
      lotteryContract?.address
    );
    const needApprove = allowance.lt(await lotteryContract?.getTicketPrice());
    setNeedApprove(needApprove);
    return { ticketCount, prizeTotal, ticketPrice, balance };
  };

  const buyTicketOnClick = async () => {
    const { hash } = await lotteryContract?.buyTickets(1);
    setBuyPending(hash);
    await provider?.waitForTransaction(hash);
    window.location.reload();
  };

  const approveOnClick = async () => {
    const { hash } = await mockTokenContract?.approve(
      lottery_address,
      blockchain.getMaxBigNumber()
    );
    setBuyPending(hash);
    await provider?.waitForTransaction(hash);
    window.location.reload();
  };

  const buttonOnClick = async () => {
    try {
      needApprove ? await approveOnClick() : await buyTicketOnClick();
    } catch {}
  };

  return (
    <Async promiseFn={getUserData}>
      <Async.Pending>Loading...</Async.Pending>
      <Async.Fulfilled>
        {(data: any) => {
          const insufficentBalance =
            Number(data.balance) < Number(data.ticketPrice);
          return (
            <div>
              <h3>User</h3>
              <pre>{JSON.stringify(data, null, 2)}</pre>
              <Button
                variant="contained"
                onClick={buttonOnClick}
                disabled={buyPending !== "" || insufficentBalance}
              >
                {insufficentBalance
                  ? "Insufficient balance"
                  : buyPending !== ""
                  ? buyPending
                  : needApprove
                  ? "Approve"
                  : "Buy Ticket"}
              </Button>
            </div>
          );
        }}
      </Async.Fulfilled>
      <Async.Rejected>
        {(error) => `Something went wrong: ${error.message}`}
      </Async.Rejected>
    </Async>
  );
};

export { User };
