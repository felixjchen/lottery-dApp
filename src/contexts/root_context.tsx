import { createContext } from "react";
import type { ReactNode } from "react";

const NO_OP = () => {};

interface RootContextValue {
  metamaskProvider: any;
  setMetamaskProvider: CallableFunction;
  address: string;
  setAddress: CallableFunction;
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
});
const RootContextProvider = ({ children, value }: RootContextProviderProps) => {
  return <RootContext.Provider value={value}>{children}</RootContext.Provider>;
};
export { RootContextProvider, RootContext };
