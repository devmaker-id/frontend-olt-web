import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

import {
  deleteOlt,
} from '../api/olt.api'

export function useDeleteOlt() {

  const queryClient =
    useQueryClient()

  return useMutation({

    mutationFn:
      deleteOlt,

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