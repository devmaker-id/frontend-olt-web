import type { NavigationNode } from '@/shared/navigation/navigation.types'
import { Bot } from 'lucide-react'

export const telegramBotNavigation: NavigationNode = {
  label: 'Telegram Bots',
  path: '/telegram-bots',
  icon: Bot,
  roles: ['OWNER'],
}