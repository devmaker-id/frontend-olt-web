import {
  UserCog
} from 'lucide-react'

export const telegramNavigation = {
  title: 'Telegram',
  roles: ['OWNER'],
  items: [

    {
      label: 'Telegram Users',
      path: '/telegram/users',
      icon: UserCog,
      roles: ['OWNER'],
    }
  ]
}