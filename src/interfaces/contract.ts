import { Contract, Interface, InterfaceAbi } from 'ethers';

export interface LotteryContractState {
  players: string[];
  lotteryCount: number;
  manager: string;
  balance: number;
  endDate: number;
  isLoading: boolean;
  getContractInfo: (lotteryContract: Contract) => void;
  getNewPlayersAndBalance: (lotteryContract: Contract) => void;
}

export interface ContractInfo {
  ADDRESS: Record<number, string>;
  ABI: Interface | InterfaceAbi;
}
