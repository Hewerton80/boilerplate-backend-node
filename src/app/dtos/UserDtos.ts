import { Role } from '@prisma/client'

export class CreateUserDto {
  name: string
  email: string
  password: string
  role: Role
}

export class LoginDto {
  email: string
  password: string
}
