import type { NavigationNode } from './navigation.types'

import {
  Network,
  Users,
  Send,
  Activity,
} from 'lucide-react'

import { dashboardNavigation } from '@/modules/dashboard/navigation'

import { userManagementNavigation } from '@/modules/user-management/navigation'

import { oltNavigation } from '@/modules/olt/navigation'
import { onuNavigation } from '@/modules/onu/navigation'
import { onuReplacementNavigation } from '@/modules/onu-replacement/navigation'
import { endpointNavigation } from '@/modules/endpoint/navigation'

import { telegramNavigation } from '@/modules/telegram/navigation'
import { telegramBotNavigation } from '@/modules/telegram-bot/navigation'

import { systemLogsNavigation } from '@/modules/system-logs/navigation'

export const sidebarConfig: NavigationNode[] = [

  dashboardNavigation,

  {
    label: 'Management',
    icon: Users,
    children: [
      userManagementNavigation,
    ],
  },

  {
    label: 'Network',
    icon: Network,
    children: [
      oltNavigation,
      onuNavigation,
      onuReplacementNavigation,
      endpointNavigation,
    ],
  },

  {
    label: 'Telegram',
    icon: Send,
    children: [
      telegramNavigation,
      telegramBotNavigation,
    ],
  },

  {
    label: 'Monitoring',
    icon: Activity,
    children: [
      systemLogsNavigation,
    ],
  },

]