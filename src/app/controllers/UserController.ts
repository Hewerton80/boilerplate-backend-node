import { Request, Response } from 'express'
import { logger } from '../../util/logger'
import { UserService } from '../services/UserService'

export class UsersController {
  async createUser(request: Request, response: Response) {
    const { method, url } = request
    const { name, email, password, role } = request.body
    const userService = new UserService()
    const user = await userService.createUser({ name, email, password, role })
    const status = 201
    logger({
      type: 'RESPONSE',
      level: 'info',
      status,
      method,
      url,
      body: JSON.stringify(user),
    })
    return response.status(status).json(user)
  }

  async getUsers(request: Request, response: Response) {
    const { method, url, user } = request
    const { page, perPage } = request.query
    const postService = new UserService()
    const users = await postService.getUsers({
      page: page ? Number(page) : undefined,
      perPage: perPage ? Number(perPage) : undefined,
    })
    const statusCode = 200
    logger({
      type: 'RESPONSE',
      level: 'info',
      status: statusCode,
      method,
      url,
      userId: user?.id,
      body: JSON.stringify(users),
    })
    return response.status(statusCode).json(users)
  }
}
