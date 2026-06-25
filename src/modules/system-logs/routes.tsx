import TelegramAccessLogsPage from './pages/telegram-access-logs.page'
import SyslogEventsPage from './pages/syslog-events.page'

export const systemLogsRoutes = [

  {
    path: 'system-logs/telegram-access',
    element: (
      <TelegramAccessLogsPage />
    )
  },
  {
    path: 'system-logs/syslog-events',
    element: <SyslogEventsPage />
  }
]