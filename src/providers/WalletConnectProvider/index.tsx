import React, { createContext, ReactNode, useContext } from 'react';

import { useEmbeddedWallet, useWallet } from '~/hooks';
import { EmbeddedWallet, Wallet } from '~/lib/types';

type WalletConnectContextType = {
  embeddedWallet: EmbeddedWallet;
  wallet: Wallet;
};

export const WalletConnectContext = createContext<WalletConnectContextType>(null!);
type WalletConnectProviderProps = {
  children?: ReactNode;
};

export const WalletConnectProvider = ({ children }: WalletConnectProviderProps) => {
  const wallet = useWallet();
  const embeddedWallet = useEmbeddedWallet();

  const value = {
    embeddedWallet,
    wallet,
  };

  return <WalletConnectContext.Provider value={value}>{children}</WalletConnectContext.Provider>;
};

export const useWalletConnectContext = () => {
  const context = useContext(WalletConnectContext);
  if (!context) {
    throw new Error('useWalletConnectContext must be used within a WalletConnectProvider');
  }
  return context;
};
