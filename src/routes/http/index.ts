import { Router } from 'express'
import { MessagesController } from '../../app/http/controllers/MessagesController';
import { UsersController } from '../../app/http/controllers/UsersController';
import { AuthController } from '../../app/http/controllers/AuthController';
import { AuthMiddleaware } from '../../app/http/middlawares/authmiddlaware';

const routes = Router();

const usersController = new UsersController()
const authController = new AuthController()
const authMiddleaware = new AuthMiddleaware()

routes.post('/auth/signIn', authController.signIn)
routes.post('/auth/signUp', authController.signUp)

routes.get('/user/phone', authMiddleaware.authenticate ,usersController.findUser)
// routes.post('/messages', messagesController.create)


export { routes }