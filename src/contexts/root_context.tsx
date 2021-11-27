import { createContext } from "react";
import type { ReactNode } from "react";
import { ethers } from "ethers";

const NO_OP = () => {};

interface RootContextValue {
  address: string;
  metamaskProvider: any;
  metamaskConnected: boolean;
  provider: ethers.providers.Web3Provider | undefined;
  // balance: string;
  lotteryContract: ethers.Contract | undefined;
  mockTokenContract: ethers.Contract | undefined;
  setMetamaskProvider: CallableFunction;
  setAddress: CallableFunction;
  setMetamaskConnected: CallableFunction;
  // setBalance: CallableFunction;
}
interface RootContextProviderProps {
  children: ReactNode;
  value: RootContextValue;
}
const RootContext = createContext<RootContextValue>({
  metamaskProvider: undefined,
  address: "",
  metamaskConnected: false,
  provider: undefined,
  // balance: "",
  lotteryContract: undefined,
  mockTokenContract: undefined,
  setMetamaskProvider: NO_OP,
  setAddress: NO_OP,
  setMetamaskConnected: NO_OP,
  // setBalance: NO_OP,
});
const RootContextProvider = ({ children, value }: RootContextProviderProps) => {
  return <RootContext.Provider value={value}>{children}</RootContext.Provider>;
};
export { RootContextProvider, RootContext };
