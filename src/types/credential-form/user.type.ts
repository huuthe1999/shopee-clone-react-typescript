enum Roles {
  User = 'User',
  Admin = 'Admin'
}
export interface UserResponse {
  _id: string
  email: string
  name: string
  date_of_birth: Date | null
  address?: string
  phone?: string
  roles: Roles[]
  createdAt?: Date
  updatedAt?: Date
}
