import 'reflect-metadata'
import 'dotenv/config'
import express from 'express'
import * as Sentry from '@sentry/node'
import { routes } from './routes'
import cors from 'cors'
import { join } from 'path'
import { Server } from 'socket.io'
import { createServer } from 'http'
import { errorRequestHandler } from './app/globalErrorHandlers/errorRequestHandler'

const app = express()
const http = createServer(app) // criando protocolo http
const io = new Server(http, {
  cors: {
    origin: '*',
  },
}) // criando protocolo websockets

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler())

//middlewares globais
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// io.use(authenticate);

// io.on('connection', (socket: Socket) => {
//     console.log('Se conectou', socket.id);
// })

//routes
app.use(routes)

//public files
app.use(express.static(join(__dirname, '..', 'public')))

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler())

//handler globals errors
app.use(errorRequestHandler)

export { http, io }
