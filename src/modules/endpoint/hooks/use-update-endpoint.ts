import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query'
import { updateEndpoint } from '../api/endpoint.api'
import type { UpdateEndpointMutationRequest } from '../types/endpoint.types'

export function useUpdateEndpoint() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (
        payload: UpdateEndpointMutationRequest
    ) => updateEndpoint(
        payload.id,
        payload.data
    ),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [
          'endpoints'
        ]
      })
    }
  })
}