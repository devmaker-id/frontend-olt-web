import { api } from '@/shared/api/api'

import type {
  User,
  CreateUserDto,
  UpdateUserDto,
} from '../types/user-management.types'

import type { ApiResponse } from '@/shared/api/types'

export async function getUsers() {
  const response = await api.get<ApiResponse<User[]>>('/users',)
  return response.data.data

}

export async function getUser(
  id: string,
) {
  const response = await api.get<ApiResponse<User>>(
      `/users/${id}`,
    )
  return response.data.data

}

export async function createUser(
  payload: CreateUserDto,
) {

  const response = await api.post(
      '/users',
      payload,
    )
  console.log(response)

  return response.data.data

}

export async function updateUser(
  id: string,
  payload: UpdateUserDto,
) {

  const response =
    await api.patch(
      `/users/${id}`,
      payload,
    )

  return response.data

}

export async function deleteUser(
  id: string,
) {

  const response =
    await api.delete(
      `/users/${id}`,
    )

  return response.data

}

export async function resetUserPassword(
  id: string,
  password: string,
) {

  const response =
    await api.patch(

      `/users/${id}/reset-password`,

      {
        password,
      },

    )

  return response.data

}