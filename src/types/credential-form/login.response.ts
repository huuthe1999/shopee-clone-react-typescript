import { UserResponse } from '@/types'

export interface LoginDataResponse {
  accessToken: string
  expiresIn: number
  user: UserResponse
}
