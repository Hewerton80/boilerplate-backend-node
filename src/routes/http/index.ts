import { Router } from 'express'
import { MessagesController } from '../../app/http/controllers/MessagesController';
import { UsersController } from '../../app/http/controllers/UsersController';
import { AuthController } from '../../app/http/controllers/AuthController';

const routes = Router();

const usersController = new UsersController()
const messagesController = new MessagesController()
const authController = new AuthController()

routes.post('/auth/login', authController.login)
// routes.post('/messages', messagesController.create)
// routes.get('/messages/:id', messagesController.showByUser)


export { routes }