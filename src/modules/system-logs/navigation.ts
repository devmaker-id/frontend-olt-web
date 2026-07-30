import type { NavigationNode } from '@/shared/navigation/navigation.types'
import { ShieldAlert } from 'lucide-react'

export const systemLogsNavigation: NavigationNode = {
  label: 'System Logs',
  roles: ['OWNER'],
  icon: ShieldAlert,
  children: [
    {
      label: 'Telegram Access',
      path: '/system-logs/telegram-access',
      end: true
    },
    {
      label: 'Syslog Events',
      path: '/system-logs/syslog-events',
    }
  ]
}