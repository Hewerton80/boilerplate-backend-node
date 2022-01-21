import { Router } from 'express'
import { AuthMiddleaware } from '../app/middlawares/AuthMiddlaware'
import { PostController } from '../app/controllers/PostController'
import { LoggerMiddlaware } from '../app/middlawares/LoggerMiddlaware'
import { VerificationMiddlaware } from '../app/middlawares/VerificationMiddlaware'

const routes = Router()

const authMiddleaware = new AuthMiddleaware()
const loggerMiddlaware = new LoggerMiddlaware()
const postController = new PostController()

routes.use('/posts', authMiddleaware.authenticate(), loggerMiddlaware.requestLogger)
routes.get('/posts', postController.getPosts)
routes.get('/posts/:id', postController.getPostById)

export { routes as customerRoutes }
