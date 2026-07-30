import type { NavigationNode } from '@/shared/navigation/navigation.types'
import { Users } from 'lucide-react'

export const userManagementNavigation: NavigationNode = {
  label: 'Users',
  path: '/users',
  icon: Users,
  roles: ['OWNER']
}