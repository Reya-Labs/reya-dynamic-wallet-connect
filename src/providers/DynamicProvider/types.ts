import { DynamicContextProps } from '@dynamic-labs/sdk-react-core';
import { ReactNode } from 'react';

export type WalletConnectProviderProps = {
  children: ReactNode;
  settings: DynamicContextProps['settings'];
};
