import { Request, Response } from 'express'
import { AuthService } from '../../services/AuthService'

export class AuthController {

    async signIn(request: Request, response: Response) {
        const authService = new AuthService();
        const { phone, password} = request.body;
        const userWithToken = await authService.signIn(phone, password);
        return response.status(200).json(userWithToken);
    }

    async signUp(request: Request, response: Response) {
        const authService = new AuthService();
        const { name, phone, password} = request.body;
        const userWithToken = await authService.signUp(name, phone, password);
        return response.status(200).json(userWithToken);
    }

}