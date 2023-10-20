import coinbaseModule from '@web3-onboard/coinbase';
import injectedModule from '@web3-onboard/injected-wallets';
import { init } from '@web3-onboard/react';
import tahoModule from '@web3-onboard/taho';
import trustModule from '@web3-onboard/trust';

import { CHAINS } from '@root/constants';

const coinbase = coinbaseModule();
const taho = tahoModule(); // Previously named Tally Ho walletre
const trust = trustModule();
const injected = injectedModule();

const wallets = [injected, coinbase, taho, trust];

const appMetadata = {
  name: 'Shadow Knight',
  icon: '<svg></svg>',
  description: 'Shadow Knight NFT',
  recommendedInjectedWallets: [
    { name: 'MetaMask', url: 'https://metamask.io' },
    { name: 'Coinbase', url: 'https://wallet.coinbase.com/' },
  ],
};

export const web3Wallet = init({
  wallets,
  chains: Object.values(CHAINS),
  appMetadata,
  accountCenter: {
    desktop: {
      enabled: true,
      minimal: false,
      position: 'topRight',
    },
    mobile: {
      enabled: true,
      minimal: true,
      position: 'topRight',
    },
  },
  connect: {
    autoConnectLastWallet: true,
  },
});
