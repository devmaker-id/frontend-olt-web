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

export interface CreateUserDto {
  username: string
  password: string
  role: UserRole
  
  email: string
  telepon: string
  alamat: string
  telegramId: string
}

export interface UpdateUserDto {
  username?: string
  role?: UserRole
}