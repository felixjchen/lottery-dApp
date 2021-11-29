import { ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
import {
  lottery_address,
  mocktoken_address,
} from "../constants/smart_contract_address.json";
import { abi as lotter_abi } from "../abis/Lottery.json";
import { abi as mocktoken_abi } from "../abis/MockToken.json";

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

export const getMetamaskProvider = async () => {
  return await detectEthereumProvider();
};
export const getWeb3Provider = (metamaskProvider: any) => {
  return new ethers.providers.Web3Provider(metamaskProvider);
};
export const connectMetamask = (metamaskProvider: any) => {
  metamaskProvider.request({ method: "eth_requestAccounts" });
};
export const isMetamaskConnected = async (
  provider: ethers.providers.Web3Provider
) => {
  const accounts = await provider.listAccounts();
  return accounts.length > 0;
};
export const getAccountSigner = async (
  provider: ethers.providers.Web3Provider
) => {
  return await provider.getSigner();
};
export const getContracts = async (provider: ethers.providers.Web3Provider) => {
  const signer = provider.getSigner();
  const lotteryContract = new ethers.Contract(
    lottery_address,
    lotter_abi,
    signer
  );
  const mockTokenContract = new ethers.Contract(
    mocktoken_address,
    mocktoken_abi,
    signer
  );
  return { lotteryContract, mockTokenContract };
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

export const weiToEth = (weiBalance: ethers.BigNumberish) => {
  return ethers.utils.formatEther(weiBalance);
};
export const ethToWei = (ethBalance: string) => {
  return ethers.utils.parseEther(ethBalance);
};
export const getMaxBigNumber = () => {
  return ethers.constants.MaxUint256;
};
export const formatUnits = (
  weiBalance: ethers.BigNumberish,
  decimals: ethers.BigNumberish
) => {
  return ethers.utils.formatUnits(weiBalance, decimals);
};
