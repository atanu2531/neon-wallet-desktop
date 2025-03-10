import { Fragment, useLayoutEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MdAdd, MdOutlineContentCopy } from 'react-icons/md'
import { TbFileImport, TbPencil } from 'react-icons/tb'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { hasNft } from '@cityofzion/blockchain-service'
import { Button } from '@renderer/components/Button'
import { IconButton } from '@renderer/components/IconButton'
import { Separator } from '@renderer/components/Separator'
import { SidebarMenuButton } from '@renderer/components/SidebarMenuButton'
import { StringHelper } from '@renderer/helpers/StringHelper'
import { UtilsHelper } from '@renderer/helpers/UtilsHelper'
import { WalletConnectHelper } from '@renderer/helpers/WalletConnectHelper'
import { useAccountsSelector } from '@renderer/hooks/useAccountSelector'
import { useModalNavigate } from '@renderer/hooks/useModalRouter'
import { useWalletsSelector } from '@renderer/hooks/useWalletSelector'
import { MainLayout } from '@renderer/layouts/Main'
import { bsAggregator } from '@renderer/libs/blockchainService'
import { IAccountState, IWalletState } from '@shared/@types/store'

import { AccountList } from './AccountList'
import { WalletsSelect } from './WalletsSelect'

type TParams = {
  id: string
}

export const WalletsPage = () => {
  const { t } = useTranslation('pages', { keyPrefix: 'wallets' })
  const { wallets } = useWalletsSelector()
  const { accounts } = useAccountsSelector()
  const { modalNavigateWrapper } = useModalNavigate()
  const navigate = useNavigate()
  const { id } = useParams<TParams>()

  const [selectedWallet, setSelectedWallet] = useState<IWalletState | undefined>(wallets[0])
  const [selectedAccount, setSelectedAccount] = useState<IAccountState | undefined>(
    accounts.find(account => account.idWallet === selectedWallet?.id)
  )

  const service = selectedAccount ? bsAggregator.blockchainServicesByName[selectedAccount.blockchain] : undefined

  const handleSelectAccount = (selected: IAccountState) => {
    navigate(`/app/wallets/${selected.id}/overview`)
  }

  const handleSelectWallet = (selected: IWalletState) => {
    const firstAccount = accounts.find(account => account.idWallet === selected.id)
    if (!firstAccount) return
    navigate(`/app/wallets/${firstAccount.id}/overview`)
  }

  useLayoutEffect(() => {
    const navigateToFirstAccount = () => {
      const [wallet] = wallets
      const firstAccount = accounts.find(account => account.idWallet === wallet?.id)
      if (firstAccount) navigate(`/app/wallets/${firstAccount.id}/overview`)
    }

    if (!id) {
      navigateToFirstAccount()
      return
    }

    const account = accounts.find(account => account.id === id)
    if (!account) {
      navigateToFirstAccount()
      return
    }

    const wallet = wallets.find(wallet => wallet.id === account.idWallet)
    if (!wallet) {
      navigateToFirstAccount()
      return
    }

    setSelectedWallet(wallet)
    setSelectedAccount(account)
  }, [id, wallets, accounts, navigate])

  useLayoutEffect(() => {}, [selectedWallet, selectedAccount])

  return (
    <MainLayout
      heading={<WalletsSelect wallets={wallets} value={selectedWallet} onSelect={handleSelectWallet} />}
      rightComponent={
        <div className="flex gap-x-2">
          <IconButton
            icon={<TbPencil />}
            size="md"
            text={t('editWalletButtonLabel')}
            onClick={modalNavigateWrapper('edit-wallet', { state: { wallet: selectedWallet } })}
          />
          <IconButton
            icon={<MdAdd />}
            size="md"
            text={t('newWalletButtonLabel')}
            onClick={modalNavigateWrapper('create-wallet-step-1')}
          />
          <IconButton
            icon={<TbFileImport />}
            size="md"
            text={t('importButtonLabel')}
            onClick={modalNavigateWrapper('import')}
          />
        </div>
      }
      contentClassName="flex-row gap-x-3"
    >
      {selectedWallet && selectedAccount && (
        <Fragment>
          <section className="bg-gray-800 rounded drop-shadow-lg max-w-[11.625rem] min-w-[11.625rem] w-full flex flex-col">
            <header className="flex justify-between px-4 py-3 items-center h-fit gap-x-1">
              <h2 className="text-sm truncate">{t('accounts')}</h2>
            </header>

            <main className="flex flex-col w-full items-center flex-grow min-h-0">
              <div className="px-4 w-full">
                <Separator />
              </div>

              <AccountList
                selectedWallet={selectedWallet}
                onSelect={handleSelectAccount}
                selectedAccount={selectedAccount}
              />
            </main>

            {selectedWallet.encryptedMnemonic && (
              <footer className="px-4 pb-6">
                <Button
                  label={t('addAccountButtonLabel')}
                  variant="outlined"
                  className="w-full"
                  flat
                  leftIcon={<MdAdd />}
                  onClick={modalNavigateWrapper('persist-account', { state: { wallet: selectedWallet } })}
                />
              </footer>
            )}
          </section>

          <section className="bg-gray-800 w-full h-full flex rounded flex-grow flex-col min-w-0">
            <header className="w-full h-12 items-center flex justify-between px-5">
              <div className="flex items-center gap-2 text-sm">
                <h1 className="text-white pr-3 ">{selectedAccount.name}</h1>
                <p className="text-gray-300">{t('address')}</p>
                <p className="text-gray-100">{StringHelper.truncateStringMiddle(selectedAccount.address, 8)}</p>
                <IconButton
                  icon={<MdOutlineContentCopy />}
                  size="sm"
                  colorSchema="neon"
                  compacted
                  onClick={() => UtilsHelper.copyToClipboard(selectedAccount.address)}
                />
              </div>

              <Button
                leftIcon={<TbPencil />}
                label={t('editAccountButton')}
                className="w-fit"
                variant="text"
                flat
                colorSchema="gray"
                clickableProps={{ className: 'text-xs' }}
                onClick={modalNavigateWrapper('persist-account', { state: { account: selectedAccount } })}
              />
            </header>

            <div className="flex h-full bg-gray-900/30 min-h-0">
              <ul className="max-w-[11.625rem] min-w-[11.625rem] w-full border-r border-gray-300/30">
                <SidebarMenuButton
                  title={t('accountOverview.title')}
                  to={`/app/wallets/${selectedAccount.id}/overview`}
                />
                <SidebarMenuButton
                  title={t('accountTokensList.title')}
                  to={`/app/wallets/${selectedAccount.id}/tokens`}
                />
                {service && hasNft(service) && (
                  <SidebarMenuButton title={t('accountNftList.title')} to={`/app/wallets/${selectedAccount.id}/nfts`} />
                )}
                <SidebarMenuButton
                  title={t('accountTransactionsList.title')}
                  to={`/app/wallets/${selectedAccount.id}/transactions`}
                />

                {selectedAccount?.type !== 'watch' &&
                  WalletConnectHelper.supportedBlockchains[selectedAccount.blockchain] && (
                    <SidebarMenuButton
                      title={t('accountConnections.title')}
                      to={`/app/wallets/${selectedAccount.id}/connections`}
                    />
                  )}
              </ul>

              <Outlet context={{ account: selectedAccount }} key={selectedAccount.id} />
            </div>
          </section>
        </Fragment>
      )}
    </MainLayout>
  )
}
