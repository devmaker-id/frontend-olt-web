import { api } from '../../../shared/api/api'
import type { ApiResponse } from '@/shared/api/types'

import type {
  UnauthorizedOnu,
  AuthorizeOnuRequest,
} from '../types/onu.types'

export async function getUnauthorizedOnus() {
  const response = await api.get<ApiResponse<UnauthorizedOnu[]>>(
      '/onu-unauthorize'
    )
  return response.data.data
}

export async function authorizeOnu(
  payload: AuthorizeOnuRequest
) {

  const response =
    await api.post(
      '/onu-unauthorize',
      payload
    )

  return response.data
}