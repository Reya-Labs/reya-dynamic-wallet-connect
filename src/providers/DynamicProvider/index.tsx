import { DynamicWagmiConnector } from '@dynamic-labs/wagmi-connector';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { Chain, http } from 'viem';
import {
  arbitrum,
  arbitrumSepolia,
  base,
  baseSepolia,
  mainnet,
  optimism,
  optimismSepolia,
  polygon,
  reyaNetwork,
  sepolia,
} from 'viem/chains';
import { createConfig, WagmiProvider } from 'wagmi';

import { DynamicContextProvider } from '../../lib/dynamic';
import { reyaCronos } from '../WalletConnectProvider/reya-cronos';
import { WalletConnectProviderProps } from './types';

const queryClient = new QueryClient();
const supportedChains = [
  mainnet,
  optimism,
  arbitrum,
  base,
  polygon,
  sepolia,
  arbitrumSepolia,
  optimismSepolia,
  baseSepolia,
  reyaCronos,
  reyaNetwork,
] as readonly [Chain, ...Chain[]];

const config = createConfig({
  chains: supportedChains,
  multiInjectedProviderDiscovery: false,
  transports: {
    [mainnet.id]: http(),
    [optimism.id]: http(),
    [base.id]: http(),
    [arbitrum.id]: http(),
    [polygon.id]: http(),
    [sepolia.id]: http(),
    [arbitrumSepolia.id]: http(),
    [optimismSepolia.id]: http(),
    [baseSepolia.id]: http(),
    [reyaCronos.id]: http(),
    [reyaNetwork.id]: http(),
  },
});

export const DynamicProvider = ({ children, settings }: WalletConnectProviderProps) => {
  return (
    <DynamicContextProvider settings={settings}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>{children}</DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  );
};
