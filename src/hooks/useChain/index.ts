import { useDynamicContext, useSwitchNetwork } from '@dynamic-labs/sdk-react-core';
import { useState } from 'react';
import { useAccount } from 'wagmi';

import { parseWagmiError } from './utils';

export type UseChainResult = {
  chainId: number | undefined;
  error: string | null;
  isErrorSwitching: boolean;
  isSwitching: boolean;
  switchChain: (id: number) => Promise<void>;
};

export const useChain = (): UseChainResult => {
  const { chainId } = useAccount();
  const { primaryWallet } = useDynamicContext();
  const switchNetwork = useSwitchNetwork();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState('');
  const isError = error !== null;

  const handleSwitchChain = async (id: number) => {
    if (chainId === id) {
      return;
    }

    if (chainId === undefined || id === undefined || !primaryWallet) return;

    setIsPending(true);

    try {
      await switchNetwork({ network: id, wallet: primaryWallet });
    } catch (err) {
      setError(parseWagmiError(err));
    }

    setIsPending(false);
  };

  return {
    chainId,
    error: parseWagmiError(error),
    isErrorSwitching: isError,
    isSwitching: isPending,
    switchChain: handleSwitchChain,
  };
};
