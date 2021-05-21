import { Request, Response } from 'express'
import { UsersService } from '../../services/UsersService'

export class UsersController {
    async findUser(request: Request, response: Response) {
        const { phone } = request.query;  
        const userService = new UsersService();
        const myPhone = request.user.phone;
        const user = await userService.getUserByPhone(String(phone), myPhone);
        return response.status(200).json({ user });
    }
}