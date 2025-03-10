import { useTranslation } from 'react-i18next'
import { MdDeleteForever } from 'react-icons/md'
import { TbPencil } from 'react-icons/tb'
import { Button } from '@renderer/components/Button'
import { Input } from '@renderer/components/Input'
import { Separator } from '@renderer/components/Separator'
import { useActions } from '@renderer/hooks/useActions'
import { useModalNavigate, useModalState } from '@renderer/hooks/useModalRouter'
import { useAppDispatch } from '@renderer/hooks/useRedux'
import { SideModalLayout } from '@renderer/layouts/SideModal'
import { walletReducerActions } from '@renderer/store/reducers/WalletReducer'
import { IWalletState, TSelectedSkin } from '@shared/@types/store'

type TFormData = {
  name: string
  selectedSkin?: TSelectedSkin
}

type TLocationState = {
  wallet: IWalletState
}

export const EditWalletModal = () => {
  const { t } = useTranslation('modals', { keyPrefix: 'editWallet' })
  const { modalNavigate, modalNavigateWrapper } = useModalNavigate()
  const { wallet } = useModalState<TLocationState>()

  const dispatch = useAppDispatch()

  const form = useActions<TFormData>({
    name: wallet.name,
  })

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    form.setData({ name: event.target.value })
  }

  const handleSubmit = ({ name }: TFormData) => {
    const nameTrimmed = name.trim()
    if (nameTrimmed.length <= 0) {
      form.setError('name', t('nameLengthError'))
      return
    }
    dispatch(walletReducerActions.saveWallet({ ...wallet, name: nameTrimmed }))
    modalNavigate(-1)
  }

  return (
    <SideModalLayout heading={t('title')} headingIcon={<TbPencil />} contentClassName="flex flex-col">
      <form onSubmit={form.handleAct(handleSubmit)} className="flex flex-col flex-grow">
        <Input
          placeholder={t('inputPlaceholder')}
          errorMessage={form.actionState.errors.name}
          value={form.actionData.name}
          onChange={handleChangeName}
          clearable
          compacted
        />

        <Separator className="my-4" />

        <div className="flex gap-x-3 mt-auto mb-4">
          <Button
            className="w-full"
            type="button"
            onClick={modalNavigateWrapper(-1)}
            label={t('cancelButtonLabel')}
            flat
            colorSchema="gray"
          />

          <Button className="w-full" type="submit" label={t('saveButtonLabel')} flat />
        </div>
      </form>

      <div className="flex flex-col">
        <Separator />

        <p className="text-gray-300 uppercase text-xs font-bold mt-4">{t('deleteWalletTitle')}</p>
        <span className="text-xs text-white mt-2">{t('deleteWalletSubtext')}</span>

        <Button
          label="Delete Wallet"
          type="button"
          leftIcon={<MdDeleteForever />}
          className="mt-7"
          variant="outlined"
          onClick={() => modalNavigate('delete-wallet', { state: { wallet } })}
          colorSchema="error"
          flat
          iconsOnEdge={false}
        />
      </div>
    </SideModalLayout>
  )
}
