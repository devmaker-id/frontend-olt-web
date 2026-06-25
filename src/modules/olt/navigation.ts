import type { NavigationSection } from '@/shared/navigation/navigation.types'
import { Server } from 'lucide-react'

export const oltNavigation:
  NavigationSection = {
  title: 'Network',
  roles: ['OWNER'],
  items: [
    {
      label: 'OLTs',
      path: '/olts',
      icon: Server,
      roles: ['OWNER'],
    }
  ]
}