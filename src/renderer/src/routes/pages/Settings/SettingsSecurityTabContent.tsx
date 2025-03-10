import { useTranslation } from 'react-i18next'
import { MdOutlineKey, MdOutlineLock, MdOutlineSave } from 'react-icons/md'
import { TbPackageImport, TbReload } from 'react-icons/tb'
import { useMatch } from 'react-router-dom'

import { SettingsSidebarLink } from './SettingsSidebarLink'

export const SettingsSecurityTabContent = () => {
  const { t } = useTranslation('pages', { keyPrefix: 'settings' })
  const matchRootEncryptKey = useMatch('app/settings/security')

  return (
    <nav className="flex flex-row justify-between h-15 w-full mb-5 text-[14px]">
      <ul className="max-w-full w-full">
        <SettingsSidebarLink
          title={t('securityOption.changePassword')}
          icon={<MdOutlineLock />}
          to="/app/settings/security/change-password"
          match={!!matchRootEncryptKey}
        />
        <SettingsSidebarLink
          title={t('securityOption.encryptKey')}
          icon={<MdOutlineKey />}
          to="/app/settings/security/encrypt-key"
        />
        <SettingsSidebarLink
          title={t('securityOption.recoverWallet')}
          icon={<TbReload />}
          to="/app/settings/security/recover-wallet"
        />
        <SettingsSidebarLink
          title={t('securityOption.backupWallet')}
          icon={<MdOutlineSave />}
          to="/app/settings/security/backup-wallet"
        />
        <SettingsSidebarLink
          title={t('securityOption.migrateWallets')}
          icon={<TbPackageImport />}
          to="/app/settings/security/migrate-accounts"
          colorSchema="neon"
        />
      </ul>
    </nav>
  )
}
