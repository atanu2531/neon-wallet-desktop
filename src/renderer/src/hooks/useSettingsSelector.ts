import { useAppSelector } from './useRedux'

export const useEncryptedPasswordSelector = () => {
  const { ref, value } = useAppSelector(state => state.settings.encryptedPassword)
  return {
    encryptedPassword: value,
    encryptedPasswordRef: ref,
  }
}

export const useNetworkTypeSelector = () => {
  const { ref, value } = useAppSelector(state => state.settings.networkType)
  return {
    networkType: value,
    networkTypeRef: ref,
  }
}

export const useCurrencySelector = () => {
  const { ref, value } = useAppSelector(state => state.settings.currency)
  return {
    currency: value,
    currencyRef: ref,
  }
}
