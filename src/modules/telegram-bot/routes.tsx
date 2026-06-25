import { OwnerRoute } from '@/shared/routes/owner-route'
import { TelegramBotsPage } from './pages/telegram-bots.page'

export const telegramBotRoutes = [
  {
    path: 'telegram-bots',

    element: (
      <OwnerRoute>
        <TelegramBotsPage />
      </OwnerRoute>
    ),
  },
]