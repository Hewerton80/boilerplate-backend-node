import { ErrorRequestHandler } from 'express';
import { BadRequestException } from '../../config/errors';

export const errorRequestHandler: ErrorRequestHandler = (error, request, response, next) => {
    console.log(error instanceof BadRequestException)
    if(error instanceof BadRequestException){
        return response.status(400).json({ message: 'Bad Request' })
    }
    return response.status(500).json({ message: 'Internal server Error' })
}