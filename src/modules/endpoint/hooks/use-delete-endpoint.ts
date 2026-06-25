import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query'
import { deleteEndpoint } from '../api/endpoint.api'
import { appToast } from '@/shared/lib/toast'

export function useDeleteEndpoint() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteEndpoint,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [
          'endpoints'
        ]
      })
    },
    onError(error: any) {
    const message = error?.response?.data?.message
    const details = error?.response?.data?.errors
    if (message === 'ENDPOINT_CANNOT_DELETE') {
      appToast.error(
        [
          'Endpoint cannot be deleted.',
          `ONU: ${details?.onus ?? 0}`,
          `Replacement: ${details?.replacements ?? 0}`,
        ].join(' '),
      )
      return
    }
    appToast.error(message || error.message)
  }

  })
}