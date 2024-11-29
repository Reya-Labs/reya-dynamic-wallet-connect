/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import {
  useEmbeddedWallet as useEmbeddedWalletCore,
  useIsLoggedIn,
  useUserWallets,
} from '@dynamic-labs/sdk-react-core';
import { useEffect } from 'react';

import { EmbeddedWallet } from '~/lib/types';

export const useEmbeddedWallet = () => {
  const isConnected = useIsLoggedIn();
  const { userHasEmbeddedWallet, createEmbeddedWallet } = useEmbeddedWalletCore();
  const embeddedWalletExist = userHasEmbeddedWallet();
  const userWallets = useUserWallets();
  const embeddedWallet = userWallets.find((wallet) => wallet.key === 'turnkeyhd') as EmbeddedWallet;

  useEffect(() => {
    if (!embeddedWalletExist && isConnected) {
      try {
        void createEmbeddedWallet();
      } catch (err) {
        console.error(err);
      }
    }
  }, [embeddedWalletExist, isConnected]);

  return embeddedWallet;
};
