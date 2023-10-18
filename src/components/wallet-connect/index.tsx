import React, { useEffect } from 'react';

import { Icon } from '@iconify/react';
import { useConnectWallet } from '@web3-onboard/react';
import { Button } from 'antd';
import { ethers } from 'ethers';

import { ModalSize } from '@root/constants';
import { useModal } from '@root/hooks';
import { useEtherWalletStore } from '@root/services/store';
import { formatAddress } from '@root/utils';

import DetailWalletModalBody from './components/detail-wallet-modal';

const WalletConnect = () => {
  const [{ wallet, connecting }, connect] = useConnectWallet();
  const { setProvider } = useEtherWalletStore();
  const { open: openDetailWallet, ModalComponent: DetailWalletModal } = useModal({
    modalBody: DetailWalletModalBody,
    displayFooter: false,
    width: ModalSize.XS,
  });

  useEffect(() => {
    // If the wallet has a provider than the wallet is connected
    if (wallet?.provider) {
      setProvider(new ethers.BrowserProvider(wallet.provider));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet]);

  const handleViewDetailWallet = () => {
    openDetailWallet({
      title: 'Account Overview',
    });
  };

  return (
    <>
      {wallet?.provider && wallet.accounts[0] ? (
        <Button
          type="primary"
          className="flex items-center mx-4"
          onClick={handleViewDetailWallet}
          icon={<Icon icon="iconoir:wallet" fontSize={20} />}
        >
          {formatAddress(wallet.accounts[0].address)}
        </Button>
      ) : (
        <Button loading={connecting} onClick={() => connect()} type="primary">
          Connect wallet
        </Button>
      )}
      <DetailWalletModal />
    </>
  );
};

export default React.memo(WalletConnect);
