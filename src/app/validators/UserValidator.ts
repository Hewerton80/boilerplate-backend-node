import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import { getFormatJoiErrors } from '../../util/getFormatJoiErrors'
import { regex } from '../../util/regex'
import { logger } from '../../util/logger'
import { Role } from '@prisma/client'

export class UserValidator {
  async createUser(req: Request, res: Response, next: NextFunction) {
    const { name, email, role, password } = req.body
    const { method, url } = req

    const passwordErroMenssage =
      'Senha deve ter no mínimo 6 caracteres, deve conter pelo menos uma letra maiúscula, uma letra minúscula e um número ou caractere especial'

    const schema = Joi.object({
      name: Joi.string().required().pattern(regex.username).messages({
        'any.required': 'Nome é obrigatório',
        'string.pattern.base': 'Nome inválido',
      }),
      email: Joi.string().required().email().messages({
        'any.required': 'E-mail inválido',
        'string.empty': 'E-mail inválido',
        'string.email': 'E-mail inválido',
      }),
      role: Joi.any()
        .required()
        .valid(Role.admin, Role.customer)
        .messages({
          'any.required': 'Perfil é obrigatório',
          'any.only': `Perfil inválido! Disponíveis: [${Role.admin}, ${Role.customer}]`,
        }),
      password: Joi.string().required().min(6).pattern(regex.password).messages({
        'any.required': 'Senha é obrigatório',
        'string.min': passwordErroMenssage,
        'string.pattern.base': passwordErroMenssage,
      }),
    })

    try {
      await schema.validateAsync({ name, email, role, password }, { abortEarly: false })
    } catch (erro: any) {
      const formatJoiErrors = getFormatJoiErrors(erro)
      const status = 400
      logger({
        type: 'RESPONSE',
        level: 'error',
        method,
        url,
        status,
        menssageErro: JSON.stringify(formatJoiErrors),
      })
      return res.status(status).json(formatJoiErrors)
    }

    return next()
  }
}
