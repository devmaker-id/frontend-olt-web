import {
  ShieldAlert,
  Activity
} from 'lucide-react'

export const systemLogsNavigation = {
  title: 'System Logs',
  roles: ['OWNER'],
  items: [
    {
      label: 'Telegram Access',
      path: '/system-logs/telegram-access',
      icon: ShieldAlert,
      roles: ['OWNER'],
      end: true
    },
    {
      label: 'Syslog Events',
      path: '/system-logs/syslog-events',
      icon: Activity,
      roles: ['OWNER'],
    }
  ]
}