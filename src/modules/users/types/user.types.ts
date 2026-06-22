export type UserRole =
  | 'OWNER'
  | 'TEKNISI'

export interface User {
  id: string
  username: string
  role: UserRole

  email: string
  telepon: string
  alamat: string
  telegramId: string

  createdAt: string
  updatedAt: string
}

export interface ChangePasswordDto {
  oldPassword: string

  newPassword: string
}

export interface UpdateProfileDto {
  username: string
}