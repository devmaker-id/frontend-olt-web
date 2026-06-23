import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { replaceOnu } from '../api/onu.api'
import { appToast } from '@/shared/lib/toast'

export function useReplaceOnu() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn:
      replaceOnu,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [
          'onus',
        ],
      })
      queryClient.invalidateQueries({
        queryKey: [
          'unauthorized-onus',
        ],
      })
      queryClient.invalidateQueries({
        queryKey: [
          'onu-replacements',
        ],
      })
      appToast.success(
        'ONU replaced successfully',
      )
    },
    onError(error: any) {
      appToast.error(
        error?.response
          ?.data
          ?.message
        ||
        error.message
      )
    },
  })
}