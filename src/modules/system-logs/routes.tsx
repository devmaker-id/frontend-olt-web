import TelegramAccessLogsPage from './pages/telegram-access-logs.page'
import SyslogEventsPage from './pages/syslog-events.page'
import { OwnerRoute } from '@/shared/routes/owner-route'

export const systemLogsRoutes = [

  {
    path: 'system-logs/telegram-access',
    element: (
      <OwnerRoute>
        <TelegramAccessLogsPage />
      </OwnerRoute>
    )
  },
  {
    path: 'system-logs/syslog-events',
    element: (
      <OwnerRoute>
        <SyslogEventsPage />
      </OwnerRoute>
    )
  }
]