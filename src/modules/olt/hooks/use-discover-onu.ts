import {
  useMutation,
} from '@tanstack/react-query'

import {
  discoverOnu,
} from '../api/discover-onu.api'

export function useDiscoverOnu() {

  return useMutation({

    mutationFn:
      discoverOnu,

  })

}