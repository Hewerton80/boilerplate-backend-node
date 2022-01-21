import { Role } from '@prisma/client'
import { Socket } from 'socket.io'

export class JwtDto {
  id: string | number
  name: string
  email: string
  role: Role
}

export class ExtendedSocket extends Socket {
  user: JwtDto
}
