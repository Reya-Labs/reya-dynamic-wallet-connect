import { Wallet as DynamicWallet } from '@dynamic-labs/sdk-react-core';
import { WalletConnectorCore } from '@dynamic-labs/wallet-connector-core';
import { JsonRpcSigner } from 'ethers';
import { GetEnsAvatarReturnType, GetEnsNameReturnType } from 'viem';

export type EmbeddedWallet =
  | (DynamicWallet<WalletConnectorCore.WalletConnector> & {
      isConnected: boolean;
      signer: JsonRpcSigner | null;
    })
  | null;

export type Wallet = Omit<DynamicWallet<WalletConnectorCore.WalletConnector>, 'isConnected'> & {
  _connector: WalletConnectorCore.WalletConnector;
  disconnect: () => Promise<void>;
  ensAvatar?: GetEnsAvatarReturnType;
  ensName?: GetEnsNameReturnType;
  isConnected: boolean;
  isConnecting: boolean;
  rawNonEmbeddedWallet: DynamicWallet<WalletConnectorCore.WalletConnector> | null;
  signer: JsonRpcSigner | null;
};
