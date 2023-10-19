import { BSAggregator } from '@cityofzion/blockchain-service'
import { RootStore } from '@renderer/store/RootStore'

import { TBlockchainServiceKey } from './blockchain'

export interface IAccountState {
  address: string
  accountType: TWalletType
  idWallet: string
  name: string
  backgroundColor: string
  blockchain: TBlockchainServiceKey
  encryptedKey?: string
}

export interface IBlockchainState {
  bsAggregator: BSAggregator<TBlockchainServiceKey>
}

export type TWalletType = 'standard' | 'watch' | 'legacy'
export interface IWalletState {
  id: string
  name: string
  walletType: TWalletType
  encryptedMnemonic?: string
}
export type TSecurityType = 'none' | 'password'

export interface ISettingsState {
  encryptedPassword?: string
  isFirstTime: boolean
  securityType: TSecurityType
}

export type RootState = ReturnType<typeof RootStore.reducers>
