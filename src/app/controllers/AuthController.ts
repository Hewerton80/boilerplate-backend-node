import { Request, Response } from 'express'
import { logger } from '../../util/logger'
import { AuthService } from '../services/AuthService'

export class AuthController {
  async login(request: Request, response: Response) {
    const { method, url } = request
    const { email, password } = request.body
    logger({ type: 'REQUEST', level: 'info', method, url })
    const authService = new AuthService()
    const userWithToken = await authService.login({ email, password })
    const status = 201
    logger({
      type: 'RESPONSE',
      level: 'info',
      status,
      method,
      url,
      body: JSON.stringify(userWithToken),
    })
    return response.status(status).json(userWithToken)
  }

  async signUp(request: Request, response: Response) {
    const { method, url } = request
    logger({ type: 'REQUEST', level: 'info', method, url })
    const authService = new AuthService()
    const { name, email, password, role } = request.body
    const userWithToken = await authService.signUp({ name, email, password, role })
    const status = 201
    logger({
      type: 'RESPONSE',
      level: 'info',
      status,
      method,
      url,
      body: JSON.stringify(userWithToken),
    })
    return response.status(status).json(userWithToken)
  }
}
