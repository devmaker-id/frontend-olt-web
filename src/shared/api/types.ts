export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

export interface ApiListResponse<T> {
  success: boolean
  message: string
  data: T[]
  meta?: {
    total: number
  }
}