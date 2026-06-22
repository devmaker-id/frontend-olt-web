import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query'
import { deleteEndpoint } from '../api/endpoint.api'

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

  })
}