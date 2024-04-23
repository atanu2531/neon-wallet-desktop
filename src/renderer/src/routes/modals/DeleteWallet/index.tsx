import { useTranslation } from 'react-i18next'
import { TbPencil, TbTrash } from 'react-icons/tb'
import { IWalletState } from '@renderer/@types/store'
import { Banner } from '@renderer/components/Banner'
import { Button } from '@renderer/components/Button'
import { Separator } from '@renderer/components/Separator'
import { StringHelper } from '@renderer/helpers/StringHelper'
import { useBlockchainActions } from '@renderer/hooks/useBlockchainActions'
import { useModalNavigate, useModalState } from '@renderer/hooks/useModalRouter'
import { EndModalLayout } from '@renderer/layouts/EndModal'

type TLocationState = {
  wallet: IWalletState
}

export const DeleteWalletModal = () => {
  const { wallet } = useModalState<TLocationState>()
  const { t } = useTranslation('modals', { keyPrefix: 'deleteWallet' })
  const { modalNavigate } = useModalNavigate()
  const { deleteWallet } = useBlockchainActions()

  const handleDelete = () => {
    deleteWallet(wallet.id)
    modalNavigate(-2)
  }

  return (
    <EndModalLayout heading={t('title')} withBackButton size="md" headingIcon={<TbPencil className="text-neon" />}>
      <div className="bg-gray-800 h-full w-full flex flex-col px-4 rounded text-xs items-center justify-between">
        <div className="flex flex-col items-center">
          <div className="w-36 h-36 rounded-full bg-asphalt flex items-center justify-center">
            <TbTrash className="text-pink w-[5rem] h-[5rem]" />
          </div>
          <p className="text-white text-lg pt-7">{t('deleteWallet')}</p>

          <div className="flex w-full px-3 bg-gray-300/15 rounded min-h-[2rem] items-center justify-center mt-3">
            <p className="text-center text-xs p-2">{StringHelper.truncateStringMiddle(wallet.name, 45)}</p>
          </div>

          <span className="text-center px-2 text-xs text-gray-100 pt-4">{t('subtitle')}</span>
        </div>
        <div className="flex flex-col w-full items-center">
          <Banner message={t('alert')} type="error" className="mb-7" />
          <Separator />
          <span className="text-xs py-6">{t('warning')}</span>
          <div className="flex gap-2.5 w-full px-6">
            <Button
              className="w-full"
              variant="contained"
              label={t('cancel')}
              onClick={() => modalNavigate(-1)}
              colorSchema="gray"
            />
            <Button
              className="w-full"
              variant="outlined"
              label={t('delete')}
              leftIcon={<TbTrash />}
              colorSchema="error"
              onClick={() => handleDelete()}
            />
          </div>
        </div>
      </div>
    </EndModalLayout>
  )
}
