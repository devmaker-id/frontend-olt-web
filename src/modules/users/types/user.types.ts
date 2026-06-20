export type UserRole =
  | 'OWNER'
  | 'TEKNISI'

export interface User {
  data: {
    id: string

  username: string

  role: UserRole

  createdAt: string

  updatedAt: string
  }
}

export interface ChangePasswordDto {
  oldPassword: string

  newPassword: string
}

export interface UpdateProfileDto {
  username: string
}