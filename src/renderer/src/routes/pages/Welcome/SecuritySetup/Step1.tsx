import { ChangeEvent, Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Button } from '@renderer/components/Button'
import { Input } from '@renderer/components/Input'
import { useActions } from '@renderer/hooks/useActions'

type TFormData = {
  password: string
}

type TProps = {
  onSubmit?: (password: string) => void
}

const MIN_PASSWORD_LENGTH = 4

export const WelcomeSecuritySetupStep1Page = ({ onSubmit }: TProps) => {
  const { t } = useTranslation('pages', { keyPrefix: 'welcome.securitySetup.step1' })
  const { t: commonT } = useTranslation('common')
  const navigate = useNavigate()

  const { actionData, actionState, setData, setError, handleAct } = useActions<TFormData>({ password: '' })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value
    setData({ password })

    if (password.length < MIN_PASSWORD_LENGTH) {
      setError('password', t('passwordError', { length: MIN_PASSWORD_LENGTH }))
      return
    }
  }

  const handleSubmit = (data: TFormData) => {
    if (onSubmit) {
      onSubmit(data.password)
      return
    }

    navigate('/welcome-security-setup/2', { state: { password: data.password } })
  }

  return (
    <Fragment>
      <p className="text-sm text-white mt-15">{t('formTitle')}</p>
      <form
        className="w-full flex-grow flex flex-col justify-between mt-6 items-center"
        onSubmit={handleAct(handleSubmit)}
      >
        <Input
          type="password"
          value={actionData.password}
          onChange={handleChange}
          placeholder={t('passwordPlaceholder')}
          errorMessage={actionState.errors.password}
          autoFocus
        />

        <Button
          label={commonT('general.continue')}
          className="w-64"
          type="submit"
          disabled={!actionState.isValid || actionState.isActing}
        />
      </form>
    </Fragment>
  )
}
