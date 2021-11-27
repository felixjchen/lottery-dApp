import { ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";

interface ProviderMessage {
  type: string;
  data: unknown;
}

export const getMetamaskProvider = async () => {
  const provider = await detectEthereumProvider();
  return provider;
};

export const isMetamaskConnected = (provider: any) => {
  return provider.isConnected();
};

export const connectToMetamask = (provider: any) => {
  provider.request({ method: "eth_requestAccounts" });
};

export const addMetamaskListeners = (
  provider: any,
  chainChangedCallback: CallableFunction,
  messageCallback: CallableFunction,
  accountsChangedCallback: CallableFunction
) => {
  provider.on("chainChanged", (chainId: string) => {
    chainChangedCallback(chainId);
  });
  provider.on("message", (message: ProviderMessage) => {
    messageCallback(message);
  });
  provider.on("accountsChanged", (accounts: Array<string>) => {
    accountsChangedCallback(accounts);
  });
};

export const getAccountSigner = async (
  web3Provider: ethers.providers.Web3Provider
) => {
  return await web3Provider.getSigner();
};

export const weiToEth = (weiBalance: ethers.BigNumberish) => {
  return ethers.utils.formatEther(weiBalance);
};

export const ethToWei = (ethBalance: string) => {
  return ethers.utils.parseEther(ethBalance);
};

export const formatUnits = (
  weiBalance: ethers.BigNumberish,
  decimals: ethers.BigNumberish
) => {
  return ethers.utils.formatUnits(weiBalance, decimals);
};
