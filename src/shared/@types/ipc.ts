import type NodeHidTransport from '@ledgerhq/hw-transport-node-hid'
import type { BrowserWindow, IpcMainEvent, IpcMainInvokeEvent, IpcRendererEvent } from 'electron'

import { TBlockchainServiceKey } from './blockchain'
import { IAccountState, TSelectedNetworks } from './store'

export type TIpcMainSyncListener<T = any[], R = any> = (options: {
  event: IpcMainEvent
  args: T
  window: BrowserWindow
  removeAllListeners: () => void
}) => R

export type TIpcMainAsyncListener<T = any[], R = any> = (options: {
  event: IpcMainInvokeEvent
  args: T
  window: BrowserWindow
  removeAllListeners: () => void
}) => Promise<R> | R

export type TIpcRendererListener<T = any[], R = any> = (options: { event: IpcRendererEvent; args: T }) => R

export type TIpcRendererSendArgs<T> =
  T extends TIpcMainAsyncListener<infer U> ? U : T extends TIpcMainSyncListener<infer A> ? A : never

export type TIpcRendererSendResponse<T> =
  T extends TIpcMainAsyncListener<any, infer U> ? U : T extends TIpcMainSyncListener<any, infer A> ? A : never

export type TGetStoreFromWCSession = {
  account?: IAccountState
  encryptedPassword?: string
  networkByBlockchain: TSelectedNetworks
}

export type TLedgerInfo = {
  address: string
  publicKey: string
  blockchain: TBlockchainServiceKey
}

export type TLedgerInfoWithTransport = TLedgerInfo & {
  transport: NodeHidTransport
  descriptor: string
}
