/* eslint-disable no-nested-ternary */
import { useEffect, useMemo, useState } from 'react';

import { Icon } from '@iconify/react';
import { useConnectWallet } from '@web3-onboard/react';
import { Button, Statistic, Tooltip, Typography } from 'antd';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { Contract, parseUnits } from 'ethers';
import Countdown, { CountdownRenderProps } from 'react-countdown';
import CountUp from 'react-countup';

import { CURRENT_ETH_PRICE, LOTTERY_CONTRACT } from '@root/constants';
import { useEtherWalletStore, useLotteryStore } from '@root/services/store';

import { TimerCountdown } from './components/TimerCountdown';

import './lottery.scss';

const renderer = ({ hours, minutes, seconds, days }: CountdownRenderProps) => {
  return <TimerCountdown hours={hours} days={days} seconds={seconds} minutes={minutes} />;
};

const formatter = (value: string | number) => (
  <CountUp className="text-5xl font-bold current-pool" end={+value} suffix="$" />
);

export default function LotteryPage() {
  const {
    isLoading: isLoadingContract,
    lotteryCount,
    manager,
    players,
    endDate,
    getNewPlayersAndBalance: getNewPlayers,
    getContractInfo,
    balance,
  } = useLotteryStore();
  const [isEntering, setIsEntering] = useState(false);
  const [isPicking, setIsPicking] = useState(false);
  const [{ wallet }] = useConnectWallet();
  const { network, signer } = useEtherWalletStore();
  const [lotteryContract, setLotteryContract] = useState<Contract>();
  const hasLotteryEnded = dayjs(endDate).isBefore(dayjs());

  useEffect(() => {
    if (network) {
      const address = LOTTERY_CONTRACT.ADDRESS[Number(network.chainId.toString())];

      if (!address) {
        return;
      }

      const contract = new Contract(address, LOTTERY_CONTRACT.ABI, signer);
      getContractInfo(contract);
      setLotteryContract(contract);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signer, network]);

  const isManager =
    manager.toLocaleLowerCase() === wallet?.accounts[0]?.address && !!players.length;

  const isAlreadyEntered = useMemo(
    () => !!players.find((address) => address?.toLowerCase() === wallet?.accounts[0].address),
    [players, wallet]
  );

  const handleEnterLottery = async () => {
    if (!lotteryContract || hasLotteryEnded) {
      return;
    }

    try {
      setIsEntering(true);
      await lotteryContract.enter({
        value: parseUnits('0.005', 'ether'),
      });
      await getNewPlayers(lotteryContract);
      setIsEntering(false);
    } catch (error) {
      setIsEntering(false);
    }
  };

  const handlePickWinner = async () => {
    if (!lotteryContract) {
      return;
    }

    try {
      setIsPicking(true);
      await lotteryContract.pickWinner();
      await getContractInfo(lotteryContract);
      setIsPicking(false);
    } catch (error) {
      setIsPicking(false);
    }
  };

  return (
    <div className={clsx('w-[50%] mt-16 mx-auto text-center lottery-page')}>
      <Typography className="text-6xl font-bold">The Defi Lottery</Typography>

      <Statistic value={balance * CURRENT_ETH_PRICE} formatter={formatter} className="mt-6" />

      <Typography className="text-zinc-300 font-medium text-lg mt-6">
        Time left to join lottery #{lotteryCount + 1}
      </Typography>

      <div className="mt-2">
        {endDate ? (
          <Countdown date={new Date(endDate)} renderer={renderer} />
        ) : (
          <TimerCountdown days={0} hours={0} minutes={0} seconds={0} />
        )}
      </div>

      <div className="mt-8 button-icon">
        <Tooltip title="">
          <Button
            type="primary"
            size="large"
            loading={isLoadingContract || isEntering}
            disabled={isAlreadyEntered || hasLotteryEnded}
            onClick={handleEnterLottery}
          >
            {isAlreadyEntered ? (
              <Typography.Text style={{ display: 'flex', alignItems: 'center' }}>
                You already entered
                <Icon icon="ion:ticket" fontSize={16} className="text-yellow-400 ml-2" />
              </Typography.Text>
            ) : hasLotteryEnded ? (
              'THIS ROUND HAS ENDED'
            ) : (
              'ENTER THE LOTTERY'
            )}
          </Button>
        </Tooltip>
      </div>

      <Typography className="mt-8 text-2xl">
        Lottery Count:{' '}
        <span className={clsx({ 'text-red-600': players?.length > 15 })}>
          {players?.length} / 1000
        </span>
      </Typography>
      <Typography className="text-zinc-500 font-medium text-lg italic">
        * since contract creation
      </Typography>
      <Typography className="mt-8 text-2xl">Lottery Finish: {lotteryCount} Entrants</Typography>
      <Typography className="mt-2 text-lg">Enter now and reveal the winner instantly 🎉</Typography>

      {isManager && (
        <Button
          type="primary"
          size="large"
          className="mt-8 w-[350px]"
          onClick={handlePickWinner}
          loading={isPicking}
        >
          PICK WINNER
        </Button>
      )}
    </div>
  );
}
