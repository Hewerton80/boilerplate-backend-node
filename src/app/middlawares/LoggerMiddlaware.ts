import { Request, Response, NextFunction } from 'express'
import { logger } from '../../util/logger'

export class LoggerMiddlaware {
  requestLogger(req: Request, _: Response, next: NextFunction) {
    const { method, url, params, query, user } = req
    logger({
      type: 'REQUEST',
      level: 'info',
      method,
      url,
      params: Object.keys(params).length ? JSON.stringify(params) : undefined,
      queryParans: Object.keys(query).length ? JSON.stringify(query) : undefined,
      userId: user?.id,
    })
    return next()
  }
}
