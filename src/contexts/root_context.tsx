import { createContext } from "react";
import type { ReactNode } from "react";

const NO_OP = () => {};

interface RootContextValue {
  provider: any;
  setProvider: CallableFunction;
  isMetamaskConnected: boolean;
  setIsMetamaskConnected: CallableFunction;
}
interface RootContextProviderProps {
  children: ReactNode;
  value: RootContextValue;
}
const RootContext = createContext<RootContextValue>({
  provider: undefined,
  setProvider: NO_OP,
  isMetamaskConnected: false,
  setIsMetamaskConnected: NO_OP,
});
const RootContextProvider = ({ children, value }: RootContextProviderProps) => {
  return <RootContext.Provider value={value}>{children}</RootContext.Provider>;
};
export { RootContextProvider, RootContext };
