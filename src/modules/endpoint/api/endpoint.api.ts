import { api } from '@/shared/api/api'

import type {
  ApiResponse,
  ApiListResponse,
} from '@/shared/api/types'

import type {
  Endpoint,
  EndpointInternetDetail,
  CreateEndpointRequest,
  UpdateEndpointRequest,
} from '../types/endpoint.types'

export async function getEndpoints() {

  const response = await api.get<
      ApiListResponse<Endpoint>
    >('/endpoint')

  return response.data.data
}

export async function getEndpointNotUsed() {
  const response = await api.get<
      ApiListResponse<Endpoint>
    >('/endpoint/not-used')
  return response.data.data
}
export async function getEndpointIstUsed() {
  const response = await api.get<
      ApiListResponse<Endpoint>
    >('/endpoint/is-used')
  return response.data.data
}

export async function getEndpointById(
  id: string,
) {

  const response = await api.get<
      ApiResponse<Endpoint>
    >(
      `/endpoint/${id}`,
    )

  return response.data.data
}

export async function createEndpoint(
  data: CreateEndpointRequest,
) {

  const response = await api.post<
      ApiResponse<Endpoint>
    >(
      '/endpoint',
      data,
    )
  return response.data.data
}

export async function updateEndpoint(
  id: string,
  data: UpdateEndpointRequest,
) {

  const response = await api.put<
      ApiResponse<Endpoint>
    >(
      `/endpoint/${id}`,
      data,
    )

  return response.data.data
}

export async function deleteEndpoint(
  id: string,
) {

  const response = await api.delete<
      ApiResponse<Endpoint>
    >(
      `/endpoint/${id}`,
    )

  return response.data.data
}

export async function getRealtimeEndpoint(
  internetNo: string,
) {

  const response = await api.get<
      ApiResponse<EndpointInternetDetail>
    >(
      `/endpoint/internet/${internetNo}`,
    )

  return response.data.data
}