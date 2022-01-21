import { Request, Response, NextFunction } from 'express'
import { BadRequestException } from '../../config/errors'
import { isUndefined } from '../../util/isType'
import { regex } from '../../util/regex'

export class VerificationMiddlaware {
  verifyPaginationQueryParans(req: Request, _: Response, next: NextFunction) {
    const { page, perPage } = req.query
    if (!isUndefined(page) && !String(page).match(regex.number)) {
      throw new BadRequestException('page deve ser um número')
    }
    if (!isUndefined(perPage) && !String(perPage).match(regex.number)) {
      throw new BadRequestException('perPage deve ser um número')
    }
    return next()
  }
}
