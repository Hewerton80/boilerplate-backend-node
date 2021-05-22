import "reflect-metadata";
import 'dotenv/config';
import 'express-async-errors';
import express from 'express';
import { routes } from './routes/http';
import cors from 'cors';
import { join } from 'path';
import { Server, Socket } from 'socket.io';
import { createServer } from 'http';
import './database/connection';
import { errorRequestHandler } from "./app/exceptions/handler";
import { authenticate } from "./app/websockets/middlawares.websockets";

const app = express();
const http = createServer(app);// criando protocolo http
const io = new Server(http, {
    cors: {
        origin: '*'
    }
});// criando protocolo websockets

//middlewares globais
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

io.use(authenticate);

io.on('connection', (socket: Socket) => {
    console.log('Se conectou', socket.id);
})

//routes
app.use(routes);

//public files
app.use(express.static(join(__dirname, '..', 'public')));

//handler globals errors
app.use(errorRequestHandler);

export { http, io };