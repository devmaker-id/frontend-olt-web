import type { NavigationNode } from '@/shared/navigation/navigation.types'
import { Users } from 'lucide-react'

export const endpointNavigation: NavigationNode = {
  label: 'Endpoints',
  icon: Users,
  end: true,
  path: '/endpoints',
}