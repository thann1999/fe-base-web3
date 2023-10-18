import { Icon } from '@iconify/react';
import { useConnectWallet } from '@web3-onboard/react';
import { Card, Tooltip, Typography } from 'antd';

import etherscan from '@assets/icons/etherscan.svg';
import noTxsLight from '@assets/images/no-txs-light-theme.png';
import { ModalBodyProps } from '@root/interfaces';
import { formatAddress } from '@root/utils';

import './detail-wallet-modal.scss';

export default function DetailWalletModalBody({ closeModal }: ModalBodyProps) {
  const [{ wallet }, , disconnect] = useConnectWallet();

  if (!wallet?.accounts?.length) {
    closeModal();
  }

  const handleOpenEtherscan = () => {
    // window.open(`${wallet?.chains.}/address/${wallet.accounts[0]}`, '_blank');
  };

  const handleDisconnect = () => {
    closeModal();
    disconnect({ label: wallet?.label || '' });
  };

  return (
    <div className="detail-wallet-modal">
      <Card className="text-white rounded-2xl p-1 card-wallet" size="small">
        <div className="flex justify-between">
          <div className="flex items-center">
            <Icon icon="logos:metamask-icon" fontSize={16} />

            <Typography.Paragraph
              copyable={{
                text: wallet?.accounts?.[0]?.address,
              }}
              className="text-white ml-1 text-copyable text-base"
            >
              {formatAddress(wallet?.accounts?.[0]?.address)}
            </Typography.Paragraph>

            <Tooltip title="View on Etherscan">
              <img
                src={etherscan}
                alt="etherscan"
                className="w-5 h-5 ml-3 cursor-pointer"
                onClick={handleOpenEtherscan}
              />
            </Tooltip>
          </div>

          <Tooltip title="Disconnect">
            <Icon
              icon="tabler:logout"
              fontSize={24}
              className="cursor-pointer"
              onClick={handleDisconnect}
            />
          </Tooltip>
        </div>

        <div className="mt-4">
          <Typography className="text-zinc-300">Balance</Typography>
          <Typography className="text-white text-xl">
            {/* {`${wallet.} ${wallet.chain?.nativeCurrency?.symbol}`} */}
          </Typography>
        </div>
      </Card>

      <div className="mt-10 text-center">
        <img src={noTxsLight} alt="no-txs" className="w-40" />
        <Typography className="mt-4 text-slate-500 font-medium">No transactions found</Typography>
      </div>
    </div>
  );
}
