import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

import { deleteSyslogEvent } from '../api/syslog-event.api'

export function useDeleteSyslogEvent() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteSyslogEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['syslog-events']
      })
    }

  })
}