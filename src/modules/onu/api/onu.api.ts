import { api } from '../../../shared/api/api'
import type { ApiResponse } from '@/shared/api/types'

import type {
  Onu,
  UnauthorizedOnu,
  AuthorizeOnuRequest,
  ReplaceOnuRequest,
} from '../types/onu.types'

// AUTHORIZE ONU
export async function authorizeOnu(
  payload: AuthorizeOnuRequest
) {

  const response = await api.post(
      '/onu',
      payload
    )

  return response.data
}

export async function getUnauthorizedOnus() {
  const response = await api.get<ApiResponse<UnauthorizedOnu[]>>(
      '/onu-unauthorize'
    )
  return response.data.data
}

export async function getOnus() {
  const response = await api.get<ApiResponse<Onu[]>>('/onu')
  return response.data.data
}

export async function getRealtimeOnu(
  oltId: string,
  portId: string,
  onuId: string,
) {

  const response = await api.get(
      `/olt/${oltId}/onu`,
      {
        params: {
          portid: portId,
          onuid: onuId,
        },
      },
    )

  return response.data.data

}

export async function replaceOnu(
  payload: ReplaceOnuRequest,
) {
  const response = await api.post(
      '/onu-replacement',
      payload,
    )
  return response.data
}

export async function deleteOnu(
  id: string,
) {

  const response = await api.delete(
      `/onu/${id}`,
    )
  return response.data.data
}