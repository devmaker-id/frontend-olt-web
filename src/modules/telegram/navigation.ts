import type { NavigationNode } from '@/shared/navigation/navigation.types'
import { UserCog } from 'lucide-react'

export const telegramNavigation: NavigationNode = {
  label: 'Telegram Users',
  path: '/telegram/users',
  icon: UserCog,
  roles: ['OWNER'],
}