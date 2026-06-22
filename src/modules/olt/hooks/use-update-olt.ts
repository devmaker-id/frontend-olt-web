import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

import {
  updateOlt,
} from '../api/olt.api'

import type {
  UpdateOltMutationDto,
} from '../types/olt.types'

export function useUpdateOlt() {

  const queryClient =
    useQueryClient()

  return useMutation({

    mutationFn: (
      payload:
        UpdateOltMutationDto,
    ) =>
      updateOlt(
        payload.id,
        payload.data,
      ),

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