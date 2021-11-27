import { ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";

interface ProviderMessage {
  type: string;
  data: unknown;
}
interface ConnectInfo {
  chainId: string;
}
interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: unknown;
}

export const getWeb3Provider = (provider: any) => {
  return new ethers.providers.Web3Provider(provider);
};

export const getMetamaskProvider = async () => {
  const provider = await detectEthereumProvider();
  return provider;
};

export const isMetamaskConnected = async (provider: any) => {
  return await provider.isConnected();
};

export const getAddresses = (provider: any) => {
  return provider.request({ method: "eth_requestAccounts" });
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

export const addConnectListener = (
  provider: any,
  connectCallback: CallableFunction
) => {
  provider.on("connect", (connectInfo: ConnectInfo) => {
    connectCallback(connectInfo);
  });
};

export const addDisconnectListener = (
  provider: any,
  disconnectCallback: CallableFunction
) => {
  provider.on("disconnect", (error: ProviderRpcError) => {
    console.log(error);
    disconnectCallback(error);
  });
};

export const addChainChangedListener = (
  provider: any,
  chainChangedCallback: CallableFunction
) => {
  provider.on("chainChanged", (chainId: string) => {
    chainChangedCallback(chainId);
  });
};

export const addMessageListener = (
  provider: any,
  messageCallback: CallableFunction
) => {
  provider.on("message", (message: ProviderMessage) => {
    messageCallback(message);
  });
};

export const addAccountsChangedListener = (
  provider: any,
  accountsChangedCallback: CallableFunction
) => {
  provider.on("accountsChanged", (accounts: Array<string>) => {
    accountsChangedCallback(accounts);
  });
};
