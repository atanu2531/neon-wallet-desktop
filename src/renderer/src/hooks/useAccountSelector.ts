import { useCallback, useMemo } from 'react'
import { AccountHelper } from '@renderer/helpers/AccountHelper'
import { TAccountHelperPredicateParams } from '@shared/@types/helpers'

import { useAppSelector } from './useRedux'

export const useAccountsSelector = () => {
  const { ref, value } = useAppSelector(state => state.account.data)
  return {
    accounts: value,
    accountsRef: ref,
  }
}

export const useAccountsByWalletIdSelector = (walletId: string) => {
  const { value, ref } = useAppSelector(state => state.account.data)

  const accountsByWalletId = useMemo(() => value.filter(account => account.idWallet === walletId), [value, walletId])

  const accountsByWalletIdRef = useMemo(
    () => ref.current.filter(account => account.idWallet === walletId),
    [ref, walletId]
  )

  return {
    accountsByWalletId,
    accountsByWalletIdRef,
  }
}

export const useAccountUtils = () => {
  const { accountsRef } = useAccountsSelector()

  const doesAccountExist = useCallback(
    (params: TAccountHelperPredicateParams) => accountsRef.current.some(AccountHelper.predicate(params)),
    [accountsRef]
  )

  return {
    doesAccountExist,
  }
}
