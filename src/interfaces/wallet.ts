import type { TokenSymbol } from '@web3-onboard/common';
import { AbstractProvider, BrowserProvider, Network, Signer } from 'ethers';

export interface Account {
  address: string;
  balance: Record<TokenSymbol, string> | null;
  ens: { name: string | undefined; avatar: string | undefined };
}

export interface EtherWalletConfig {
  provider: BrowserProvider | AbstractProvider;
  signer: Signer | null;
  network: Network | null;
  setProvider: (provider: BrowserProvider) => void;
}
