const reyaCronosEvmNetwork = {
  blockExplorerUrls: ['https://reya-cronos.blockscout.com'],
  chainId: 89346161,
  chainName: 'Reya Cronos',
  iconUrls: [],
  name: 'Reya Cronos',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  networkId: 89346161,
  rpcUrls: ['https://rpc.reya-cronos.gelato.digital'],
  vanityName: 'Reya Cronos',
};

const reyaNetworkEvmNetwork = {
  blockExplorerUrls: ['https://explorer.reya.network/'],
  chainId: 1729,
  chainName: 'Reya Network',
  iconUrls: [],
  name: 'Reya Network',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  networkId: 1729,
  rpcUrls: ['https://rpc.reya.network'],
  vanityName: 'Reya Network',
};

export const customEvmNetworks = [reyaCronosEvmNetwork, reyaNetworkEvmNetwork];
