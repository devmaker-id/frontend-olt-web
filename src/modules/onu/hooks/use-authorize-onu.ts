import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

import { authorizeOnu } from '../api/onu.api'
import { appToast } from '@/shared/lib/toast'

export function useAuthorizeOnu() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: authorizeOnu,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['unauthorized-onus'],
      })
      queryClient.invalidateQueries({
        queryKey: ['onus']
      })
      queryClient.invalidateQueries({
        queryKey: ['endpoints']
      })
      appToast.success('ONU authorized successfully')
    },
    onError(error: any) {
      appToast.error(
        error?.response?.data?.message || error.message
      )
    },
  })
}