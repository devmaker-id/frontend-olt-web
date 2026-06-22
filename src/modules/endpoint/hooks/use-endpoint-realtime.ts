import { useQuery } from "@tanstack/react-query";
import { getRealtimeEndpoint } from "../api/endpoint.api";

export function useRealtimeEndpoint(
  internetNo?: string
) {
  return useQuery({
    queryKey: [
      'endpoint-realtime',
      internetNo
    ],
    queryFn: () => getRealtimeEndpoint(
      internetNo!
    ),
    enabled: !!internetNo
  })
}