import { useQuery } from '@tanstack/react-query'
import { getSyslogEvents } from '../api/syslog-event.api'

export function useSyslogEvents() {
  return useQuery({
    queryKey: ['syslog-events'],
    queryFn: getSyslogEvents
  })
}