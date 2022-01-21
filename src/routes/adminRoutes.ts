import { Router } from 'express'
import { AuthMiddleaware } from '../app/middlawares/AuthMiddlaware'
import { PostController } from '../app/controllers/PostController'
import { PostValidator } from '../app/validators/PostValidator'
import { Role } from '@prisma/client'
import { LoggerMiddlaware } from '../app/middlawares/LoggerMiddlaware'
import { UsersController } from '../app/controllers/UserController'

const routes = Router()

const authMiddleaware = new AuthMiddleaware()
const loggerMiddlaware = new LoggerMiddlaware()
const postController = new PostController()
const usersController = new UsersController()
const postValidator = new PostValidator()

routes.use(
  '/admin',
  authMiddleaware.authenticate([Role.admin]),
  loggerMiddlaware.requestLogger
)
routes.post('/admin/posts', postValidator.createPost, postController.createPost)
routes.get('/admin/users', usersController.getUsers)

export { routes as adminRoutes }
