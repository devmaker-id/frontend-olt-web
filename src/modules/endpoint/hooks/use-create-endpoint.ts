import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query'

import { createEndpoint } from '../api/endpoint.api'

export function useCreateEndpoint() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createEndpoint,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['endpoints'],
      })
    }
  })
}