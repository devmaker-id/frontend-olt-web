import {
  Wifi,
  WifiOff
} from 'lucide-react'

export const onuNavigation = {

  title: 'ONU Management',

  items: [
    {
      label: 'ONU List',
      path: '/onu',
      icon: Wifi,
      end: true,
    },
    {
      label: 'Unauthorized ONU',
      path: '/onu/unregistered',
      icon: WifiOff,
    }
  ]
}