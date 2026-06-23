import { useQuery } from '@tanstack/react-query'
import { getRealtimeOnu } from '../api/onu.api'
import type { RealtimeOnu } from '../types/onu.types'

export function useRealtimeOnu(
  oltId?: string,
  portId?: string,
  onuId?: string,
) {
  return useQuery<RealtimeOnu>({
    queryKey: [
      'onu-realtime',
      oltId,
      portId,
      onuId,
    ],
    queryFn: () =>
      getRealtimeOnu(
        oltId!,
        portId!,
        onuId!,
      ),
    enabled:
      !!oltId
      &&
      !!portId
      &&
      !!onuId,
  })
}