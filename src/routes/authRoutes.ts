import { Router } from 'express'
import { AuthController } from '../app/controllers/AuthController'
import { UserValidator } from '../app/validators/UserValidator'
import { LoggerMiddlaware } from '../app/middlawares/LoggerMiddlaware'

const routes = Router()

const loggerMiddlaware = new LoggerMiddlaware()
const authController = new AuthController()
const userValidator = new UserValidator()

routes.use('/auth', loggerMiddlaware.requestLogger)
routes.post('/auth/login', authController.login)
routes.post('/auth/signUp', userValidator.createUser, authController.signUp)

export { routes as authRoutes }
