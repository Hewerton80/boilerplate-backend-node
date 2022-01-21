import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import { getFormatJoiErrors } from '../../util/getFormatJoiErrors'
import { logger } from '../../util/logger'
import { Status } from '@prisma/client'

export class PostValidator {
  async createPost(req: Request, res: Response, next: NextFunction) {
    const { title, content, status } = req.body
    const { method, url } = req

    const schema = Joi.object({
      title: Joi.string().required().messages({
        'any.required': 'Título é obrigatório',
        'string.pattern.base': 'Título inválido',
      }),
      content: Joi.string().required().messages({
        'any.required': 'Conteúdo é obrigatório',
        'string.pattern.base': 'Conteúdo inválido',
      }),
      status: Joi.any()
        .required()
        .valid(Status.draft, Status.inRevision, Status.published, Status.unpublished)
        .messages({
          'any.required': 'Status é obrigatório',
          'any.only': `Status inválido! Disponíveis: [${Status.draft}, ${Status.inRevision}, ${Status.published}, ${Status.unpublished}]`,
        }),
    })

    try {
      await schema.validateAsync({ title, content, status }, { abortEarly: false })
    } catch (erro: any) {
      const formatJoiErrors = getFormatJoiErrors(erro)
      const statusCode = 400
      logger({
        type: 'RESPONSE',
        level: 'error',
        method,
        url,
        status: statusCode,
        menssageErro: JSON.stringify(formatJoiErrors),
      })
      return res.status(statusCode).json(formatJoiErrors)
    }

    return next()
  }
}
