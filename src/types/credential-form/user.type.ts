import { Roles, Sexes } from '@/types'

export interface UserResponse {
  _id: string
  email: string
  avatar?: string
  name: string
  date_of_birth: number
  phone: string
  sex: Sexes
  roles: Roles[]
}
