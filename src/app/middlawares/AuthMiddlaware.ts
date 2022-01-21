import { Role } from '@prisma/client'
import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import { UnauthorizedException } from '../../config/errors'
import { JwtDto } from '../dtos/JwtDto'

export class AuthMiddleaware {
  authenticate(roleGroup?: Role[]) {
    return (req: Request, _: Response, next: NextFunction) => {
      const { authorization } = req.headers

      if (!authorization) {
        throw new UnauthorizedException('token não informado')
      }
      const parts = authorization.split(' ')
      if (parts.length !== 2) {
        throw new UnauthorizedException('token não informado')
      }
      const [bearer, token] = parts
      if (bearer !== 'Bearer') {
        throw new UnauthorizedException('token não informado')
      }
      verify(token, String(process.env.TOKEN_SECRET), (err, decoded) => {
        if (err) {
          throw new UnauthorizedException('token inválido')
        }
        const userDecoded = decoded as JwtDto
        if (roleGroup?.length && !roleGroup.includes(userDecoded?.role)) {
          throw new UnauthorizedException('Sem acesso')
        }
        req.user = userDecoded
        next()
      })
    }
  }
}
