import type { NavigationNode } from '@/shared/navigation/navigation.types'
import { RefreshCcw } from 'lucide-react'

export const onuReplacementNavigation: NavigationNode = {
  label: 'ONU Replacement',
  icon: RefreshCcw,
  path: '/onu/replacements',
}