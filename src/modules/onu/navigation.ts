import type { NavigationNode } from '@/shared/navigation/navigation.types'
import { Wifi } from 'lucide-react'

export const onuNavigation: NavigationNode = {
  label: "ONU",
  icon: Wifi,
  children: [
    {
      label: 'ONU List',
      path: '/onu',
      end: true,
    },
    {
      label: 'Replacements',
      path: '/onu-replacements'
    },
    {
      label: 'Unauthorized ONU',
      path: '/onu/unregistered',
    }
  ]
}