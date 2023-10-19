import { createBrowserRouter } from 'react-router-dom'
import { DashboardPage } from '@renderer/pages/Dashboard'
import { SecuritySetupPage } from '@renderer/pages/SecuritySetup'
import { SecuritySetupStep1Page } from '@renderer/pages/SecuritySetup/SecuritySetupStep1'
import { SecuritySetupStep2Page } from '@renderer/pages/SecuritySetup/SecuritySetupStep2'
import { SecuritySetupStep3Page } from '@renderer/pages/SecuritySetup/SecuritySetupStep3'
import { WelcomePage } from '@renderer/pages/Welcome'

export const router = createBrowserRouter([
  { path: '/', element: <DashboardPage /> },
  { path: '/welcome', element: <WelcomePage /> },
  {
    path: '/security-setup',
    element: <SecuritySetupPage />,
    children: [
      {
        path: '1?',
        element: <SecuritySetupStep1Page />,
      },
      {
        path: '2',
        element: <SecuritySetupStep2Page />,
      },
      {
        path: '3',
        element: <SecuritySetupStep3Page />,
      },
    ],
  },
])
