import { api } from '../../../shared/api/api'
import type { ApiResponse } from '@/shared/api/types'
import type {
  OnuReplacement,
  ReplaceOnuPayload,
} from '../types/onu-replacement.types'

export async function getOnuReplacements() {
  const response = await api.get<ApiResponse<OnuReplacement[]>>('/onu-replacement')
  return response.data.data
}
export async function getOnuReplacement(id: string) {
  const response = await api.get<ApiResponse<OnuReplacement>>(`/onu-replacement/${id}`)
  return response.data.data
}

export async function replaceOnu(
  payload: ReplaceOnuPayload
) {

  const response =
    await api.post<ApiResponse<ReplaceOnuPayload>>(
      '/onu-replacement',
      payload
    )

  return response.data.data
}