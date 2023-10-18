import { parseEther } from 'ethers';
import { create } from 'zustand';

import { LotteryContractState } from '@root/interfaces';

const useLotteryStore = create<LotteryContractState>((set) => ({
  lotteryCount: 0,
  players: [],
  manager: '',
  endDate: 0,
  balance: 0,
  isLoading: false,
  getContractInfo: async (lotteryContract) => {
    set({
      isLoading: true,
    });
    const response = await Promise.all([
      lotteryContract.manager() as Promise<string>,
      lotteryContract.lotteryCount() as Promise<number>,
      lotteryContract.getPlayers() as Promise<string[]>,
      lotteryContract.endDate() as Promise<string>,
      lotteryContract.getBalance() as Promise<bigint>,
    ]);

    set({
      isLoading: false,
      manager: response[0],
      lotteryCount: Number(response[1]) || 0,
      players: response[2],
      endDate: Number(response[3]) * 1000 || 0,
      balance: Number(parseEther(response[4].toString())),
    });
  },
  getNewPlayersAndBalance: async (lotteryContract) => {
    const response = await Promise.all([
      lotteryContract.getPlayers(),
      lotteryContract.getBalance(),
    ]);
    set((prev) => ({
      ...prev,
      players: response[0],
      balance: Number(parseEther(response[1])),
    }));
  },
}));

export default useLotteryStore;
