import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { BadRequestException } from '../../config/errors'
import { JwtDto } from '../dtos/JwtDto'
import { CreateUserDto, LoginDto } from '../dtos/UserDtos'
import { UserService } from './UserService'

export class AuthService {
  userService: UserService
  constructor() {
    this.userService = new UserService()
  }

  async login({ email, password }: LoginDto) {
    const user = await this.userService.getUserByEmail(email)
    if (!user) {
      throw new BadRequestException('credenciais inválidas')
    }
    const passwordMatche = await compare(password, user.password)
    if (!passwordMatche) {
      throw new BadRequestException('credenciais inválidas')
    }
    const token = this.generateToken({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    })
    user.password = ''
    return {
      user,
      token,
    }
  }

  async signUp({ name, email, password, role }: CreateUserDto) {
    const user = await this.userService.createUser({ name, email, password, role })
    const token = this.generateToken({
      id: user.id,
      name,
      email: user.email,
      role: user.role,
    })
    return {
      user,
      token,
    }
  }

  generateToken({ id, name, role, email }: JwtDto) {
    return sign({ id, name, role, email }, String(process.env.TOKEN_SECRET), {
      expiresIn: '1d',
    })
  }
}
