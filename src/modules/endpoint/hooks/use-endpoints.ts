import { useQuery } from '@tanstack/react-query'
import {
  getEndpoints,
  getEndpointNotUsed
} from '../api/endpoint.api'

export function useEndpoints() {
  return useQuery({
    queryKey: ['endpoints'],
    queryFn: getEndpoints
  })
}
export function notUsedEndpoint() {
  return useQuery({
    queryKey: ['endpoints'],
    queryFn: getEndpointNotUsed
  })
}