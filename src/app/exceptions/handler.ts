import { ErrorRequestHandler } from 'express';
import { BadRequestException, ConflictException } from '../../config/errors';

export const errorRequestHandler: ErrorRequestHandler = (error, request, response, next) => {
    if(error instanceof BadRequestException){
        return response.status(400).json({ message: 'Bad Request' })
    }

    else if(error instanceof ConflictException){
        return response.status(409).json({ message: 'Conflict' })
    }
    console.log(error);
    return response.status(500).json({ message: 'Internal server Error' })
}