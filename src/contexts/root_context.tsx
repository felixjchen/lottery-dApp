import { createContext } from "react";
import type { ReactNode } from "react";
import { ethers } from "ethers";

const NO_OP = () => {};

interface RootContextValue {
  metamaskProvider: any;
  setMetamaskProvider: CallableFunction;
  address: string;
  setAddress: CallableFunction;
  metamaskConnected: boolean;
  setMetamaskConnected: CallableFunction;
  provider: ethers.providers.Web3Provider | undefined;
  setProvider: CallableFunction;
  balance: string;
  setBalance: CallableFunction;
}
interface RootContextProviderProps {
  children: ReactNode;
  value: RootContextValue;
}
const RootContext = createContext<RootContextValue>({
  metamaskProvider: undefined,
  setMetamaskProvider: NO_OP,
  address: "",
  setAddress: NO_OP,
  metamaskConnected: false,
  setMetamaskConnected: NO_OP,
  provider: undefined,
  setProvider: NO_OP,
  balance: "",
  setBalance: NO_OP,
});
const RootContextProvider = ({ children, value }: RootContextProviderProps) => {
  return <RootContext.Provider value={value}>{children}</RootContext.Provider>;
};
export { RootContextProvider, RootContext };
