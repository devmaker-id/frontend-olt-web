import { env } from '@/config/env'
import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

import {
  setWebhook,
} from '../api/telegram-bot.api'

import {
  appToast,
} from '@/shared/lib/toast'

interface SetWebhookPayload {
  id: string
}

export function useSetWebhook() {
  const queryClient = useQueryClient()
  const domain = env.domainUrl

  return useMutation({
    mutationFn: ({
      id,
    }: SetWebhookPayload) => setWebhook(id, domain),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [
          'telegram-bots',
        ],
      })
      appToast.success(
        'Webhook configured',
      )
    },
    onError(error) {
      appToast.error(
        error.message,
      )
    },
  })
}