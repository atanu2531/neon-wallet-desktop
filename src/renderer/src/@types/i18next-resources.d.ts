interface Resources {
  common: {
    general: {
      continue: 'Continue'
    }
    wallet: {
      firstWalletName: 'My First Wallet'
      firstWalletNameBackupFile: 'My First Wallet Backup'
      firstWalletNameBackupFileTitle: 'YOUR MNEMONIC PHRASE:'
    }
    account: {
      defaultName: 'Account {{accountNumber}}'
    }
  }
  components: {
    sidebar: {
      portfolio: 'Portfolio'
      wallets: 'Wallets'
      settings: 'Settings'
      logout: 'Logout'
      send: 'Send'
      receive: 'Receive'
      nfts: 'NFTs'
      contacts: 'Contacts'
      news: 'News'
      mobile: 'Mobile app'
      link: {
        isNew: 'New'
      }
    }
  }
  pages: {
    welcome: {
      title: 'Welcome to Neon Wallet'
      skipSecurityButtonLabel: 'Skip security'
      setupSecurityButtonLabel: 'Setup security'
    }
    securitySetup: {
      title: 'Welcome to Neon Wallet'
      steps: ['Create Password', 'Confirm Password', 'Complete']
    }
    securitySetupStep1: {
      formTitle: 'Please create a password to secure your wallet'
      passwordPlaceholder: 'Create a password'
      passwordError: 'Password must be at least {{length}} characters long'
    }
    securitySetupStep2: {
      formTitle: 'Please confirm your password'
      confirmPasswordPlaceholder: 'Confirm your password'
      confirmPasswordError: 'Passwords do not match'
    }
    securitySetupStep3: {
      description: 'Your security setup is now complete, please back up your password below. Failure to backup may result in loss of access to your wallet'
      buttonDownloadLabel: 'Download backup'
      buttonPrintLabel: 'Print backup'
      buttonContinueLabel: 'Open your new wallet'
      firstWalletName: 'My First Wallet'
    }
    portfolio: {
      title: 'Portfolio'
      buttonRefreshLabel: 'Refresh'
    }
  }
}

export default Resources
