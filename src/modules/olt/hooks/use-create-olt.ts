import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

import {
  createOlt,
} from '../api/olt.api'

export function useCreateOlt() {

  const queryClient =
    useQueryClient()

  return useMutation({

    mutationFn:
      createOlt,

    onSuccess() {

      queryClient
        .invalidateQueries({
          queryKey: [
            'olts',
          ],
        })

    },

  })

}