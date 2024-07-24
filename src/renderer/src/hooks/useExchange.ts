import { Currency } from '@cityofzion/blockchain-service'
import { bsAggregator } from '@renderer/libs/blockchainService'
import { TBlockchainServiceKey } from '@shared/@types/blockchain'
import { TBaseOptions, TExchange, TMultiExchange, TUseExchangeResult } from '@shared/@types/query'
import { TCurrency } from '@shared/@types/store'
import { useQueries } from '@tanstack/react-query'

import { useCurrencySelector, useSelectedNetworkByBlockchainSelector } from './useSettingsSelector'

const fetchExchange = async (currency: TCurrency, blockchain: TBlockchainServiceKey): Promise<TExchange> => {
  const result: TExchange = {
    blockchain,
    prices: [],
  }

  try {
    const service = bsAggregator.blockchainServicesByName[blockchain]
    result.prices = await service.exchangeDataService.getTokenPrices(currency.label as Currency)
  } catch {
    /* empty */
  }

  return result
}

const emptyRecord = {}

export function useExchange(queryOptions?: TBaseOptions<TExchange[]>): TUseExchangeResult {
  const { networkByBlockchain } = useSelectedNetworkByBlockchainSelector()
  const { currency } = useCurrencySelector()

  const query = useQueries({
    queries: Object.values(bsAggregator.blockchainServicesByName).map(service => ({
      queryOptions,
      queryKey: ['exchange', currency, service.blockchainName, networkByBlockchain[service.blockchainName].id],
      queryFn: fetchExchange.bind(null, currency, service.blockchainName),
    })),
    combine: result => ({
      isLoading: result.some(query => query.isLoading),
      data: result.reduce((acc, query) => {
        if (query.data) {
          acc[query.data.blockchain] = query.data.prices
        }

        return acc
      }, emptyRecord as TMultiExchange),
    }),
  })

  return query
}
