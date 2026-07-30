import type { NavigationNode } from '@/shared/navigation/navigation.types'
import { Server, Activity } from 'lucide-react'

// export const oltNavigation:
//   NavigationSection = {
//   title: 'Network Services',
//   roles: ['OWNER'],
//   items: [
//     {
//       label: 'Log Server',
//       path: '/log-server',
//       icon: Activity,
//       roles: ['OWNER'],
//     },
//     {
//       label: 'OLTs',
//       path: '/olts',
//       icon: Server,
//       roles: ['OWNER'],
//     }
//   ]
// }

export const oltNavigation: NavigationNode = {
  label: 'OLT',
  icon: Server,
  children: [
    {
      label: 'Olt List',
      path: '/olts'
    },
    {
      label: 'Log Server',
      path: '/log-server'
    }
  ]
}