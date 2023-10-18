import '@translation/i18n';
import { Suspense, useEffect } from 'react';

import { Web3OnboardProvider } from '@web3-onboard/react';
import { ConfigProvider, theme } from 'antd';
import { RouterProvider } from 'react-router-dom';

import { LoadingScreen } from '@components';
import { web3Wallet } from '@configs';
import { ThemeMode } from '@constants';
import { renderRoutes, routes } from '@routes/routes';
import { useThemeStore } from '@services/store';
import variables from '@styles/_variables.module.scss';

function App() {
  const appTheme = useThemeStore((state) => state.appTheme);

  useEffect(() => {
    const root = window.document.documentElement;
    const prevTheme = appTheme === ThemeMode.Dark ? ThemeMode.Light : ThemeMode.Dark;
    root.classList.remove(prevTheme);
    root.classList.add(appTheme);
  }, [appTheme]);

  return (
    <Web3OnboardProvider web3Onboard={web3Wallet}>
      <ConfigProvider
        theme={{
          algorithm: appTheme === ThemeMode.Dark ? theme.darkAlgorithm : theme.defaultAlgorithm,
          components: {
            Button: {
              borderRadius: 10,
              borderRadiusLG: 12,
              borderRadiusSM: 10,
              controlHeight: 40,
              controlHeightLG: 50,
            },
          },
          token: {
            colorPrimary: variables.colorPrimary,
          },
        }}
      >
        <Suspense fallback={<LoadingScreen />}>
          <RouterProvider router={renderRoutes(routes)} />
        </Suspense>
      </ConfigProvider>
    </Web3OnboardProvider>
  );
}

export default App;
