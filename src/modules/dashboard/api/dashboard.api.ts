import { api } from '../../../shared/api/api'

export async function getSummary() {
  const response = await api.get( '/onu/inventory/summary' )
  return response.data.data
}