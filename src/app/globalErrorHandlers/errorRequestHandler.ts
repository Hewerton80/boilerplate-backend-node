import { ErrorRequestHandler } from 'express'
import {
    BadRequestException,
    ConflictException,
    UnauthorizedException,
    NotFoundException,
} from '../../config/errors'
import { ILogger, logger } from '../../util/logger'

export const errorRequestHandler: ErrorRequestHandler = (error, req, res, __) => {

    const { method, url } = req
    let menssageErro = ''
    let status = 0
    const loggerParans: ILogger = {
        type: 'RESPONSE',
        level: 'error',
        status,
        method,
        url,
    }

    if (error instanceof BadRequestException) {
        menssageErro = error?.message || 'Bad Request'
        status = 400
        logger({ ...loggerParans, status, menssageErro })
        return res.status(status).json({ message: menssageErro })
    }
    else if (error instanceof UnauthorizedException) {
        menssageErro = error?.message || 'Unauthorized '
        status = 401
        logger({ ...loggerParans, status, menssageErro })
        return res.status(status).json({ message: menssageErro })
    }

    else if (error instanceof NotFoundException) {
        menssageErro = error?.message || 'Not Found'
        status = 404
        logger({ ...loggerParans, status, menssageErro })
        return res.status(status).json({ message: menssageErro })
    }

    else if (error instanceof ConflictException) {
        menssageErro = error?.message || 'Conflict'
        status = 409
        logger({ ...loggerParans, status, menssageErro })
        return res.status(status).json({ message: menssageErro })
    }

    menssageErro = error?.message || 'Internal server Error'
    status = 500
    logger({ ...loggerParans, status, menssageErro })

    return res.status(500).json({ message: menssageErro })

}
