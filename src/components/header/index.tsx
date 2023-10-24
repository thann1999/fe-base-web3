import { useLayoutEffect, useState } from 'react';

import { MenuUnfoldOutlined } from '@ant-design/icons';
import { Icon } from '@iconify/react';
import { useConnectWallet } from '@web3-onboard/react';
import { Button, Dropdown, Grid, Layout, Popover, Space, Typography } from 'antd';
import clsx from 'clsx';
import { useMatches, useNavigate } from 'react-router-dom';

import logo from '@assets/images/logo.png';
import { HEADER_MENU, ModalSize, RouteKey } from '@root/constants';
import { useModal } from '@root/hooks';
import { useEtherWalletStore } from '@root/services/store';
import { getLotteryPath, getMintPath } from '@root/utils';

import SettingWeb from '../setting-web/SettingWeb';
import SwitchChainModalBody from '../switch-chain-modal';
import WalletConnect from '../wallet-connect';

const { Header } = Layout;
const { useBreakpoint } = Grid;

export default function HeaderComponent() {
  const [openSetting, setOpenSetting] = useState(false);
  const navigate = useNavigate();
  const [{ wallet }] = useConnectWallet();
  const { isSupportedChain } = useEtherWalletStore();
  const { lg } = useBreakpoint();
  const matches = useMatches();
  const {
    open: openSwitchNetwork,
    ModalComponent: SwitchNetworkModal,
    close: closeSwitchNetwork,
  } = useModal({
    modalBody: SwitchChainModalBody,
    displayFooter: false,
    width: ModalSize.SM,
  });
  const queryMatches = matches.filter((item) => !!item.handle);
  const activeKey = (queryMatches.filter((item) => !!(item.handle as any)?.key)[0]?.handle as any)
    ?.key;

  useLayoutEffect(() => {
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

  const handleChange = ({ key }: any) => {
    switch (key) {
      case RouteKey.Lottery:
        return navigate(getLotteryPath());
      default:
        return navigate(getMintPath());
    }
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

          {lg ? (
            <Space direction="horizontal" size="small">
              {HEADER_MENU.map((item) => (
                <Typography
                  key={item.key}
                  onClick={() => handleNavigate(item.href, item.disabled)}
                  className={clsx('font-semibold text-base ml-4', {
                    author: activeKey === item.key,
                    'cursor-pointer': !item.disabled,
                  })}
                >
                  {item.label}
                </Typography>
              ))}
            </Space>
          ) : (
            <Dropdown
              trigger={['click']}
              menu={{
                items: HEADER_MENU,
                defaultSelectedKeys: [activeKey],
                onClick: handleChange,
              }}
            >
              <Button type="primary" className="ml-4" icon={<MenuUnfoldOutlined />} />
            </Dropdown>
          )}
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
