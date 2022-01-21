import { prisma } from '../../database/client'
import { compare, hash } from 'bcrypt'
import { CreateUserDto } from '../dtos/UserDtos'
import { BadRequestException, ConflictException } from '../../config/errors'
import { PaginationDto } from '../dtos/PaginationsDto'
import { getPaginedDocs } from '../../util/getPaginadDocs'
import { User } from '@prisma/client'

class UserService {
  async createUser({ name, email, password, role }: CreateUserDto) {
    const existingUser = await this.getUserByEmail(email)
    if (existingUser) {
      throw new ConflictException('Já existe um usuário cadastrado com esse email')
    }
    try {
      const user = await prisma.user.create({
        data: {
          name: name.trim(),
          email: email.trim(),
          password: await hash(password, 10),
          role,
        },
      })
      user.password = ''
      return user
    } catch (err) {
      throw new BadRequestException('error when registering user')
    }
  }

  async getUserByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } })
  }

  async getUsers({ page = 1, perPage = 25 }: PaginationDto = {}) {
    const take = perPage
    const skip = (page - 1) * perPage
    const users = await prisma.user.findMany({
      skip,
      take,
      select: { id: true, email: true, name: true, role: true, createdAt: true },
    })
    const userCount = await prisma.user.count()
    return getPaginedDocs({
      docs: users,
      currentPage: page,
      perPage: perPage,
      totalDocs: userCount,
    })
  }
}

export { UserService }
