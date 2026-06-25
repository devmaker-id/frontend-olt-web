import { OwnerRoute } from '@/shared/routes/owner-route'
import type { AppRoute } from '@/shared/types/app-route.types'
import {
  TelegramUsersPage
} from './pages/telegram-users.page'

export const telegramRoutes: AppRoute[] = [

  {
    path: 'telegram/users',

    element: (
      <OwnerRoute>
        <TelegramUsersPage />
      </OwnerRoute>
    )
  }
]