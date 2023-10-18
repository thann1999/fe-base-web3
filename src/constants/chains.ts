const INFURA_KEY = import.meta.env.VITE_REACT_INFURA_API_KEY;

export const CHAINS = {
  1: {
    id: 1,
    token: 'ETH',
    label: 'Ethereum Mainnet',
    rpcUrl: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
  },
  11155111: {
    id: 11155111,
    token: 'ETH',
    label: 'Sepolia',
    rpcUrl: `https://sepolia.infura.io/v3/${INFURA_KEY}`,
  },
  59140: {
    id: 59140,
    token: 'ETH',
    label: 'Linea Goreli',
    rpcUrl: `https://linea-goerli.infura.io/v3/${INFURA_KEY}`,
  },
};

export enum ChainId {
  EthereumMainnet = 1,
  Sepolia = 11155111,
  Linea = 59140,
}
