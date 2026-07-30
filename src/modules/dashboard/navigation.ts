import type { NavigationNode } from '@/shared/navigation/navigation.types'
import { LayoutDashboard } from 'lucide-react'

export const dashboardNavigation: NavigationNode = {
  label: 'Dashboard',
  icon: LayoutDashboard,
  path: '/dashboard',
}