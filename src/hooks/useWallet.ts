/* eslint-disable no-console */
import { getSigner } from '@dynamic-labs/ethers-v6';
import {
  useDynamicContext,
  useIsLoggedIn,
  useSwitchWallet,
  useUserWallets,
  Wallet as DynamicWallet,
} from '@dynamic-labs/sdk-react-core';
import { JsonRpcSigner } from 'ethers';
import { useEffect, useRef, useState } from 'react';
import { useEnsAvatar, useEnsName } from 'wagmi';

import { Wallet } from '~/lib/types';

import { useChain } from './useChain';

export const useWallet = (): Wallet => {
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const signerRef = useRef<JsonRpcSigner | null>(null);
  const isConnected = useIsLoggedIn();
  const userWallets = useUserWallets() as DynamicWallet[];
  const lastConnectedNonEmbeddedWallet = userWallets.find((wallet) => wallet.key !== 'turnkeyhd');
  const { primaryWallet, handleLogOut } = useDynamicContext();
  const isPrimaryWalletEmbeddedWallet = primaryWallet?.key === 'turnkeyhd';
  const switchWallet = useSwitchWallet();

  const { data: ensName } = useEnsName({
    address: lastConnectedNonEmbeddedWallet?.address as `0x${string}`,
  });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });
  const { chainId } = useChain();
  const isFetchingSigner = useRef(false);

  // If the primary wallet is embedded, switch to the last connected non-embedded wallet
  useEffect(() => {
    if (isPrimaryWalletEmbeddedWallet && lastConnectedNonEmbeddedWallet) {
      void switchWallet(lastConnectedNonEmbeddedWallet.id);
    }
  }, [lastConnectedNonEmbeddedWallet, isPrimaryWalletEmbeddedWallet, switchWallet]);

  useEffect(() => {
    const fetchSigner = async () => {
      if (lastConnectedNonEmbeddedWallet && !isFetchingSigner.current) {
        isFetchingSigner.current = true;
        try {
          const fetchedSigner = await getSigner(lastConnectedNonEmbeddedWallet);
          signerRef.current = fetchedSigner;
          setSigner(fetchedSigner);
        } catch (err) {
          console.error(err);
        } finally {
          isFetchingSigner.current = false;
        }
      }
    };

    void fetchSigner();
  }, [isConnected, chainId, lastConnectedNonEmbeddedWallet]);

  return {
    ...(lastConnectedNonEmbeddedWallet || {
      address: '',
      chain: '',
      connector: null,
      id: '',
      isAuthenticated: false,
      key: '',
    }),
    disconnect: handleLogOut,
    ensAvatar,
    ensName,
    isConnected,
    isConnecting: false,
    rawNonEmbeddedWallet: lastConnectedNonEmbeddedWallet,
    signer,
  } as Wallet;
};
