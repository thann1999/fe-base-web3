import { useEffect, useState } from 'react';

import { Icon } from '@iconify/react';
import { useConnectWallet } from '@web3-onboard/react';
import { Layout, Popover, Space, Typography } from 'antd';
import clsx from 'clsx';
import { useMatches, useNavigate } from 'react-router-dom';

import logo from '@assets/images/logo.png';
import { HEADER_MENU, ModalSize } from '@root/constants';
import { useModal } from '@root/hooks';
import { useEtherWalletStore } from '@root/services/store';
import { getMintPath } from '@root/utils';

import SettingWeb from '../setting-web/SettingWeb';
import SwitchChainModalBody from '../switch-chain-modal';
import WalletConnect from '../wallet-connect';

const { Header } = Layout;

export default function HeaderComponent() {
  const [openSetting, setOpenSetting] = useState(false);
  const navigate = useNavigate();
  const [{ wallet }] = useConnectWallet();
  const { isSupportedChain } = useEtherWalletStore();

  const {
    open: openSwitchNetwork,
    ModalComponent: SwitchNetworkModal,
    close: closeSwitchNetwork,
  } = useModal({
    modalBody: SwitchChainModalBody,
    displayFooter: false,
    width: ModalSize.SM,
  });
  const matches = useMatches();
  const queryMatches = matches.filter((item) => !!item.handle);
  const activeKey = (queryMatches.filter((item) => !!(item.handle as any)?.key)[0]?.handle as any)
    ?.key;

  useEffect(() => {
    if (!wallet?.accounts?.length) {
      return;
    }

    if (isSupportedChain) {
      closeSwitchNetwork();
    } else {
      openSwitchNetwork({
        title: '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSupportedChain, wallet?.accounts]);

  const handleNavigate = (href: string, isDisabled?: boolean) => {
    if (isDisabled) return;

    navigate(href);
  };

  return (
    <>
      <Header className="flex items-center justify-between xl:px-32 bg-transparent h-[5.8rem] xl:h-[5.5rem]">
        <Space direction="horizontal" size="small">
          <img
            src={logo}
            alt="logo"
            className="h-11 cursor-pointer"
            onClick={() => navigate(getMintPath())}
          />

          {HEADER_MENU.map((item) => (
            <Typography
              key={item.key}
              onClick={() => handleNavigate(item.href, item.isDisabled)}
              className={clsx('font-medium  text-base hidden lg:block text ml-10', {
                'text-primary': activeKey === item.key,
                'cursor-pointer': !item.isDisabled,
              })}
            >
              {item.label}
            </Typography>
          ))}
        </Space>

        <div className="flex items-center">
          <WalletConnect />

          <Popover
            trigger="click"
            content={<SettingWeb handleClose={() => setOpenSetting(false)} />}
            open={openSetting}
            placement="topRight"
            onOpenChange={setOpenSetting}
          >
            <Icon icon="uil:setting" fontSize={28} className="cursor-pointer mt-0.5 ml-4" />
          </Popover>
        </div>
      </Header>

      <SwitchNetworkModal />
    </>
  );
}
