import { defineChain } from 'viem';

export const reyaCronos = defineChain({
  blockExplorers: {
    default: { name: 'ReyaCronosExplorer', url: 'https://reya-cronos.blockscout.com' },
  },
  id: 89346162,
  name: 'Reya Cronos',
  nativeCurrency: { decimals: 18, name: 'Ether', symbol: 'ETH' },
  rpcUrls: {
    default: {
      http: ['https://rpc.reya-cronos.gelato.digital'],
      webSocket: ['wss://ws.reya-cronos.gelato.digital'],
    },
  },
  testnet: true,
});
