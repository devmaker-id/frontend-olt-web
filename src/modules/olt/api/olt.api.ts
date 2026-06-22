import {api} from '@/shared/api/api'
import type { ApiResponse } from '@/shared/api/types'
import type {
  Olt,
  CreateOltRequest,
  UpdateOltRequest,
  OltOpticalInfo,
  OltConnectionInfo
} from '../types/olt.types'

export async function getOlts() {
  const response = await api.get<ApiResponse<Olt[]>>(
      '/olt'
    )
  return response.data.data
}
export async function getOlt(
  id: string
) {

  const response = await api.get<ApiResponse<Olt>>(
      `/olt/${id}`
    )

  return response.data.data
}
export async function createOlt(
  data: CreateOltRequest
) {
  const response = await api.post<ApiResponse<Olt>>(
    '/olt',
    data
  )
  return response.data.data
}
export async function updateOlt(
  id: string,
  data: UpdateOltRequest
) {
  const response = await api.put<ApiResponse<Olt>>(
    `/olt/${id}`,
    data
  )
  return response.data.data
}
export async function deleteOlt(
  id:string
) {
  const response = await api.delete<ApiResponse<Olt>>(
    `/olt/${id}`
  )
  return response.data.data
}


export async function getOltOptical(
  id: string
) {
  const response = await api.get<ApiResponse<OltOpticalInfo[]>>(
      `/olt/${id}/optical`
    )
  return response.data.data
}

export async function connectOlt(
  id: string
) {
  const response = await api.get<ApiResponse<OltConnectionInfo>>(
      `/olt/${id}/connect`
    )
  return response.data.data
}