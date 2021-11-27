import React, { useContext } from "react";
import { RootContext } from "../contexts/root_context";
import Async from "react-async";
import * as blockchain from "../apis/blockchain";
const Lottery = () => {
  const { lotteryContract, mockTokenContract, address } =
    useContext(RootContext);

  const getLotteryData = async (args: any) => {
    const ticketCount = blockchain.weiToEth(
      await lotteryContract?.getTickets()
    );
    const prizeTotal = blockchain.weiToEth(
      await lotteryContract?.getPrizeTotal()
    );
    const ticketPrice = blockchain.weiToEth(
      await lotteryContract?.getTicketPrice()
    );
    const balance = `${blockchain.weiToEth(
      await mockTokenContract?.balanceOf(address)
    )} MOK`;
    return { ticketCount, prizeTotal, ticketPrice, balance };
  };

  return (
    <Async promiseFn={getLotteryData}>
      <Async.Pending>Loading...</Async.Pending>
      <Async.Fulfilled>
        {(data) => (
          <div>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </Async.Fulfilled>
      <Async.Rejected>
        {(error) => `Something went wrong: ${error.message}`}
      </Async.Rejected>
    </Async>
  );
};

export { Lottery };
