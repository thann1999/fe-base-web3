import coinbaseModule from '@web3-onboard/coinbase';
import injectedModule from '@web3-onboard/injected-wallets';
import { init } from '@web3-onboard/react';
import tahoModule from '@web3-onboard/taho';
import trustModule from '@web3-onboard/trust';

const INFURA_KEY = import.meta.env.INFURA_API_KEY;

const coinbase = coinbaseModule();
const taho = tahoModule(); // Pviously named Tally Ho walletre
const trust = trustModule();
const injected = injectedModule();

const wallets = [injected, trust, taho, coinbase];

const chains = [
  {
    id: '0x1',
    token: 'ETH',
    label: 'Ethereum Mainnet',
    rpcUrl: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
  },
  {
    id: '0x5',
    token: 'ETH',
    label: 'Goerli',
    rpcUrl: `https://goerli.infura.io/v3/${INFURA_KEY}`,
  },
  {
    id: '0x13881',
    token: 'MATIC',
    label: 'Polygon - Mumbai',
    rpcUrl: 'https://matic-mumbai.chainstacklabs.com',
  },
  {
    id: '0x38',
    token: 'BNB',
    label: 'Binance',
    rpcUrl: 'https://bsc-dataseed.binance.org/',
  },
  {
    id: '0xA',
    token: 'OETH',
    label: 'Optimism',
    rpcUrl: 'https://mainnet.optimism.io',
  },
  {
    id: '0xA4B1',
    token: 'ARB-ETH',
    label: 'Arbitrum',
    rpcUrl: 'https://rpc.ankr.com/arbitrum',
  },
];

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
  chains,
  appMetadata,
  connect: {
    autoConnectLastWallet: true,
  },
});
