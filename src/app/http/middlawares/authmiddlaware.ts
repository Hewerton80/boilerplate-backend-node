import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken';
import { IJwt } from '../../types/AuthTypes';

export class AuthMiddleaware {

    authenticate(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization
        if (!authHeader) {
            return res.status(401).json({ erro: "token não informado" })
        }
        const parts = authHeader.split(' ')
        if (parts.length !== 2) {
            return res.status(401).json("token mal formatado")
        }
        const [bearer, token] = parts
        if (bearer !== "Bearer") {
            return res.status(401).json("token mal formatado")
        }
        verify(token, String(process.env.TOKEN_SECRET), (err, decoded) => {
            if (err) {
                return res.status(401).json({ erro: "token inválido" })
            }
            req.user = decoded as IJwt;
            next();
        })
    }
    
}