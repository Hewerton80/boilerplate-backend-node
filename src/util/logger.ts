import winston, { level } from 'winston'
import { resolve } from 'path'
import { DateTime } from 'luxon'

const myCustomLevels = {
  levels: {
    error: 0,
    info: 1,
  },
  colors: {
    error: 'red',
    info: 'blue',
  },
}

winston.addColors({
  error: 'red',
  info: 'blue',
})

const winstonLogger = winston.createLogger({
  // levels: myCustomLevels.levels,
  level: 'info',
  format: winston.format.simple(),
  transports: [
    // new winston.transports.Console(),
    new winston.transports.File({
      filename: resolve(__dirname, '..', 'logs', `${DateTime.now().toISODate()}.log`),
    }),
  ],
})

// if (process.env.NODE_ENV !== 'production') {
//   winstonLogger.add(
//     new winston.transports.Console({
//       format: winston.format.simple(),
//     })
//   )
// }

export interface ILogger {
  type: 'REQUEST' | 'RESPONSE'
  level: 'info' | 'error'
  userId?: string | number
  params?: string
  queryParans?: string
  body?: string
  method: string
  url: string
  status?: number
  menssageErro?: string
}

export const logger = ({
  type,
  userId,
  level,
  method,
  url,
  menssageErro,
  status,
  params,
  queryParans,
  body,
}: ILogger) => {
  let fullLogMenssage = `${type} ${DateTime.now().toISOTime()} url=${url} method=${method}`
  if (userId) {
    fullLogMenssage += ` userId=${userId}`
  }
  if (status) {
    fullLogMenssage += ` status=${status}`
  }
  if (menssageErro) {
    fullLogMenssage += ` menssage=${menssageErro}`
  }
  if (params) {
    fullLogMenssage += ` params=${params}`
  }
  if (queryParans) {
    fullLogMenssage += ` queryParans=${queryParans}`
  }
  if (body) {
    fullLogMenssage += ` body=${body}`
  }
  winstonLogger.log({
    level,
    message: fullLogMenssage,
  })
}
