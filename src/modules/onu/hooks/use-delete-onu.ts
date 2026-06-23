import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { deleteOnu } from '../api/onu.api'
import { appToast } from '@/shared/lib/toast'

export function useDeleteOnu() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteOnu,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [
          'onus',
        ],
      })
      appToast.success(
        'ONU deleted successfully',
      )
    },
    onError(error: any) {
      appToast.error(
        error?.response
          ?.data
          ?.message
        ||
        error.message,
      )
    },
  })
}