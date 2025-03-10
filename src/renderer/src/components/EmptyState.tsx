import { useTranslation } from 'react-i18next'
import { TbDiamondOff, TbFileImport, TbPlug } from 'react-icons/tb'
import { WalletConnectHelper } from '@renderer/helpers/WalletConnectHelper'
import { useModalNavigate } from '@renderer/hooks/useModalRouter'
import { IAccountState } from '@shared/@types/store'

import { BlockchainIcon } from './BlockchainIcon'
import { Button } from './Button'

type TProps = {
  account?: IAccountState
}

export const EmptyState = ({ account }: TProps) => {
  const { t } = useTranslation('components', { keyPrefix: 'transactionsTableEmpty' })
  const { modalNavigateWrapper } = useModalNavigate()

  return (
    <section className="flex overflow-auto min-h-0 w-full flex-grow justify-center">
      <div className="flex flex-col max-w-[21rem] justify-center items-center">
        <div className="flex justify-center items-center my-5">
          <BlockchainIcon className="h-8 w-8 opacity-50" blockchain={'neoLegacy'} type="blue" />
          <div className="h-2 w-2 bg-blue rounded-full opacity-50 mx-5"></div>
          <div className="flex h-24 w-24 bg-asphalt rounded-full items-center justify-center">
            <TbDiamondOff className="text-blue h-16 w-16" />
          </div>
          <div className="h-2 w-2 bg-blue rounded-full opacity-50 mx-5"></div>
          <BlockchainIcon className="h-8 w-8 opacity-50" blockchain={'ethereum'} type="blue" />
        </div>
        <div className="flex justify-center text-center text-white font-normal text-lg">{t('title')}</div>
        <div className="flex justify-center text-center text-gray-300 text-xs mt-2">{t('subtitle')}</div>
        <div className="flex gap-3 my-5">
          {account && account.type !== 'watch' && !!WalletConnectHelper.supportedBlockchains[account.blockchain] && (
            <Button
              className="w-full"
              label={t('connectDappLabel')}
              rightIcon={<TbPlug />}
              onClick={modalNavigateWrapper('dapp-connection', { state: { account } })}
              clickableProps={{ className: 'h-10 text-sm' }}
            />
          )}
          <Button
            className="w-full"
            label={t('importAccountLabel')}
            rightIcon={<TbFileImport />}
            onClick={modalNavigateWrapper('import')}
            clickableProps={{ className: 'h-10 text-sm' }}
          />
        </div>
      </div>
    </section>
  )
}
