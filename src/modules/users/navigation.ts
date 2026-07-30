import type { NavigationNode } from '@/shared/navigation/navigation.types'
import { UserCircle } from 'lucide-react'

export const usersNavigation: NavigationNode = {
  label: 'Profile',
  path: '/profile',
  icon: UserCircle,
}