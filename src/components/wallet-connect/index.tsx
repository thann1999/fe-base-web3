import React, { useEffect } from 'react';

import { Icon } from '@iconify/react';
import { useConnectWallet } from '@web3-onboard/react';
import { Button } from 'antd';
import { ethers } from 'ethers';

import { useEtherWalletStore } from '@root/services/store';
import { formatAddress } from '@root/utils';

const WalletConnect = () => {
  const [{ wallet, connecting }, connect] = useConnectWallet();
  const { setProvider } = useEtherWalletStore();

  useEffect(() => {
    // If the wallet has a provider than the wallet is connected
    if (wallet?.provider) {
      setProvider(new ethers.BrowserProvider(wallet.provider));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet]);

  return wallet?.provider && wallet.accounts[0] ? (
    <Button
      type="primary"
      className="flex items-center mx-4"
      icon={<Icon icon="iconoir:wallet" fontSize={20} />}
    >
      {formatAddress(wallet.accounts[0].address)}
    </Button>
  ) : (
    <Button loading={connecting} onClick={() => connect()} type="primary">
      Connect wallet
    </Button>
  );
};

export default React.memo(WalletConnect);
