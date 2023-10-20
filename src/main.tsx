import React from 'react';

import { Web3OnboardProvider } from '@web3-onboard/react';
import ReactDOM from 'react-dom/client';
import { ToastContainer, Zoom } from 'react-toastify';

import App from '@root/App';
import reportWebVitals from '@root/reportWebVitals';

import 'react-toastify/dist/ReactToastify.css';

import '@styles/index.scss';
import 'antd/dist/reset.css';
import { web3Wallet } from './configs';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Web3OnboardProvider web3Onboard={web3Wallet}>
      <App />
      <ToastContainer theme="colored" transition={Zoom} limit={5} />
    </Web3OnboardProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
