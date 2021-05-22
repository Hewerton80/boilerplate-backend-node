import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken';
import { Socket } from 'socket.io';
import { ExtendedError } from 'socket.io/dist/namespace';
import { ExtendedSocket, IJwt } from '../types/AuthTypes';

export const  authenticate = (socket: Socket, next: (err?: ExtendedError | undefined) => void ) => {
    const token = socket.handshake?.query.token;

    if (!token) {
        return next(new Error('Authentication error'));
    }

    verify(String(token), String(process.env.TOKEN_SECRET), (err, decoded) => {
        if (err) {
            return next(new Error('Authentication error'));
        }
        socket.user = decoded as IJwt;
        next();
    });
}
