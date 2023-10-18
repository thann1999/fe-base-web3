import { ethers } from 'ethers';
import { create } from 'zustand';

import { DEFAULT_URL_PROVIDER } from '@root/constants';
import { EtherWalletConfig } from '@root/interfaces';

const useEtherWalletStore = create<EtherWalletConfig>((set) => ({
  provider: ethers.getDefaultProvider(DEFAULT_URL_PROVIDER),
  signer: null,
  network: null,
  async setProvider(provider) {
    set({
      provider,
      network: await provider.getNetwork(),
      signer: await provider.getSigner(),
    });
  },
}));

export default useEtherWalletStore;
