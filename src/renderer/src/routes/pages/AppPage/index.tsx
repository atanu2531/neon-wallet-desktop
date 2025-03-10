import { Fragment } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { CustomProfileBanner } from '@renderer/components/CustomProfileBanner'
import { useAfterLogin } from '@renderer/hooks/useAfterLogin'
import { useAppSelector } from '@renderer/hooks/useRedux'
import { useEncryptedPasswordSelector } from '@renderer/hooks/useSettingsSelector'
import { RootState } from '@shared/@types/store'

export const AppPage = () => {
  useAfterLogin()

  const { value: securityType } = useAppSelector((state: RootState) => state.settings.securityType)
  const { encryptedPassword } = useEncryptedPasswordSelector()
  const location = useLocation()

  if (securityType !== 'password' || !encryptedPassword) {
    return <Navigate to={'/login'} state={{ from: location.pathname }} />
  }

  return (
    <Fragment>
      <CustomProfileBanner />
      <Outlet />
    </Fragment>
  )
}
