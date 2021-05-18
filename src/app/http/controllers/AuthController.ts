import { Request, Response } from 'express'
import { AuthService } from '../../services/AuthService'

export class AuthController {

    async login(request: Request, response: Response) {
        const authService = new AuthService();
        const { name, phone, password} = request.body;
        const userWithToken = await authService.login(name, phone, password);
        return response.status(200).json(userWithToken);
    }

}