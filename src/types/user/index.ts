import { UserResponse } from '@/types'

export enum Sexes {
  None = '-1',
  Male = '0',
  Female = '1',
  Other = '2'
}

export enum Roles {
  User = 'User',
  Admin = 'Admin'
}

export type TUserUpdate = Omit<UserResponse, '_id' | 'email' | 'roles'> & {
  avatarId?: string
  password?: string
}
